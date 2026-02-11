<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNodeStore } from "@/stores/nodes";
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

const { t } = useI18n();
const store = useNodeStore();
const { addNode } = store;

const open = ref(false);
const nodeName = ref("");
const loading = ref(false);

const handleCreate = async () => {
  if (!nodeName.value.trim()) return;

  loading.value = true;
  try {
    await addNode(nodeName.value);
    toast.success(t("home.create_node.success"));
    nodeName.value = "";
    open.value = false;
  } catch (e) {
    toast.error(e instanceof Error ? e.message : t("errors.create_failed"));
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        {{ t("home.create_node.trigger") }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ t("home.create_node.title") }}</DialogTitle>
        <DialogDescription>
          <!-- Optional description if needed -->
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" class="text-right">
            {{ t("home.create_node.name_label") }}
          </Label>
          <Input
            id="name"
            v-model="nodeName"
            :placeholder="t('home.create_node.placeholder')"
            class="col-span-3"
            @keyup.enter="handleCreate"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="open = false">
          {{ t("home.create_node.cancel") }}
        </Button>
        <Button
          type="submit"
          @click="handleCreate"
          :disabled="loading || !nodeName.trim()"
        >
          {{ loading ? t("home.loading") : t("home.create_node.confirm") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
