<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui";
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from "reka-ui";
import type { HTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogContentProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<AlertDialogContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay class="dialog-overlay fixed inset-0 z-50 bg-black/80" />
    <AlertDialogContent
      v-bind="forwarded"
      :class="
        cn(
          'dialog-content fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
