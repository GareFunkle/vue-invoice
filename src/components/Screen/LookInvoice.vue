<template>
    <h1>Facture : {{ invoice.titleInvoice }} pour {{ invoice.clientName }}</h1>
    <div class="btn__download-wrap">
        <button @click="generatePDF()"> Telecharger en pdf</button>

    </div>

    <div id="invoice-content" class="invoice__look">
        <div class="invoice__header-wrap">
            <div class="header__wrap-text">
                <p class="margin__text">V.D</p>
                <p class="margin__text">Durret Vincent</p>
                <p class="margin__text">99 Boulevard Carnot</p>
                <p class="margin__text">06.13.19.81.10</p>
            </div>

            <div class="invoice__header">
                <div class="header__text">
                    <p> {{ invoice.clientName }}</p>
                </div>
                <div class="header__text">
                    <p>{{ invoice.clientAdress }}</p>
                </div>
                <div class="header__text">
                    <p>{{ invoice.clientPostal }}</p>
                </div>
                <div class="header__text">
                    <p>{{ invoice.clientCity }}</p>
                </div>
                <div class="header__text">
                    <p>{{ invoice.clientCountry }}</p>
                </div>
            </div>
        </div>
        <div class="invoice__description">
            <div>
                <p>{{ invoice.titleInvoice }}</p>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nom de l'article</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in invoice.items" :key="index">
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.amount }} €</td>
                </tr>
            </tbody>
        </table>
        <div class="invoice__total">
            <h3>Total:</h3>
            <p>{{ invoice.totalAmount }} €</p>
        </div>

        <div class="invoice__text">
            llllllllllllllllllll
        </div>


        <div class="invoice__text">
            llllllllllllllllllll
        </div>


        <div class="invoice__text">
            llllllllllllllllllll
        </div>

    </div>
</template>
  
<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { db } from "../../data/firebase/index";
import { doc, getDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
    name: "LookInvoice",
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

        const generatePDF = async () => {
            const invoiceElement = document.getElementById("invoice-content");

            try {
                const canvas = await html2canvas(invoiceElement, { scale: 2 });
                const imgData = canvas.toDataURL("image/jpeg", 1.0);

                // Créez un document PDF au format A4
                const pdf = new jsPDF("p", "mm", "a4");

                // Calculez la largeur et la hauteur de l'image pour qu'elle s'adapte au format A4
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = (canvas.width * pageHeight) / canvas.height;
                const imgHeight = pageHeight;

                // Ajoutez l'image redimensionnée au PDF
                const x = (pageWidth - imgWidth) / 2;
                const y = 0;
                pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

                // Enregistrez le PDF
                pdf.save(`Facture-${invoiceId.value}.pdf`);
            } catch (error) {
                console.error("Erreur lors de la génération du PDF:", error);
            }
        };

        fetchInvoice();

        return {
            invoiceId,
            invoice,
            generatePDF
        };
    },
};
</script>
<style lang="scss" scoped>
h1 {
    text-align: center;
    margin-bottom: 40px;
}

.btn__download-wrap {
    display: flex;
    justify-content: center;
    align-items: center;


    button {
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
            background-color: #45a049;
        }
    }
}



.invoice__look {
    font-family: Arial, sans-serif;

    margin: 0 auto;
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    box-sizing: border-box;
    background-color: white;
    font-size: 12px;

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
</style>