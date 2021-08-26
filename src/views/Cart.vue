<template>
   <div id="cart">
        <div class="container is-fluid main-container">
            <div class="columns is-variable is-8 is-centered my-6">
                <div class="column is-two-thirds">
                    <div class="columns is-8 is-mobile is-gapless is-align-items-center">
                        <div class="column is-half"><h1 class="title">Carrello</h1></div>
                        <div class="column is-half is-right"><div class="cart-total is-hidden-mobile">Tot. Carrello: <span>€{{totaleCarrello}}</span></div></div>
                    </div>

                    <div class="products-grid" v-if="carrello.length != 0">
                        <div  v-for="(cart, index) in carrello" :key="index">
                            <CartItem :daticartitem="cart" @changedProdQty="updateCartQty" :index="index" />
                        </div>
                    </div>

                    <b-message type="is-warning" v-if="carrello.length == 0">Nessun prodotto nel carrello</b-message>


                </div>
            </div>
        </div>
         <div class="bottombar">
            <div class="container">
                <div class="container is-fluid is-flex is-align-items-center is-justify-content-space-between">
                    <b-button type="is-primary" inverted tag="router-link" :to="{ path: '/home' }">Precedente</b-button>
                    <div v-if="carrello.length != 0">
                        <b-button type="is-primary" tag="router-link" :to="{ path: '/checkout' }">Ordina</b-button>
                    </div>
                </div>
            </div>
        </div> 
   </div>           
</template>


<script>
import CartItem from '@/components/CartItem'

export default {
    name: 'Cart',
    components:{
        CartItem,
    },
    
   
    computed:{
        totaleCarrello(){
            return Math.round(this.$store.state.totalecarrelloSpedizione * 100) / 100; 
        },  
        carrello(){
            return this.$store.state.carrello; 
        }
    },
    methods:{     

        updateCartQty(prod){
            //aggiorno carrello in locale
            const item = this.carrello.find(item => item.id === prod.id);
            Object.assign(item, prod);

            //aggiorno state carrello
            this.$store.commit('updateCart', prod);
            this.$store.commit('updateTotCarrello');
        }
 
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .cart-total{
        text-align: right;
        span{
            display: block;
            font-size: 1.5rem;
            color: $darkred;
            font-weight: 700;
        }
    }
</style>