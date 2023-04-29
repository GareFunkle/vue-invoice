<template>
    <div class="menu__wrap">
        <div class="menu">
            <ul class="menu__items">
                <li class="menu__item"><a class="menu__item-btn" href="/">Mes facture</a></li>
                <li class="menu__item"><a class="menu__item-btn" href="/add-invoices">Creer une facture</a></li>
                <li class="menu__item"><a class="menu__item-btn" href="/is-waiting">En attente</a></li>
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
$color-start: #6EE7B7;
$color-middle: #3BA9EE;
$color-end: #DD1B16;
$animation-duration: 3s;

// Mixin pour créer un gradient animé
@mixin gradient-animation($start, $middle, $end, $duration) {
    background-size: 250% 100%;
    background-image: linear-gradient(to right, $start, $middle, $end);
    animation: gradient $duration infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
}

.menu__wrap {
    background: #9683EC;

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
                    color: #BA55D3;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    border-radius: calc(1rem / 2);
                    transition: background 0.3s;

                    @include gradient-animation($color-start, $color-middle, $color-end, $animation-duration);

                    &:hover {
                        background-size: 100% 100%;
                    }
                }
            }

        }

    }
}
</style>