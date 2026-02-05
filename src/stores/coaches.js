import router from "@/router";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";
import { createOrUpdateCoach, getAllCoaches } from "@/api/coaches";

export const useCoachesStore = defineStore("coaches", () => {
  const coaches = ref([]);

  getAllCoaches().then((data) => (coaches.value = data));

  const hasCoaches = computed(() => coaches.value.length > 0);

  async function registerCoach(data) {
    const authStore = useAuthStore();
    const authUserId = authStore.userId;

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    await createOrUpdateCoach(authUserId, coachData);

    router.replace({ name: "coachList" });
  }

  const isCoach = computed(() => {
    const authStore = useAuthStore();
    const authUserId = authStore.userId;
    return coaches.value?.some((coach) => coach.id === authUserId);
  });

  return { coaches, hasCoaches, registerCoach, isCoach };
});
