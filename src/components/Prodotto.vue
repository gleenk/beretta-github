<template>
    <div class="card">
        <div class="card-content product-card columns is-variable is-2 is-mobile is-align-items-center">
            <div class="column py-0 is-one-third">
                 <router-link :to="{name: 'ProductDetail', params: {id: datiprodotto.id}}"><img :src="datiprodotto.image" /></router-link>
            </div>
            <div class="column py-2 is-two-thrid">
                <b-taglist class="mb-0"><b-tag type="is-primary is-light" v-for="cat in datiprodotto.category" :key="cat.id"> {{cat}}</b-tag></b-taglist>
                <router-link :to="{name: 'ProductDetail', params: {id: datiprodotto.id}}"><div class="title">{{datiprodotto.name}}</div></router-link>
                <div class="desc mb-2"  v-html="datiprodotto.desc_preview"></div>
                <div class="price">€ {{decimalPrice}}/<span>{{datiprodotto.units}}</span></div>   
            </div>
            
            <div class="icon-button add-to-cart button is-primary" @click="addToStateCart"><i class="fas fa-shopping-cart"></i></div>
        </div>
    </div>

  
</template>

<script>
export default {
    name: 'Prodotto',
    props: ['datiprodotto'],
    data(){
        return {
            quantity : 0,
            sumprice: this.datiprodotto.price
        }
    },
    computed : {
        newProdotto(){
            return Object.assign(this.datiprodotto, {quantity: this.quantity, sumprice:this.sumprice}) //aggiungiamo quantity e sommaprezzo all'oggetto datiprodotto
        },
        decimalPrice(){
            if(this.datiprodotto.price){
                return this.datiprodotto.price.toFixed(2);
            } else {
                return this.datiprodotto.price;
            }
        }
    },
    
    methods: {
        addToStateCart(){
           //devo verificare se è già nel carrello
            let prod = this.$store.state.carrello.filter( prod => prod.id == this.datiprodotto.id );

            if( prod.length > 0){
                //se il prodotto è nel carrello, prendo la quantity da lì e la aggiorno
                this.quantity = prod[0].quantity+1;
                this.sumprice = this.datiprodotto.price * this.quantity;

                this.$store.commit('updateCart', this.newProdotto);
                this.$store.commit('updateTotCarrello');

            } else {
                //se il datiprodotto non è nel carrello aumento la quantità a 1
                this.quantity = this.quantity+1;
                this.$store.commit('addToCart', this.newProdotto); //commit to vuex
                this.$store.commit('updateTotCarrello');
            }

            
            this.$buefy.toast.open({
                message: this.newProdotto.name +' aggiunto al carrello!',
                type: 'is-success',
                position: 'is-bottom',
                queue: false,
                duration: 1000
            })

        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .card {
        height: 100%;
        padding: 1.5rem;
        position: relative;
    }
    .card-content {
        padding: 0;
        margin:0;
        height: 100%;
    }
    .product-card{
        .title{
            font-size: 1.25rem;
            margin-bottom: .25rem;
        }
        .desc{
            font-size: .75rem;
        }
        .price{
            font-size: 1.5rem;
            color: $darkred;
            font-weight: 700;
            span{
                    font-size: 1rem;
                }
        }
        .add-to-cart{
            position: absolute;
            bottom: 0.75rem;
            right: 0.75rem;
            font-size: 0.875rem;
        }
    }
</style>