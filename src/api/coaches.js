import { ref } from "vue";
import { BASE_URL } from ".";

export async function createOrUpdateCoach(coachId, coachData) {
  const isLoading = ref(false);
  const error = ref(null);
  try {
    isLoading.value = true;
    const response = await fetch(BASE_URL + `/coaches/${coachId}.json`, {
      method: "PUT",
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      error.value =
        new Error("Something went wrong, while submitting coach data")
          .message || "Something went wrong";
      throw error.value;
    }
  } catch (err) {
    error.value = err.message || "Something went wrong";
  } finally {
    isLoading.value = false;
    return { isLoading: isLoading.value, error: error.value };
  }
}

export async function getAllCoaches(isLoading = { value: false }) {
  const error = ref(null);
  const formattedCoaches = ref([]);
  try {
    isLoading.value = true;
    const response = await fetch(BASE_URL + "/coaches.json");

    if (!response.ok) {
      error.value =
        new Error("Something went wrong, while fetching coaches data")
          .message || "Something went wrong";
      throw error.value;
    }

    const coaches = await response.json();
    const temp = [];

    for (const key in coaches) {
      temp.unshift({
        id: key,
        firstName: coaches[key].firstName,
        lastName: coaches[key].lastName,
        description: coaches[key].description,
        hourlyRate: coaches[key].hourlyRate,
        areas: coaches[key].areas,
      });
    }
    formattedCoaches.value = temp;
  } catch (err) {
    error.value = err.message || "Something went wrong";
    return { error: error.message };
  } finally {
    isLoading.value = false;
    return {
      error: error.value,
      coaches: formattedCoaches.value,
    };
  }
}
