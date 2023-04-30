<template>
    <div class="edit__invoice">
        <h1>Éditer la facture : {{ invoice.titleInvoice }} pour {{ invoice.clientName }}</h1>
        <form id="invoice-content" @submit.prevent="updateInvoice">
            <div class="invoice__header-wrap">

                <div class="header__wrap-text">
                    <p class="margin__text">V.D</p>
                    <p class="margin__text">Durret Vincent</p>
                    <p class="margin__text">99 Boulevard Carnot</p>
                    <p class="margin__text">06.13.19.81.10</p>
                </div>

                <div class="invoice__header">

                    <div class="header__text">
                        <label for="clientName">Nom du client :</label>
                        <input type="text" id="clientName" v-model="invoice.clientName" required />
                    </div>
                    <div class="header__text">
                        <label for="clientAdress">Adresse :</label>
                        <input type="text" id="clientAdress" v-model="invoice.clientAdress" required />
                    </div>
                    <div class="header__text">
                        <label for="clientPostal">Code Postal :</label>
                        <input type="text" id="clientPostal" v-model="invoice.clientPostal" required />
                    </div>
                    <div class="header__text">
                        <label for="clientCity">Ville :</label>
                        <input type="text" id="clientCity" v-model="invoice.clientCity" required />
                    </div>
                    <div class="header__text">
                        <label for="clientCountry">Pays :</label>
                        <input type="text" id="clientCountry" v-model="invoice.clientCountry" required />
                    </div>
                </div>
            </div>
            <div class="invoice__description">
                <div>
                    <label for="titleInvoice">Descriptions De la facture :</label>
                    <input type="text" id="titleInvoice" v-model="invoice.titleInvoice" required />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nom de l'article</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in invoice.items" :key="index">
                        <td>
                            <input v-model="item.description" />
                        </td>
                        <td>
                            <input type="number" v-model.number="item.quantity" />
                        </td>
                        <td>
                            <input type="number" step="0.01" v-model.number="item.amount" />
                        </td>
                        <td>
                            <button type="button" @click="removeItem(index)">Supprimer l'article</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="invoice__total">
                <h3>Total:</h3>
                <p>{{ totalAmount }} € </p>
            </div>

            <button type="button" @click="addItem">Ajouter un article</button>

            <div class="invoice__status">
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
        const totalAmount = computed(() => {
            if (invoice.value && invoice.value.items) {
                return invoice.value.items.reduce((total, item) => total + (Number(item.amount) * Number(item.quantity)), 0);
            } else {
                return 0;
            }
        });

        const updateInvoice = async () => {
            invoice.value.totalAmount = totalAmount.value; // Déplacez cette ligne ici
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
            totalAmount
        };
    },
};
</script>
  
<style lang="scss" scoped>
.edit__invoice {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;

    .invoice__header-wrap {
        position: relative;
        display: flex;
        align-items: first baseline;
        justify-content: space-between;

        .header__wrap-text {

            .margin__text {
                padding: 0.2rem;
            }
        }

        .invoice__header {
            display: flex;
            flex-direction: column;

        }

        .header__text {
            padding: 0.5rem;
        }
    }

    .invoice__description {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }

    .invoice__total {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: end;

        h3 {
            margin-right: 0.3rem;
        }
    }

    .invoice__status {
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: center;
        margin-top: 1rem;
    }

}


h1 {
    text-align: center;
    margin-bottom: 40px;
}



// form>div {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     gap: 10px;
//     align-items: center;
// }

label {
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table,
th,
td {
    border: 1px solid #ccc;
}

th,
td {
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #45a049;
}

button[type="submit"] {
    background-color: #007BFF;
    margin-top: 20px;
}

button[type="submit"]:hover {
    background-color: #0069D9;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table thead {
    background-color: #f2f2f2;
}

table th,
table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

table th {
    font-weight: bold;
    padding-top: 12px;
    padding-bottom: 12px;
}
</style>
  