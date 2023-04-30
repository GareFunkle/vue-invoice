<template>
    <main>

        <div class="invoice">
            <h3 class="invoice__title margin">{{ invoices.titleInvoice }}</h3>
            <p class="invoice__clientName margin">{{ invoices.clientName }}</p>
            <p class="invoice__date margin">{{ invoices.dueDate }}</p>
            <p class="invoice__number margin">{{ invoices.invoiceNumber }}</p>
            <p class="invoice__status margin" :class="{
                'status-paid': invoices.status === 'Payée',
                'status-pending': invoices.status === 'En attente'
            }">{{ invoices.status }}</p>
            <p class="invoice__amount margin">{{ invoices.totalAmount }} €</p>
            <div class="invoice__btn-wrap">
                <router-link class="invoice__card-btn btn" :to="`/invoices/${invoices.id}/voir`">
                    <p>Voir</p>
                </router-link>
                <router-link class="invoice__card-btn btn" :to="`/invoices/${invoices.id}/edit`">
                    <p>Éditer</p>
                </router-link>
                <p class="btn" @click="deleteInvoice()">Suprimer</p>
            </div>
        </div>

    </main>
</template>

<script>

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../data/firebase/index'
export default {
    name: "InvoicesCard",
    props: {
        invoices: Object
    },
    setup(props) {

        const deleteInvoice = async () => {
            await deleteDoc(doc(db, "invoices", props.invoices.id))
            console.log("produits supprimer avec succes")
        }

        return {
            deleteInvoice
        }

    }

}
</script>

<style lang="scss">
.invoice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid orange;
    border-radius: calc(5rem / 3);



    .invoice__title {
        background: yellow;
        padding: 1rem;
        font-weight: bold;
    }

    .invoice__date {
        font-size: 0.8rem;
    }

    .invoice__number {
        font-size: 0.8rem;
    }

    .invoice__status {
        font-size: 0.9rem;
    }

    .invoice__amount {
        font-size: 1.2rem;
    }

    .margin {
        padding: 0.5rem;
    }

    .invoice__btn-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;


        .btn {
            margin: 0.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .invoice__card-btn {
            text-decoration: none;
            color: black;
        }
    }

}

.status-paid {
    background: green;
    color: white;
}

.status-pending {
    background: orange;
    color: white;
}
</style>