import { createRouter, createWebHistory } from "vue-router";

// TODO: once you add the pages for each route, then register them to the relevant route
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      name: "getAllCoaches",
      component: null,
    },
    {
      path: "/coaches/:id",
      name: "getSingleCoach",
      component: null,
      children: [
        {
          path: "/contact",
          name: "contactCoach",
          component: null,
        },
      ],
    },
    {
      path: "/register",
      name: "registerCoach",
      component: null,
    },
    {
      path: "/requests",
      name: "getAllRequests",
      component: null,
    },
    {
      path: "/:notFound(.*)",
      name: "NotFound",
      component: null,
    },
  ],
});

export default router;
