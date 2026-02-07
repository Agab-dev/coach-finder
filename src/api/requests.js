import { ref } from "vue";
import { BASE_URL } from ".";
import { useAuthStore } from "@/stores/auth";

export async function createRequest(coachId, requestData) {
  const isLoading = ref(false);
  const error = ref(null);
  let data = null;
  try {
    isLoading.value = true;
    const response = await fetch(BASE_URL + `/requests/${coachId}.json`, {
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      error.value = new Error(
        "Something went wrong, while submitting the request",
      ).message;
      throw error.value;
    }

    data = response.json();
  } catch (err) {
    error.value = err.message || "Something went wrong";
  } finally {
    isLoading.value = false;
    return { error: error.value, isLoading: isLoading.value, id: data.name };
  }
}

export async function getAllRequests(isLoading = { value: false }) {
  const error = ref(null);
  const authStore = useAuthStore();
  const coachId = authStore.userId;
  const formattedRequests = ref([]);
  try {
    isLoading.value = true;
    const response = await fetch(BASE_URL + `/requests/${coachId}.json`);

    if (!response.ok) {
      error.value =
        new Error("Something went wrong, while fetching requests data")
          .message || "Something went wrong";
      throw error.value;
    }

    const requests = await response.json();
    const temp = [];

    for (const key in requests) {
      temp.unshift({
        id: key,
        coachId: coachId,
        userEmail: requests[key].userEmail,
        message: requests[key].message,
      });
    }
    formattedRequests.value = temp;
  } catch (err) {
    error.value = err.message || "Something went wrong";
  } finally {
    isLoading.value = false;
    return {
      error: error.value,
      requests: formattedRequests.value,
    };
  }
}
