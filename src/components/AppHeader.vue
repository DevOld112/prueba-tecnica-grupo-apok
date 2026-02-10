<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderTree, Globe } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

function setLocale(lang: string) {
  locale.value = lang;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
  >
    <div
      class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
        >
          <FolderTree class="h-5 w-5" />
        </div>
        <div>
          <h1 class="text-lg font-semibold tracking-tight">
            {{ t("app.title") }}
          </h1>
          <p class="hidden text-xs text-muted-foreground sm:block">
            {{ t("app.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Language Switcher -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm" class="gap-2">
            <Globe class="h-4 w-4" />
            <span class="hidden sm:inline">{{ t(`language.${locale}`) }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            @click="setLocale('es')"
            :class="{ 'bg-accent': locale === 'es' }"
          >
            🇪🇸 {{ t("language.es") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="setLocale('en')"
            :class="{ 'bg-accent': locale === 'en' }"
          >
            🇺🇸 {{ t("language.en") }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
