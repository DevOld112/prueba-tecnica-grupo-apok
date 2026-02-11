import { ref, watch } from "vue";

export type Theme = "light" | "dark";

const STORAGE_KEY = "app-theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  // Detect system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Shared reactive state (singleton across all components)
const theme = ref<Theme>(getStoredTheme());

function applyTheme(value: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(value);
  localStorage.setItem(STORAGE_KEY, value);
}

// Apply on first load
if (typeof window !== "undefined") {
  applyTheme(theme.value);
}

export function useTheme() {
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  });

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  function setTheme(value: Theme) {
    theme.value = value;
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: () => theme.value === "dark",
  };
}
