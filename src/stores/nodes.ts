import * as api from "@/api/NodesApi";
import i18n from "@/i18n";
import type { BreadcrumbItem, Node } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNodeStore = defineStore("nodes", () => {
  // State
  const nodes = ref<Node[]>([]);
  const currentParentId = ref<number | null>(null);
  const breadcrumb = ref<BreadcrumbItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAtRoot = computed(() => currentParentId.value === null);

  // Actions
  async function fetchNodes() {
    loading.value = true;
    error.value = null;
    try {
      if (currentParentId.value === null) {
        nodes.value = await api.getParentNodes();
      } else {
        nodes.value = await api.getChildNodes(currentParentId.value);
      }
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : i18n.global.t("errors.unknown");
    } finally {
      loading.value = false;
    }
  }

  async function navigateInto(node: Node) {
    currentParentId.value = node.id;
    breadcrumb.value.push({
      id: node.id,
      title: node.title,
      locales: node.locales,
    });
    await fetchNodes();
  }

  async function navigateTo(item: BreadcrumbItem) {
    currentParentId.value = item.id;
    const index = breadcrumb.value.findIndex((b) => b.id === item.id);
    if (index !== -1) {
      breadcrumb.value = breadcrumb.value.slice(0, index + 1);
    }
    await fetchNodes();
  }

  async function navigateToRoot() {
    currentParentId.value = null;
    breadcrumb.value = [];
    await fetchNodes();
  }

  async function addNode(title: string) {
    error.value = null;
    try {
      await api.createNode(currentParentId.value, title);
      await fetchNodes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : i18n.global.t("errors.create_failed");
      throw e;
    }
  }

  async function removeNode(id: number) {
    error.value = null;
    try {
      await api.deleteNode(id);
      await fetchNodes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : i18n.global.t("errors.delete_failed");
      throw e;
    }
  }

  async function getChildCount(id: number): Promise<number> {
    return await api.countChildren(id);
  }

  async function nodeHasChildren(id: number): Promise<boolean> {
    return await api.hasChildren(id);
  }

  return {
    // State
    nodes,
    currentParentId,
    breadcrumb,
    loading,
    error,
    // Getters
    isAtRoot,
    // Actions
    fetchNodes,
    navigateInto,
    navigateTo,
    navigateToRoot,
    addNode,
    removeNode,
    getChildCount,
    nodeHasChildren,
  };
});
