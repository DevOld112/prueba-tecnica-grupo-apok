<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useNodeStore } from "@/stores/nodes";
import type { BreadcrumbItem as BreadcrumbItemType, Node } from "@/types";
import { Folder, Home, Trash2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const store = useNodeStore();
const { breadcrumb, loading, error, nodes } = storeToRefs(store);
const { navigateInto, navigateToRoot, removeNode, navigateTo } = store;

onMounted(async () => {
  await navigateToRoot();
});

const handleNavigate = async (node: Node) => {
  try {
    await navigateInto(node);
  } catch (e) {
    console.error("Navigation failed", e);
  }
};

const handleBreadcrumbClick = (item: BreadcrumbItemType) => {
  navigateTo(item);
};

const handleRootClick = () => {
  navigateToRoot();
};

const handleDelete = async (id: number) => {
  if (confirm(t("home.confirm_delete"))) {
    await removeNode(id);
  }
};
</script>

<template>
  <div class="container mx-auto p-4 space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" @click.prevent="handleRootClick">
            <Home class="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="breadcrumb.length > 0" />

        <template v-for="(item, index) in breadcrumb" :key="item.id || 'root'">
          <BreadcrumbItem>
            <BreadcrumbLink
              v-if="index < breadcrumb.length - 1"
              href="#"
              @click.prevent="handleBreadcrumbClick(item)"
            >
              {{ item.title }}
            </BreadcrumbLink>
            <BreadcrumbPage v-else>
              {{ item.title }}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-if="index < breadcrumb.length - 1" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>

    <!-- Node List -->
    <div v-if="loading" class="text-center py-4 text-muted-foreground">
      {{ t("home.loading") }}
    </div>

    <div v-else-if="error" class="text-red-500 py-4">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-if="nodes.length === 0"
        class="col-span-full text-center text-muted-foreground py-8"
      >
        {{ t("home.no_items") }}
      </div>

      <div
        v-for="node in nodes"
        :key="node.id"
        class="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card text-card-foreground shadow-sm"
      >
        <div
          class="flex items-center gap-3 cursor-pointer flex-1"
          @click="handleNavigate(node)"
        >
          <Folder v-if="true" class="w-5 h-5 text-blue-500" />

          <span class="font-medium">{{ node.title }}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          @click.stop="handleDelete(node.id)"
          class="text-muted-foreground hover:text-destructive"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
