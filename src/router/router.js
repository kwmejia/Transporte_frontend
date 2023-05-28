import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",

  },

  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/HomePage.vue")
  },

  {
    path: "/routes",
    name: "routes",
    component: () => import("@/pages/routes/RoutesPage.vue")
  },

  {
    path: "/routes/:id",
    name: "routeUpdate",
    component: () => import("@/pages/routes/UpdateRoute.vue")
  },

  {
    path: "/newRoute",
    name: "newRoute",
    component: () => import("@/pages/routes/InsertRoute.vue")
  },

  {
    path: "/customers",
    name: "customers",
    component: () => import("@/pages/customers/CustomersPage.vue")
  },

  {
    path: "/newCustomer",
    name: "newCustomer",
    component: () => import("@/pages/customers/InsertCostumer.vue")
  },

  {
    path: "/customers/:id",
    name: "customersUpdate",
    component: () => import("@/pages/customers/UpdateCustomer.vue")
  },

  {
    path: "/map",
    name: "map",
    component: () => import("@/pages/map/MapPage.vue")
  },

  { path: "/:pathMatch(.*)*", component: () => import("@/pages/map/MapPage.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;