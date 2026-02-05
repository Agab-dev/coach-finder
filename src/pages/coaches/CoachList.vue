<script setup>
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";
import { useCoachesStore } from "@/stores/coaches";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { coaches, hasCoaches } = storeToRefs(useCoachesStore());
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

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
</script>

<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button isLink :to="{ name: 'coachRegistrationForm' }"
          >Register as Coach
        </base-button>
      </div>
      <ul v-if="hasCoaches">
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
      <h3 v-else>No Coaches Found</h3>
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
