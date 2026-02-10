<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <RouterView />
    <Toaster position="bottom-right" :expand="true" rich-colors />
  </div>
</template>
