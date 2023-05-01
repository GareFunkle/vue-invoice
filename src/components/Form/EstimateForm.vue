<template>
    <div class="estimate__form-wrap">
        <h2 class="estimate__from-title">Nouveau Devis</h2>
        <form @submit.prevent="submitEstimate">
            <div class="estimate__header-wrap">

                <div class="header__wrap-text">
                    <p class="margin__text">V.D</p>
                    <p class="margin__text">Durret Vincent</p>
                    <p class="margin__text">99 Boulevard Carnot</p>
                    <p class="margin__text">06.13.19.81.10</p>
                </div>

                <div class="estimate__header">


                    <div class="header__text">
                        <label for="clientName">Nom du client :</label>
                        <input type="text" id="clientName" v-model="estimate.clientName" required />
                    </div>
                    <div class="header__text">
                        <label for="clientAdress">Adresse :</label>
                        <input type="text" id="clientAdress" v-model="estimate.clientAdress" required />
                    </div>
                    <div class="header__text">
                        <label for="clientPostal">Code Postal :</label>
                        <input type="text" id="clientPostal" v-model="estimate.clientPostal" required />
                    </div>

                    <div class="header__text">
                        <label for="clientCity">Ville :</label>
                        <input type="text" id="clientCity" v-model="estimate.clientCity" required />
                    </div>
                    <div class="header__text">
                        <label for="clientCountry">Pays :</label>
                        <input type="text" id="clientCountry" v-model="estimate.clientCountry" required />
                    </div>
                </div>
            </div>
            <div class="estimate__description">
                <div>

                    <label for="titleEstimate">Descriptions du devis :</label>
                    <input type="text" id="titleEstimate" v-model="estimate.titleEstimate" required />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantité</th>
                        <th>Montant</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in estimate.items" :key="index">
                        <td>
                            <input type="text" :id="'description-' + index" v-model="item.description" required />
                        </td>
                        <td>
                            <input type="number" :id="'quantity-' + index" v-model="item.quantity" required>
                        </td>
                        <td>
                            <input type="number" :id="'amount-' + index" v-model="item.amount" step="0.01" required />
                        </td>
                        <td>
                            <button type="button" @click="removeItem(index)" v-if="index > 0">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" @click="addItem">Ajouter un article</button>
            <div class="estimate__total">
                <h3>Total:</h3>
                <p>{{ totalAmount }} € </p>
            </div>
            <div class="estimate__due">

                <div>
                    <label for="dueDate">Date d'échéance :</label>
                    <input type="date" id="dueDate" v-model="estimate.dueDate" required />
                </div>
            </div>
            <div class="estimate__status">

                <div>
                    <label for="status">Statut :</label>
                    <select id="status" v-model="estimate.status">
                        <option value="En attente">En attente</option>
                        <option value="Payée">Payée</option>
                    </select>
                </div>
            </div>
            <button type="submit">Créer le devis</button>
        </form>

    </div>
</template>
  
<script>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { db, collection } from "../../data/firebase/index";
import { addDoc } from "firebase/firestore";

export default {
    name: "EstimateForm",
    setup() {
        const router = useRouter()

        const estimate = reactive({
            clientName: "",
            clientAdress: "",
            clientPostal: "",
            clientCity: "",
            clientCountry: "",
            titleEstimate: "",
            dueDate: "",
            items: [
                {
                    description: "",
                    quantity: 1,
                    amount: 0,
                },
            ],
            status: "En attente",
        });

        const totalAmount = computed(() => {
            return estimate.items.reduce((total, item) => total + (Number(item.amount) * Number(item.quantity)), 0);
        });

        const addItem = () => {
            estimate.items.push({
                description: "",
                quantity: 1,
                amount: 0,
            });
        };

        const removeItem = (index) => {
            estimate.items.splice(index, 1);
        };

        const submitEstimate = async () => {
            try {
                const estimateNumber = "Devis-" + Date.now();

                estimate.estimateNumber = estimateNumber;

                const calculatedTotalAmount = totalAmount.value;

                estimate.totalAmount = calculatedTotalAmount;

                const estimateCollection = collection(db, "estimates");
                await addDoc(estimateCollection, estimate);
                console.log("Facture ajoutée avec succès");
            } catch (error) {
                console.error("Erreur lors de l'ajout de la facture:", error);
            }
            resetForm();
            router.push("/")
        };

        const resetForm = () => {
            estimate.clientName = "";
            estimate.dueDate = "";
            estimate.clientAdress = "";
            estimate.clientPostal = "";
            estimate.clientCity = "";
            estimate.clientCountry = "";
            estimate.items = [
                {
                    description: "",
                    quantity: 1,
                    amount: 0,
                },
            ];
        };

        return {
            estimate,
            addItem,
            removeItem,
            submitEstimate,
            totalAmount,
        };
    },
};
</script>

<style lang="scss" scoped>
.estimate__form-wrap {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;

    .estimate__header-wrap {
        position: relative;
        display: flex;
        align-items: first baseline;
        justify-content: space-between;

        .header__wrap-text {

            .margin__text {
                padding: 0.2rem;
            }
        }

        .estimate__header {
            display: flex;
            flex-direction: column;

            .header__text {
                padding: 0.5rem;
            }
        }

    }

    .estimate__description {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }

    .estimate__total {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: end;

        h3 {
            margin-right: 0.3rem;
        }
    }

    .estimate__due {
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: center;
        margin-top: 1rem;
    }

    .estimate__status {
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
