import { createRouter, createWebHistory } from "vue-router";
import Home from "../../views/Home.vue";
import AddEstimate from "../../views/AddEstimate.vue";
import LookEstimate from "../../components/Screen/LookEstimate.vue";
import EditEstimate from "../../components/Edit/EditEstimate.vue";
import AddInvoices from "../../views/AddInvoices.vue";
import LookInvoice from "../../components/Screen/LookInvoice.vue";
import EditInvoice from "../../components/Edit/EditInvoice.vue";
import IsWaiting from "../../views/IsWaiting.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-estimate",
    name: "AddEstimate",
    component: AddEstimate,
  },
  {
    path: "/estimate/:estimateId/voir",
    name: "LookEstimate",
    component: LookEstimate,
  },
  {
    path: "/estimate/:estimateId/edit",
    name: "EditEstimate",
    component: EditEstimate,
  },
  {
    path: "/add-invoices",
    name: "AddInvoices",
    component: AddInvoices,
  },
  {
    path: "/invoices/:invoiceId/voir",
    name: "LookInvoice",
    component: LookInvoice,
  },
  {
    path: "/invoices/:invoiceId/edit",
    name: "EditInvoice",
    component: EditInvoice,
  },
  {
    path: "/is-waiting",
    name: "IsWaiting",
    component: IsWaiting,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
