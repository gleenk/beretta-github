<template>
    <div class="header">
        <div class="container">
            <div class="container is-fluid is-flex is-align-items-center is-justify-content-space-between">
                <router-link :to="{ path: '/home' }" class="has-text-grey-light"><i class="fas fa-home"></i></router-link>

                <router-link v-if="this.$route.path != '/cart' && this.$route.path != '/checkout'" class="icon-button button is-primary" :to="{ path: '/cart' }">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="total-quantity" v-if="$store.state.totalQuantity > 0">{{$store.state.totalQuantity}}</span>
                </router-link>

                <div v-if="this.$route.path == '/cart' || this.$route.path == '/checkout'" class="cart-total topper-cart">Tot. Carrello: <span>€{{totaleCarrello}}</span></div>
            </div>
        </div>
    </div>    
</template>
<style lang="scss" scoped>
    @import '../assets/scss/_variables.scss';
    .header{
        width: 100%;
        position: fixed;
        top:0;
        left: 0;
        background-color: white;
        height: 60px;
        z-index: 1;
        box-shadow: 0px 0px 50px #ddd;
        .container{
            height: 60px;
        }
    }
    .icon-button{
        width: 2.5rem;
        height: 2.5rem;
        .total-quantity {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: $darkred;
            color:$white;
            font-size: 0.75rem;
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }
    }
    .cart-total{
        font-size: .75rem;
        span{
            font-size: 1.25rem;
        }
    }
</style>
<script>
export default {
    computed:{
        totaleCarrello(){
            return Math.round(this.$store.state.totalecarrelloSpedizione * 100) / 100; 
        },
    },
}
</script>