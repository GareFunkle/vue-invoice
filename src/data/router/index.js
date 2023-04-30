import { createRouter, createWebHistory } from "vue-router";
import Invoices from "../../views/Invoices.vue";
import AddInvoices from "../../views/AddInvoices.vue";
import EditInvoice from "../../components/Edit/EditInvoice.vue";
import LookInvoice from "../../components/Screen/LookInvoice.vue";

const routes = [
  {
    path: "/",
    name: "Invoices",
    component: Invoices,
  },
  {
    path: "/invoices/:invoiceId/edit",
    name: "EditInvoice",
    component: EditInvoice,
  },
  {
    path: "/invoices/:invoiceId/voir",
    name: "LookInvoice",
    component: LookInvoice,
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
