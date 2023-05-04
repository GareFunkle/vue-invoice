<template>
    <h1>Devis : {{ estimate.titleEstimate }} pour {{ estimate.clientName }}</h1>
    <div class="btn__download-wrap">
        <button @click="generatePDF()"> Telecharger en pdf</button>

    </div>

    <div id="estimate-content" class="estimate__look">
        <div class="estimate__header-wrap">
            <div class="header__wrap-text">
                <p class="margin__text">V.D</p>
                <p class="margin__text">Durret Vincent</p>
                <p class="margin__text">99 Boulevard Carnot</p>
                <p class="margin__text">06.13.19.81.10</p>
            </div>

            <div class="estimate__header">
                <div class="header__text">
                    <p> {{ estimate.clientName }}</p>
                </div>
                <div class="header__text">
                    <p>{{ estimate.clientAdress }}</p>
                </div>
                <div class="header__text">
                    <p>{{ estimate.clientPostal }}</p>
                </div>
                <div class="header__text">
                    <p>{{ estimate.clientCity }}</p>
                </div>
                <div class="header__text">
                    <p>{{ estimate.clientCountry }}</p>
                </div>
            </div>
        </div>
        <div class="estimate__description">
            <div>
                <p>{{ estimate.titleEstimate }}</p>
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
                <tr v-for="(item, index) in estimate.items" :key="index">
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.amount }} €</td>
                </tr>
            </tbody>
        </table>
        <div class="estimate__total">
            <h3>Total:</h3>
            <p>{{ estimate.totalAmount }} €</p>
        </div>

        <div class="estimate__text">
            Ce devis est valable pour une duree de 1 mois

        </div>


        <div class="estimate__text">
            TVA non applicable, art. 293 B du CGI
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
    name: "LookEstimate",
    setup() {
        const route = useRoute();
        const estimateId = computed(() => {
            return route.params.estimateId;
        });
        const estimate = ref({});

        const fetchEstimate = async () => {
            const estimateRef = doc(db, "estimates", estimateId.value);
            const estimateSnap = await getDoc(estimateRef);

            if (estimateSnap.exists()) {
                estimate.value = estimateSnap.data();
            } else {
                console.log("Aucune facture trouvée avec cet ID.");
            }
        };

        const generatePDF = async () => {
            const estimateElement = document.getElementById("estimate-content");

            try {
                const canvas = await html2canvas(estimateElement, { scale: 2 });
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
                pdf.save(`Devis-${estimateId.value}.pdf`);
            } catch (error) {
                console.error("Erreur lors de la génération du PDF:", error);
            }
        };

        fetchEstimate();

        return {
            estimateId,
            estimate,
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
        background-color: var(--color-2);
        color: var(--color-3);
        border: none;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
            background-color: var(--color-1);
        }
    }
}



.estimate__look {
    font-family: Arial, sans-serif;

    margin: 0 auto;
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    box-sizing: border-box;
    background-color: white;
    font-size: 12px;

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

    .estimate__total {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: end;
        margin-bottom: 3rem;

        h3 {
            margin-right: 0.3rem;
        }
    }

    .estimate__text {
        margin-bottom: 2rem;
    }


}
</style>