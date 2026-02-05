import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const userId = "c3";

  return { userId };
});
