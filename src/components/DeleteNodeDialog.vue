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
import { useNodes } from "@/composables/useNodes";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  nodeId: number;
}>();

const { t } = useI18n();
const { open, loading, handleDelete } = useNodes();
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
          @click="(e: Event) => handleDelete(e, props.nodeId)"
          :disabled="loading"
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {{ loading ? t("home.loading") : t("home.delete_node.confirm") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
