<template>
  <main>
    <div class="wrap">
      <div class="invoice__home">
        <h1 class="invoice__home-title">Factures</h1>
        <div class="invoices__wrap">
          <InvoicesCard v-for="(invoice, index) in invoices" :key="index" :invoices="invoice" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { db } from '../data/firebase/index'
import { query, collection, onSnapshot, where, } from "firebase/firestore";
import InvoicesCard from '../components/Card/InvoicesCard.vue';

export default {
  name: "IsWaiting",
  components: {
    InvoicesCard
  },
  setup() {

    const invoices = ref([]);



    const makeDataInvoices = async () => {
      const invoiceCollection = collection(db, "invoices");
      const invoicesStatus = where("status", "==", "En attente")
      const q = query(invoiceCollection, invoicesStatus);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        invoices.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      onUnmounted(() => {
        unsubscribe();
      });
    }

    onMounted(makeDataInvoices);

    return {
      invoices
    };

  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-around;


  .estimate__home,
  .invoice__home {
    display: flex;
    align-items: center;
    flex-direction: column;

    .estimate__home-title,
    .invoice__home-title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--color-4);
      border-radius: calc(5rem / 2);
      color: var(--color-3);
      margin-bottom: 1rem;
    }
  }



}
</style>