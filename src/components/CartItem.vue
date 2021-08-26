<template>
    <div class="card">
        <div class="card-content product-card columns is-variable is-2 is-mobile is-align-items-center">
            <div class="column py-0 is-one-third">
                <img :src="daticartitem.image" />
            </div>
            <div class="column py-2 is-two-thrid">
                <div class="title">{{daticartitem.name}}</div>
                <div class="price mb-4">€ {{decimalPrice}}/{{daticartitem.units}}</div>
                <b-numberinput size="is-small" class="quantity" controls-position="compact" @input="changeQty()" v-model="daticartitem.quantity" min="1"></b-numberinput>
            </div>
            
            <div class="icon-button remove-to-cart" @click="deleteItem(daticartitem.name)"><i class="far fa-trash-alt"></i></div>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .remove-to-cart{
        position:absolute;
        top:.75rem;
        right: .75rem;
        background-color: $grey-light;
        color: $white;
    }
    .quantity{
        input[type='number']{
            width: 50px;
            border: none;
        }
    }
</style>

<script>
export default {
    name: 'CartItem',
    props: ['daticartitem','index'],
    data(){
        return {
            sumprice : this.daticartitem.sumprice
        }
    },
    computed: {
        decimalPrice(){
            if(this.daticartitem.price){
                return this.daticartitem.price.toFixed(2);
            } else {
                return this.daticartitem.price;
            }
        }
    },
    methods: {
        changeQty(){
            if(this.daticartitem.quantity == 0){

                this.daticartitem.quantity = this.daticartitem.quantity+1;
                this.$emit('changedProdQty', this.daticartitem);

            } else if(this.daticartitem.quantity >= 1){

                this.daticartitem.sumprice = this.daticartitem.price * this.daticartitem.quantity;
                this.sumprice =  this.daticartitem.sumprice;

                this.$emit('changedProdQty', this.daticartitem)
            }

        },
        deleteItem(name){

           this.$store.commit('removeFromCart', this.daticartitem);
           this.$store.commit('updateTotCarrello');

           this.$buefy.toast.open({
                message: name +' rimosso dal carrello',
                type: 'is-danger',
                position: 'is-bottom',
                queue: false,
                duration: 1000
            })
        },
        
    }
}
</script>
