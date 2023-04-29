<template>
    <main>
        <h1>Ajouter une facture</h1>
        <InvoiceForm />
    </main>
</template>

<script>
import InvoiceForm from '../components/Form/InvoiceForm.vue';
export default {
    name: "AddInvoices",
    components: {
        InvoiceForm
    }
}
</script>

<style></style>