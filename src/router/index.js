import CoachDetails from "@/pages/coaches/CoachDetails.vue";
import CoachList from "@/pages/coaches/CoachList.vue";
import CoachRegistrationForm from "@/pages/coaches/CoachRegistrationForm.vue";
import NotFound from "@/pages/NotFound.vue";
import CoachContactForm from "@/pages/requests/CoachContactForm.vue";
import RequestList from "@/pages/requests/RequestList.vue";
import { useCoachesStore } from "@/stores/coaches";
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
      name: "coachList",
      component: CoachList,
    },
    {
      path: "/coaches/:id",
      name: "coachDetails",
      component: CoachDetails,
      props: true,
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
