import { createRouter, createWebHistory } from "vue-router";
import Invoices from "../../views/Invoices.vue";
import AddInvoices from "../../views/AddInvoices.vue";

const routes = [
  {
    path: "/",
    name: "Invoices",
    component: Invoices,
  },
  {
    path: "/add-invoices",
    name: "AddInvoices",
    component: AddInvoices,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
