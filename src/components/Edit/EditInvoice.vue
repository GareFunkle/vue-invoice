<template>
    <div class="edit-invoice">
        <h1>Éditer la facture : {{ invoice.titleInvoice }} pour {{ invoice.clientName }}</h1>
        <form id="invoice-content" @submit.prevent="updateInvoice">
            <div>
                <label for="clientName">Nom du client :</label>
                <input type="text" id="clientName" v-model="invoice.clientName" required />
            </div>
            <div>
                <label for="clientAdress">Adresse :</label>
                <input type="text" id="clientAdress" v-model="invoice.clientAdress" required />
            </div>
            <div>
                <label for="clientPostal">Code Postal :</label>
                <input type="text" id="clientPostal" v-model="invoice.clientPostal" required />
            </div>
            <div>
                <label for="titleInvoice">Descriptions De la facture :</label>
                <input type="text" id="titleInvoice" v-model="invoice.titleInvoice" required />
            </div>
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
            <!-- <table>
                <thead>
                    <tr>
                        <th>Nom de l'article</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in invoice.items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.quantity * item.price }}</td>
                    </tr>
                </tbody>
            </table> -->

            <button type="button" @click="addItem">Ajouter un article</button>

            <div>
                <label for="status">Statut :</label>
                <select id="status" v-model="invoice.status">
                    <option value="En attente">En attente</option>
                    <option value="Payée">Payée</option>
                </select>
            </div>

            <button type="submit">Mettre à jour</button>
        </form>
        <button type="button" @click="generatePDF">Télécharger la facture en PDF</button>

    </div>
</template>
  
<script>
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import { db } from "../../data/firebase/index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
        const generatePDF = async () => {
            const invoiceElement = document.getElementById("invoice-content");

            try {
                const canvas = await html2canvas(invoiceElement, { scale: 1 });
                const imgData = canvas.toDataURL("image/jpeg", 1.0);
                const pdf = new jsPDF();
                pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);
                pdf.save(`Facture-${invoiceId.value}.pdf`);
            } catch (error) {
                console.error("Erreur lors de la génération du PDF:", error);
            }
        };


        fetchInvoice();

        return {
            invoiceId,
            invoice,
            updateInvoice,
            addItem,
            removeItem,
            generatePDF
        };
    },
};
</script>
  
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}
</style>
  