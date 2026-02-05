import { ref } from "vue";

import { defineStore } from "pinia";

export const useRequestsStore = defineStore("requests", () => {
  const requests = ref([]);

  function addRequest(data) {
    requests.value.unshift({
      id: crypto.randomUUID(),
      userEmail: data.userEmail,
      message: data.message,
      coachId: data.coachId,
    });
  }

  return { requests, addRequest };
});
