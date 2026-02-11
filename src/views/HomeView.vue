<script setup lang="ts">
import CreateNodeDialog from "@/components/CreateNodeDialog.vue";
import NodesCard from "@/components/NodesCard.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Spinner from "@/components/ui/spinner/Spinner.vue";
import { useNodeStore } from "@/stores/nodes";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { AlertCircle, Home } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useNodeStore();
const { breadcrumb, loading, error, nodes } = storeToRefs(store);
const { navigateToRoot, navigateTo } = useNodeStore();

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
    <div class="flex items-center justify-between">
      <!-- Breadcrumb -->
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" @click.prevent="handleRootClick">
              <Home class="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-if="breadcrumb.length > 0" />

          <template
            v-for="(item, index) in breadcrumb"
            :key="item.id || 'root'"
          >
            <BreadcrumbItem>
              <BreadcrumbLink
                v-if="index < breadcrumb.length - 1"
                href="#"
                @click.prevent="handleBreadcrumbClick(item)"
              >
                {{ item.locales?.[$i18n.locale] || item.title }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else>
                {{ item.locales?.[$i18n.locale] || item.title }}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < breadcrumb.length - 1" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>

      <CreateNodeDialog />
    </div>

    <!-- Node List -->
    <Transition name="page-slide" mode="out-in">
      <div
        v-if="loading"
        key="loading"
        class="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground"
      >
        <div class="flex flex-col items-center gap-4">
          <Spinner class="h-12 w-12 text-primary" />
          <p class="text-lg animate-pulse">{{ $t("home.loading") }}</p>
        </div>
      </div>

      <div v-else key="content" class="space-y-4">
        <Alert v-if="error" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>{{ $t("errors.title") }}</AlertTitle>
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <TransitionGroup
          name="nodes"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-if="nodes.length === 0 && !error"
            class="col-span-full text-center text-muted-foreground py-8"
            key="empty-state"
          >
            {{ $t("home.no_items") }}
          </div>

          <NodesCard v-for="node in nodes" :key="node.id" :node="node" />
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Page Slide Transition (Forward Effect) */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.2s ease-out;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* List Transitions (Faster) */
.nodes-move,
.nodes-enter-active,
.nodes-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.nodes-enter-from,
.nodes-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.nodes-leave-active {
  position: absolute;
}
</style>
