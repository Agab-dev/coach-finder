<script setup>
import { computed } from "vue";

const { firstName, lastName, rate, areas } = defineProps({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  areas: {
    type: Array,
    required: true,
  },
});

const fullName = computed(() => `${firstName} ${lastName}`);
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area">
      </base-badge>
    </div>
    <div class="actions">
      <base-button
        mode="outline"
        isLink
        :to="{ name: 'coachContactForm', params: { id } }"
        >Contact
      </base-button>
      <base-button isLink :to="{ name: 'coachDetails', params: { id } }"
        >View Details
      </base-button>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
