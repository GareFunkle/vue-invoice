<template>
    <div class="invoice__form-wrap">
        <h2 class="invoice__from-title">Nouvelle facture</h2>
        <form @submit.prevent="submitInvoice">
            <div class="form__element">
                <label for="clientName">Nom du client :</label>
                <input type="text" id="clientName" v-model="invoice.clientName" required />
            </div>
            <div class="form__element">
                <label for="clientAdress">Adresse :</label>
                <input type="text" id="clientAdress" v-model="invoice.clientAdress" required />
            </div>
            <div class="form__element">
                <label for="clientPostal">Code Postal :</label>
                <input type="text" id="clientPostal" v-model="invoice.clientPostal" required />
            </div>
            <div class="form__element">
                <label for="titleInvoice">Descriptions De la facture :</label>
                <input type="text" id="titleInvoice" v-model="invoice.titleInvoice" required />
            </div>
            <div v-for="(item, index) in invoice.items" :key="index">
                <label :for="'description-' + index">Description :</label>
                <input type="text" :id="'description-' + index" v-model="item.description" required />
                <label :for="'quantity-' + index"> Quantité</label>
                <input type="number" :id="'quantity-' + index" v-model="item.quantity" required>
                <label :for="'amount-' + index">Montant :</label>
                <input type="number" :id="'amount-' + index" v-model="item.amount" step="0.01" required />
                <button type="button" @click="removeItem(index)" v-if="index > 0">
                    Supprimer
                </button>
            </div>
            <button type="button" @click="addItem">Ajouter un article</button>
            <div>
                <strong>Montant total :</strong> {{ totalAmount }} €
            </div>
            <div>
                <label for="dueDate">Date d'échéance :</label>
                <input type="date" id="dueDate" v-model="invoice.dueDate" required />
            </div>
            <div>
                <label for="status">Statut :</label>
                <select id="status" v-model="invoice.status">
                    <option value="En attente">En attente</option>
                    <option value="Payée">Payée</option>
                </select>
            </div>
            <button type="submit">Créer la facture</button>
        </form>

    </div>
</template>
  
<script>
import { ref, reactive, computed } from "vue";
import { db, collection } from "../../data/firebase/index";
import { addDoc } from "firebase/firestore";

export default {
    name: "InvoiceForm",
    setup() {
        const invoice = reactive({
            clientName: "",
            clientAdress: "",
            clientPostal: "",
            titleInvoice: "",
            dueDate: "",
            items: [
                {
                    description: "",
                    quantity: "",
                    amount: 0,
                },
            ],
            status: "En attente",
        });

        const totalAmount = computed(() => {
            return invoice.items.reduce((total, item) => total + Number(item.amount), 0);
        });

        const addItem = () => {
            invoice.items.push({
                description: "",
                quantity: "",
                amount: 0,
            });
        };

        const removeItem = (index) => {
            invoice.items.splice(index, 1);
        };

        const submitInvoice = async () => {
            try {
                const invoiceNumber = "INV-" + Date.now();

                invoice.invoiceNumber = invoiceNumber;

                const calculatedTotalAmount = totalAmount.value;

                invoice.totalAmount = calculatedTotalAmount;

                const invoiceCollection = collection(db, "invoices");
                await addDoc(invoiceCollection, invoice);
                console.log("Facture ajoutée avec succès");
            } catch (error) {
                console.error("Erreur lors de l'ajout de la facture:", error);
            }
            resetForm();
        };

        const resetForm = () => {
            invoice.clientName = "";
            invoice.dueDate = "";
            invoice.items = [
                {
                    description: "",
                    amount: 0,
                },
            ];
        };

        return {
            invoice,
            addItem,
            removeItem,
            submitInvoice,
            totalAmount,
        };
    },
};
</script>

<style lang="scss" scoped>
.invoice-form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.invoice-form div {
    margin-bottom: 1rem;
}

.invoice-form label {
    display: block;
    margin-bottom: 0.5rem;
}

.invoice-form input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
}

button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}
</style>
