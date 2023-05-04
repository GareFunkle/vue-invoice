<template>
    <div class="edit__estimate">
        <h1>Éditer la facture : {{ estimate.titleEstimate }} pour {{ estimate.clientName }}</h1>
        <form id="estimate-content" @submit.prevent="updateEstimate">
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
                    <label for="titleEstimate">Descriptions De la facture :</label>
                    <input type="text" id="titleEstimate" v-model="estimate.titleEstimate" required />
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
                    <tr v-for="( item, index ) in  estimate.items " :key="index">
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

            <button type="button" @click="addItem()">Ajouter un article</button>

            <div class="estimate__status">
                <label for="status">Statut :</label>
                <select id="status" v-model="estimate.status">
                    <option value="En attente">En attente</option>
                    <option value="Devis accepté">Devis accepté</option>
                </select>
            </div>
            <CustomBtn text="Mettre à jour" type="submit" />
        </form>

    </div>
</template>
  
<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { db } from "../../data/firebase/index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CustomBtn from "../Button/CustomBtn.vue";


export default {
    name: "EditEstimate",
    components: {
        CustomBtn
    },
    setup() {
        const route = useRoute();
        const router = useRouter()
        const estimateId = computed(() => {
            return route.params.estimateId;
        });
        const estimate = ref({});

        const fetchInvoice = async () => {
            const estimateRef = doc(db, "estimates", estimateId.value);
            const estimateSnap = await getDoc(estimateRef);

            if (estimateSnap.exists()) {
                estimate.value = estimateSnap.data();
            } else {
                console.log("Aucune facture trouvée avec cet ID.");
            }
        };
        const totalAmount = computed(() => {
            if (estimate.value && estimate.value.items) {
                return estimate.value.items.reduce((total, item) => total + (Number(item.amount) * Number(item.quantity)), 0);
            } else {
                return 0;
            }
        });

        const updateEstimate = async () => {
            estimate.value.totalAmount = totalAmount.value; // Déplacez cette ligne ici
            const estimateRef = doc(db, "estimates", estimateId.value);
            await updateDoc(estimateRef, estimate.value);
            router.push("/")
            console.log("Facture mise à jour !");

        };

        const addItem = () => {
            estimate.value.items.push({
                name: "",
                quantity: 1,
                price: 0
            });
        };

        const removeItem = (index) => {
            estimate.value.items.splice(index, 1);
        };



        fetchInvoice();

        return {
            estimateId,
            estimate,
            updateEstimate,
            addItem,
            removeItem,
            totalAmount
        };
    },
};
</script>
  
<style lang="scss" scoped>
.edit__estimate {
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

        }

        .header__text {
            padding: 0.5rem;
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
    background-color: var(--color-2);
    color: var(--color-3);
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: var(--color-1);
    }
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
  