<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { Toaster } from "vue-sonner";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <RouterView />
    <Toaster position="top-right" theme="dark" rich-colors :duration="4000" />
  </div>
</template>
