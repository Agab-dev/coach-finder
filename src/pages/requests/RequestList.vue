<script setup>
import { useRequestsStore } from "@/stores/requests";
import RequestItem from "@/components/requests/RequestItem.vue";
import { onBeforeMount, ref } from "vue";
import { getAllRequests } from "@/api/requests";
import { storeToRefs } from "pinia";

const { requests, receivedRequests, hasRequests } =
  storeToRefs(useRequestsStore());
const isLoading = ref(false);
const error = ref(null);

async function loadRequests() {
  const response = await getAllRequests(isLoading);
  requests.value = response.requests;
  error.value = response.error;
}

function handleErrorModal() {
  error.value = null;
}

onBeforeMount(async () => await loadRequests());
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
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :message="request.message"
          :email="request.userEmail"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
