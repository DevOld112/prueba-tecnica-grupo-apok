<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Toaster } from "vue-sonner";

const { t } = useI18n();
const title = computed(() => t("app.title"));
useTitle(title);
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <RouterView />
    <Toaster position="top-right" theme="dark" rich-colors :duration="4000" />
  </div>
</template>
