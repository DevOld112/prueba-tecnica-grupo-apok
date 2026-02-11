<script setup lang="ts">
import DeleteNodeDialog from "@/components/DeleteNodeDialog.vue";
import { Button } from "@/components/ui/button";
import { useNodes } from "@/composables/useNodes";
import type { Node } from "@/types";
import { Folder, Trash2 } from "lucide-vue-next";

const props = defineProps<{
  node: Node;
}>();
const { handleNavigate } = useNodes();
</script>

<template>
  <div
    class="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card text-card-foreground shadow-sm"
  >
    <div
      class="flex items-center gap-3 cursor-pointer flex-1"
      @click="handleNavigate(props.node)"
    >
      <Folder v-if="true" class="w-5 h-5 text-blue-500" />

      <span class="font-medium">{{
        node.locales?.[$i18n.locale] || node.title
      }}</span>
    </div>

    <DeleteNodeDialog :nodeId="node.id">
      <Button
        variant="ghost"
        size="icon"
        class="text-muted-foreground hover:text-destructive"
        @click.stop
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </DeleteNodeDialog>
  </div>
</template>
