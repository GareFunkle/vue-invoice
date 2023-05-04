<template>
    <main>
        <div class="wrap">

            <div class="estimate__home">
                <h1 class="estimate__home-title">Devis</h1>
                <div class="estimates__wrap">
                    <EstimateCard v-for="(estimate, index) in estimates" :key="index" :estimates="estimate" />
                </div>
            </div>
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
import { onSnapshot, query, collection } from "firebase/firestore";
import EstimateCard from "../components/Card/EstimateCard.vue";
import InvoicesCard from '../components/Card/InvoicesCard.vue';
export default {
    name: "Home",
    components: {
        EstimateCard,
        InvoicesCard
    },
    setup() {
        const estimates = ref([])
        const invoices = ref([]);


        const makeDataEstimates = async () => {
            const estimateCollection = collection(db, "estimates")
            const q = query(estimateCollection)
            const unsubscribe = onSnapshot(q, (snapshot) => {
                estimates.value = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            });

            onUnmounted(() => {
                unsubscribe();
            });
        }

        const makeDataInvoices = async () => {
            const invoiceCollection = collection(db, "invoices");
            const q = query(invoiceCollection);

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

        onMounted(makeDataEstimates)
        onMounted(makeDataInvoices);

        return {
            estimates,
            invoices
        };

    }
}
</script>

<style lang="scss">
.wrap {
    display: flex;
    // align-items: center;
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