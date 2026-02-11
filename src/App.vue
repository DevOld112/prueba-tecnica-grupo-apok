<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { Toaster } from "@/components/ui/sonner";
import { getNodes } from "./api/NodesApi";
import { onMounted } from "vue";

onMounted(async() =>{
  await console.log(getNodes())
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <RouterView />
    <Toaster position="bottom-right" :expand="true" rich-colors />
  </div>
</template>
