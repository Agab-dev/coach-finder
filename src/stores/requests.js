import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";
import { createRequest } from "@/api/requests";

export const useRequestsStore = defineStore("requests", () => {
  const requests = ref([]);
  const lastFetch = ref(null);

  const receivedRequests = computed(() => {
    const authStore = useAuthStore();
    return requests.value.filter(
      (request) => request.coachId === authStore.userId,
    );
  });

  const hasRequests = computed(() => {
    return receivedRequests.value.length > 0;
  });

  async function addRequest(data) {
    const newRequest = {
      userEmail: data.userEmail,
      message: data.message,
    };

    await createRequest(data.coachId, newRequest);
  }

  return { requests, addRequest, hasRequests, receivedRequests, lastFetch };
});
