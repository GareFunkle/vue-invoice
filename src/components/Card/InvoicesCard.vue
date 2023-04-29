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
            <router-link class="invoice__card-btnEdit" :to="`/invoices/${invoices.id}/edit`">
                <p>Éditer</p>
            </router-link>
        </div>

    </main>
</template>

<script>
export default {
    name: "InvoicesCard",
    props: {
        invoices: Object
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