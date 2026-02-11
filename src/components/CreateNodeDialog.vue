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
          <Label htmlFor="name-es" class="text-right leading-tight">
            {{ t("home.create_node.name_es_label") }}
          </Label>
          <Input
            id="name-es"
            v-model="nameEs"
            :placeholder="t('home.create_node.placeholder')"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name-en" class="text-right leading-tight">
            {{ t("home.create_node.name_en_label") }}
          </Label>
          <Input
            id="name-en"
            v-model="nameEn"
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
          :disabled="loading || !nameEn.trim() || !nameEs.trim()"
        >
          {{ loading ? t("home.loading") : t("home.create_node.confirm") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
