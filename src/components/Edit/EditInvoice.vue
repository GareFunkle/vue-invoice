<template>
    <div class="edit-invoice">
        <h1>Éditer la facture : {{ invoiceId }}</h1>
        <form @submit.prevent="updateInvoice">
            <label for="clientName">Nom du client :</label>
            <input type="text" id="clientName" v-model="invoice.clientName" />

            <!-- Ajoutez ici d'autres champs pour modifier les informations de la facture -->

            <h3>Articles :</h3>
            <div v-for="(item, index) in invoice.items" :key="index">
                <label :for="`item-name-${index}`">Nom de l'article :</label>
                <input :id="`item-name-${index}`" v-model="item.description" />

                <label :for="`item-quantity-${index}`">Quantité :</label>
                <input :id="`item-quantity-${index}`" type="number" v-model.number="item.quantity" />

                <label :for="`item-price-${index}`">Prix unitaire :</label>
                <input :id="`item-price-${index}`" type="number" step="0.01" v-model.number="item.amount" />

                <button type="button" @click="removeItem(index)">Supprimer l'article</button>
            </div>

            <button type="button" @click="addItem">Ajouter un article</button>

            <button type="submit">Mettre à jour</button>
        </form>
    </div>
</template>
  
<script>
import { ref, computed } from "vue";
import { db } from "../../data/firebase/index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRoute } from 'vue-router';

export default {
    name: "EditInvoice",
    setup() {
        const route = useRoute();
        const invoiceId = computed(() => {
            return route.params.invoiceId;
        });
        const invoice = ref({});

        const fetchInvoice = async () => {
            const invoiceRef = doc(db, "invoices", invoiceId.value);
            const invoiceSnap = await getDoc(invoiceRef);

            if (invoiceSnap.exists()) {
                invoice.value = invoiceSnap.data();
            } else {
                console.log("Aucune facture trouvée avec cet ID.");
            }
        };

        const updateInvoice = async () => {
            const invoiceRef = doc(db, "invoices", invoiceId.value);
            await updateDoc(invoiceRef, invoice.value);
            console.log("Facture mise à jour !");
        };

        const addItem = () => {
            invoice.value.items.push({
                name: "",
                quantity: 1,
                price: 0
            });
        };

        const removeItem = (index) => {
            invoice.value.items.splice(index, 1);
        };

        fetchInvoice();

        return {
            invoiceId,
            invoice,
            updateInvoice,
            addItem,
            removeItem,
        };
    },
};
</script>
  
<style scoped>
/* Ajoutez ici le style pour le composant EditInvoice */
</style>
  