import router from "@/router";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";
import { createOrUpdateCoach } from "@/api/coaches";

export const useCoachesStore = defineStore("coaches", () => {
  const coaches = ref([
    {
      id: "c1",
      firstName: "Maximilian",
      lastName: "Schwarzmüller",
      areas: ["frontend", "backend", "career"],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30,
    },
    {
      id: "c2",
      firstName: "Julie",
      lastName: "Jones",
      areas: ["frontend", "career"],
      description:
        "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
      hourlyRate: 30,
    },
  ]);

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

    coaches.value.unshift({ ...coachData, id: authUserId });

    router.replace({ name: "coachList" });
  }

  const isCoach = computed(() => {
    const authStore = useAuthStore();
    const authUserId = authStore.userId;
    return coaches.value.some((coach) => coach.id === authUserId);
  });

  return { coaches, hasCoaches, registerCoach, isCoach };
});
