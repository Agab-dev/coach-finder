<script setup>
import { useRequestsStore } from "@/stores/requests";
import RequestItem from "@/components/requests/RequestItem.vue";
const requestStore = useRequestsStore();
</script>

<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="requestStore.hasRequests">
        <request-item
          v-for="request in requestStore.receivedRequests"
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
