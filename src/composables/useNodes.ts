import { useNodeStore } from "@/stores/nodes";
import type { Node } from "@/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

export const useNodes = () => {
  const { t } = useI18n();
  const nodeStore = useNodeStore();
  const { addNode, removeNode, nodeHasChildren, navigateInto } = nodeStore;

  const open = ref(false);
  const nameEn = ref("");
  const nameEs = ref("");
  const loading = ref(false);

  const handleCreate = async () => {
    if (!nameEn.value.trim() || !nameEs.value.trim()) return;

    loading.value = true;
    try {
      await addNode({
        en: nameEn.value,
        es: nameEs.value,
      });
      toast.success(t("home.create_node.success"));
      nameEn.value = "";
      nameEs.value = "";
      open.value = false;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("errors.create_failed"));
    } finally {
      loading.value = false;
    }
  };

  const handleDelete = async (e: Event, nodeId: number) => {
    e.preventDefault();
    loading.value = true;
    try {
      const hasChildren = await nodeHasChildren(nodeId);
      if (hasChildren) {
        toast.error(t("home.delete_node.has_children"));
        open.value = false;
        return;
      }

      await removeNode(nodeId);
      toast.success(t("home.deleted_success"));
      open.value = false;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("errors.delete_failed"),
      );
    } finally {
      loading.value = false;
    }
  };

  const handleNavigate = async (node: Node) => {
    try {
      await navigateInto(node);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("errors.unknown"));
    }
  };

  return {
    open,
    loading,
    nameEn,
    nameEs,
    handleCreate,
    handleDelete,
    handleNavigate,
  };
};
