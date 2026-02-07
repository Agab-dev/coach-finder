<script setup>
import { useCoachesStore } from "@/stores/coaches";
import { computed, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";

const { id } = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const contactFormIsOpen = computed(() => route.path.includes("/contact"));

let selectedCoach = null;

onBeforeMount(() => {
  const props = useCoachesStore();
  selectedCoach = props.coaches.find((coach) => coach.id === id);
});

const fullName = computed(
  () => `${selectedCoach.firstName} ${selectedCoach.lastName}`,
);
const rate = computed(() => selectedCoach.hourlyRate);
const description = computed(() => selectedCoach.description);
const areas = computed(() => selectedCoach.areas);
</script>

<template>
  <div>
    <section>
      <base-card>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach Out Now!</h2>
          <base-button
            v-if="!contactFormIsOpen"
            isLink
            :to="{ name: 'coachContactForm', params: { id } }"
            >Contact
          </base-button>
          <router-view></router-view>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>
