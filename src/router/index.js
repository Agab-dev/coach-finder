import CoachDetails from "@/pages/coaches/CoachDetails.vue";
import CoachList from "@/pages/coaches/CoachList.vue";
import CoachRegistrationForm from "@/pages/coaches/CoachRegistrationForm.vue";
import NotFound from "@/pages/NotFound.vue";
import CoachContactForm from "@/pages/requests/CoachContactForm.vue";
import RequestList from "@/pages/requests/RequestList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      name: "coacheList",
      component: CoachList,
    },
    {
      path: "/coaches/:id",
      name: "coachDetails",
      component: CoachDetails,
      children: [
        {
          path: "contact",
          name: "coachContactForm",
          component: CoachContactForm,
        },
      ],
    },
    {
      path: "/register",
      name: "coachRegistrationForm",
      component: CoachRegistrationForm,
    },
    {
      path: "/requests",
      name: "requestList",
      component: RequestList,
    },
    {
      path: "/:notFound(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
