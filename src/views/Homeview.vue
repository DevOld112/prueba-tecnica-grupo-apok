<script setup lang="ts">
import NodesCard from "@/components/NodesCard.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNodeStore } from "@/stores/nodes";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { Home } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useNodeStore();
const { breadcrumb, loading, error, nodes } = storeToRefs(store);
const { navigateToRoot, navigateTo } = store;

onMounted(async () => {
  await navigateToRoot();
});

const handleBreadcrumbClick = (item: BreadcrumbItemType) => {
  navigateTo(item);
};

const handleRootClick = () => {
  navigateToRoot();
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
      {{ $t("home.loading") }}
    </div>

    <div v-else-if="error" class="text-red-500 py-4">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-if="nodes.length === 0"
        class="col-span-full text-center text-muted-foreground py-8"
      >
        {{ $t("home.no_items") }}
      </div>

      <NodesCard v-for="node in nodes" :key="node.id" :node="node" />
    </div>
  </div>
</template>
