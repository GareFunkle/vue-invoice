<template>
    <main>
        <h1>My Invoice</h1>
        <div class="invoices__wrap">
            <InvoicesCard v-for="(invoice, index) in invoices" :key="index" :invoices="invoice" />
        </div>
    </main>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { db } from '../data/firebase/index'
import { onSnapshot, query, collection } from "firebase/firestore";
import InvoicesCard from '../components/Card/InvoicesCard.vue';
export default {
    name: "Invoices",
    components: {
        InvoicesCard
    },
    setup() {
        const invoices = ref([]);

        const makeData = async () => {
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

        onMounted(makeData);

        return { invoices };

    }
}
</script>

<style lang="scss">
.invoices__wrap {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}
</style>