<script setup>
import CoachItem from "@/components/coaches/CoachItem.vue";
import { useCoachesStore } from "@/stores/coaches";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const { coaches, hasCoaches } = storeToRefs(useCoachesStore());
</script>

<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link :to="{ name: 'coachRegistrationForm' }"
        >Register as Coach</router-link
      >
    </div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in coaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No Coaches Found</h3>
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
