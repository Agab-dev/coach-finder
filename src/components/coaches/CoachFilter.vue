<script setup>
import { ref } from "vue";

const emit = defineEmits(["change-filter"]);

const filters = ref({
  frontend: true,
  backend: true,
  career: true,
});

function setFilter(event) {
  const area = event.target.id;
  const isActive = event.target.checked;
  filters.value[area] = isActive;
  emit("change-filter", filters.value);
}
</script>

<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>
