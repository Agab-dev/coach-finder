<script setup>
import { getAllCoaches } from "@/api/coaches";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";
import { useAuthStore } from "@/stores/auth";
import { useCoachesStore } from "@/stores/coaches";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { coaches, hasCoaches, ...others } = storeToRefs(useCoachesStore());
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});
const isLoading = ref(false);
const error = ref(null);

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

const filteredCoaches = computed(() => {
  return coaches.value.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes("frontend")) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes("backend")) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes("career")) {
      return true;
    }
    return false;
  });
});

async function loadCoaches() {
  const response = await getAllCoaches(isLoading);
  coaches.value = response.coaches;
  error.value = response.error;
}

const isCoach = computed(() => {
  const authStore = useAuthStore();
  const authUserId = authStore.userId;
  return coaches.value.some((coach) => coach.id === authUserId);
});

function handleErrorModal() {
  error.value = null;
}

onBeforeMount(async () => await loadCoaches());
</script>

<template>
  <base-dialog
    :show="error !== null"
    title="An Error Occured!"
    @close="handleErrorModal"
  >
    <p>
      {{ error }}
    </p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button
          v-if="!isLoading && !isCoach"
          isLink
          :to="{ name: 'coachRegistrationForm' }"
          >Register as Coach
        </base-button>
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else-if="!hasCoaches">No Coaches Found</h3>
    </base-card>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
