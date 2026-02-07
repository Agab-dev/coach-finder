import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const userId = "c1";

  return { userId };
});
