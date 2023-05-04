<template>
    <main>

        <div class="estimate">
            <h3 class="estimate__title margin">{{ estimates.titleEstimate }}</h3>
            <p class="estimate__clientName margin">{{ estimates.clientName }}</p>
            <p class="estimate__date margin">{{ estimates.dueDate }}</p>
            <p class="estimate__number margin">{{ estimates.EstimateNumber }}</p>
            <p class="estimate__status margin" :class="{
                'status-paid': estimates.status === 'Devis accepté',
                'status-pending': estimates.status === 'En attente'
            }">{{ estimates.status }}</p>
            <p class="estimate__amount margin">{{ estimates.totalAmount }} €</p>
            <div class="estimate__btn-wrap">
                <router-link class="estimate__card-btn btn" :to="`/estimate/${estimates.id}/voir`">
                    <CustomBtn text="Voir" />
                </router-link>
                <router-link class="estimate__card-btn btn" :to="`/estimate/${estimates.id}/edit`">
                    <CustomBtn text="Éditer" />
                </router-link>
                <CustomBtn text="Supprimer" type="delete" @click="openModal = !openModal" />
            </div>
        </div>


        <div v-if="openModal" class="modal__wrap">

            <div class="modal">
                <h4 class="modal__title">
                    Voulez vous vraiment supprimer la facture {{ estimates.titleInvoice }} ?
                </h4>

                <div class="modal__btn">
                    <CustomBtn text="Oui" type="delete" @click="deleteEstimate()" />
                    <CustomBtn text="Non" @click="openModal = !openModal" />
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import { ref } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../data/firebase/index'
import CustomBtn from '../../components/Button/CustomBtn.vue'
export default {
    name: "InvoicesCard",
    components: {
        CustomBtn,
    },
    props: {
        estimates: Object
    },
    setup(props) {

        const openModal = ref(false)

        const deleteEstimate = async () => {
            await deleteDoc(doc(db, "estimates", props.estimates.id))
            console.log("produits supprimer avec succes")
            openModal.value = false
        }

        return {
            openModal,
            deleteEstimate,
        }

    }

}
</script>

<style lang="scss">
.estimate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid var(--color-2);
    border-radius: calc(5rem / 3);
    background: var(--color-1);



    .estimate__title {
        background: var(--color-2);
        color: var(--color-3);
        padding: 1rem;
        font-weight: bold;
        border-radius: calc(4rem / 2);
    }

    .estimate__date {
        font-size: 0.8rem;
    }

    .estimate__number {
        font-size: 0.8rem;
    }

    .estimate__status {
        font-size: 0.9rem;
    }

    .estimate__amount {
        font-size: 1.2rem;
    }

    .margin {
        padding: 0.5rem;
        color: var(--color-3);
    }

    .estimate__btn-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;


        .btn {
            margin: 0.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .estimate__card-btn {
            text-decoration: none;
            color: black;
        }
    }

}

.status-paid {
    background: var(--color-4);
    color: white;
}

.status-pending {
    background: var(--color-6);
    color: white;
}

.modal__wrap {
    position: fixed;
    background: #000000af;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    .modal {
        position: absolute;
        background: var(--color-1);
        border-radius: calc(3rem / 1.5);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 35rem;
        z-index: 3;
        padding: 1rem;


        .modal__title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: var(--color-3);
        }

        .modal__btn {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            span {
                padding: 1rem;
                cursor: pointer;
                border-radius: calc(4rem / 2);
            }



        }
    }

}
</style>