<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNodeStore } from "@/stores/nodes";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

const props = defineProps<{
  nodeId: number;
}>();

const { t } = useI18n();
const store = useNodeStore();
const { removeNode } = store;

const open = ref(false);
const loading = ref(false);

const handleDelete = async (e: Event) => {
  e.preventDefault(); // Prevent auto-closing
  loading.value = true;
  try {
    const hasChildren = await store.nodeHasChildren(props.nodeId);
    if (hasChildren) {
      toast.error(t("home.delete_node.has_children"));
      open.value = false;
      return;
    }

    await removeNode(props.nodeId);
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
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t("home.delete_node.title") }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t("home.delete_node.description") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="loading">
          {{ t("home.delete_node.cancel") }}
        </AlertDialogCancel>
        <AlertDialogAction
          @click="handleDelete"
          :disabled="loading"
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {{ loading ? t("home.loading") : t("home.delete_node.confirm") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
