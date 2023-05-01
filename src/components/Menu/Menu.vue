<template>
    <div class="menu__wrap">
        <div class="menu">
            <ul class="menu__items">

                <li class="menu__item"><router-link class="menu__item-btn" to="/">Mes factures</router-link></li>
                <li class="menu__item"><router-link class="menu__item-btn" to="/add-estimate">Creer un devis</router-link>
                </li>

                <li class="menu__item"><router-link class="menu__item-btn" to="/add-invoices">Creer une
                        facture</router-link></li>

                <!-- <li class="menu__item"><router-link class="menu__item-btn" to="/is-waiting">En attente</router-link></li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
}
</script>

<style lang="scss">
.menu__wrap {
    background: var(--color-2);

    .menu {
        padding: 2rem 1rem;

        .menu__items {
            display: flex;
            align-items: center;
            justify-content: space-around;

            .menu__item {
                list-style: none;

                .menu__item-btn {
                    display: inline-block;
                    padding: 10px 20px;
                    color: var(--color-3);
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    border-radius: calc(1rem / 2);
                    background: var(--color-6);
                    transition: background 0.3s ease-in-out;



                    &:hover {
                        background: var(--color-5);
                    }
                }
            }

        }

    }
}
</style>