<template>
    <div class="product-detail main-container">

        <div class="container">
            <div class="container is-fluid">
            <div class="columns is-variable is-8">
                <div class="column is-one-third ">
                    <figure class="main-thumb with-shadow"><img :src="prodotto.image" /></figure>
                </div><!--/.column-->
                <div class="column is-two-thirds py-5">

                    <div class="prod-heading">
                        
                        <div class="title is-4 mb-0">{{prodotto.name}}</div>
                        <div class="price">€ {{decimalPrice}}/<span>{{prodotto.units}}</span></div>
                    </div>
                    <div class="desc mt-2" v-html="prodotto.description"></div>

                    <div class="ingredients my-5" v-if="prodotto.ingredients">
                        <div class="title is-5">Ingredienti</div>
                        {{prodotto.ingredients}}
                    </div>

                    <DataConsegna class="my-5" />
                    <label class="label mt-5">Quantità in {{prodotto.units}}</label>
                    <b-field>
                        <b-numberinput size="is-small" class="quantity" controls-position="compact" v-model="changeSingleQty" :min="1"></b-numberinput>
                    </b-field>

                </div><!--/.column-->
                
            </div>

        </div><!--/.container--> 
        </div>
			
        <div class="bottombar">
            <div class="container">
                <div class="container is-fluid is-flex is-align-items-center is-justify-content-space-between">
                    <b-button type="is-primary" inverted tag="router-link" :to="{ path: '/home' }">Precedente</b-button>
                    <b-button type="is-primary" @click="addToStateCart">Aggiungi al carrello</b-button>
                </div>
            </div>
        </div>  
    </div>
        
</template>

<script>
import axios from 'axios'
import DataConsegna from '@/components/DataConsegna.vue'

export default {
    components:{
		DataConsegna,
	},
    created(){

        axios({
            url: `https://webisonstage.cloud/beretta/wp-json/wl/v1/prodotti/?prod_id=${this.$route.params.id}`, 
            method: 'GET'
        })
        .then(response => {
            // JSON responses are automatically parsed.
            this.prodotto = response.data[0];
            
        })
        
    },
    data(){
        return {
            prodotto : '',
            quantity : 0,
            sumprice: 0,
            changeSingleQty : 1
        }
    },

    computed:{
        newProdotto(){
            return Object.assign(this.prodotto, {quantity: this.quantity, sumprice:this.sumprice}) //aggiungiamo quantity e sommaprezzo all'oggetto datiprodotto
        },
        decimalPrice(){
            if(this.prodotto.price){
                return this.prodotto.price.toFixed(2);
            } else {
                return this.prodotto.price;
            }
        },
    },

    methods: {
        
        addToStateCart(){
           //devo verificare se è già nel carrello
            let prod = this.$store.state.carrello.filter( prod => prod.id == this.$route.params.id );

            if( prod.length > 0){

                //console.log("sono nel carrello")
                //se il prodotto è nel carrello, prendo la quantity da lì e la aggiorno
                this.quantity = prod[0].quantity+this.changeSingleQty;
                this.sumprice = this.prodotto.price * this.quantity;

                this.$store.commit('updateCart', this.newProdotto);
                this.$store.commit('updateTotCarrello');
            } else {
                //console.log("non sono nel carrello")
                //se il prodotto non è nel carrello aumento la quantità a 1
                this.quantity = this.quantity+this.changeSingleQty;
                this.sumprice = this.prodotto.price * this.quantity;

                this.$store.commit('addToCart', this.newProdotto); //commit to vuex
                this.$store.commit('updateTotCarrello');
            }

            this.$buefy.toast.open({
                message: this.newProdotto.name +' aggiunto al carrello!',
                type: 'is-success',
                position: 'is-top',
                queue: false,
                duration: 1000
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .product-detail{
        padding-bottom: 60px;
        @media (min-width:769px) {
            margin-top: 2.75rem;
        }
        .main-thumb{
            text-align: center;
        }
        .with-shadow{
            box-shadow: 0px 0px 50px #ddd;
            @media (max-width:768px) {
                margin:0 -2rem;
            }
        }
        .prod-heading{
            display: flex;
            align-items: center;
            .prod-info{
                padding-right: .5rem;
            }
            .price{
                text-align: right;
                flex: 1 0 auto;
                font-size: 1.75rem;
                color: #B01418;
                font-weight: 700;
                span{
                    font-size: 1rem;
                }
            }
        }
    }
</style>