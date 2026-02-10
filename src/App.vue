<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { getNodes } from "./api/NodesApi";
import { onMounted } from "vue";
const { t } = useI18n();
const url = ref('')

onMounted( async() => {
  url.value = await getNodes()
  nextTick();
  console.log(url.value)
})

</script>

<template>
  <h1 class="text-3xl font-bold underline">
    {{ t("hello") }}
  </h1>
  <p>
    Visit
    <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to
    read the documentation
  </p>
</template>
