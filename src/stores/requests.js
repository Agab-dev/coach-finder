import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";

export const useRequestsStore = defineStore("requests", () => {
  const requests = ref([]);

  const receivedRequests = computed(() => {
    const authStore = useAuthStore();
    return requests.value.filter(
      (request) => request.coachId === authStore.userId,
    );
  });

  const hasRequests = computed(() => {
    return receivedRequests.value.length > 0;
  });

  function addRequest(data) {
    requests.value.unshift({
      id: crypto.randomUUID(),
      userEmail: data.userEmail,
      message: data.message,
      coachId: data.coachId,
    });
  }

  return { requests, addRequest, hasRequests, receivedRequests };
});
