<template>
   <div id="cart">
        <div class="container is-fluid main-container">
            <div class="columns is-variable is-centered my-6">
                <div class="column is-two-thirds ">

                    <div class="columns is-8 is-mobile is-gapless is-align-items-center" v-if="totaleCarrello > 0">
                        <div class="column is-half"><h1 class="title">Checkout</h1></div>
                        <div class="column is-half is-right "><div class="cart-total is-hidden-mobile">Tot. Carrello: <span>€{{totaleCarrello}}</span></div></div>
                    </div>
                    
                    <b-message type="is-warning" v-if="totaleCarrello <= 0">Nessun prodotto da ordinare</b-message>

                    <div v-if="totaleCarrello > 0">
                        
                        <form @submit.prevent="sendList()">
                            <div class="columns">
                                <div class="column is-one-third">
                                    <b-field label="Nome e cognome *">
                                        <b-input v-model="cf_name" required></b-input>
                                    </b-field>
                                </div>
                                <div class="column is-one-third">
                                    <b-field label="Telefono *">
                                        <b-input v-model="cf_tel" required></b-input>
                                    </b-field>
                                    
                                </div>
                                <div class="column is-one-third">
                                    <b-field label="Email *">
                                        <b-input v-model="cf_email" required></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Modalità di Consegna *">
                                        <b-radio v-model="cf_spedizione" name="cf_spedizione" native-value="Negozio">
                                            Ritiro in negozio
                                        </b-radio>
                                        <b-radio v-model="cf_spedizione" name="cf_spedizione" native-value="Domicilio" v-if="this.$store.state.bloccoConsegne == false">
                                            Consegna a domicilio <span v-if="$store.state.options.op_consegna != 0">(+ {{$store.state.options.op_consegna}}€)</span>
                                        </b-radio>
                                    </b-field>
                                </div>  
                            </div>
                            <div class="columns" v-if="cf_spedizione == 'Negozio'">
                                <div class="column is-one-third" >
                                    <b-field label="Fascia Oraria Ritiro*">
                                        <b-select placeholder="Seleziona Fascia Oraria" v-model="cf_fasciaoraritiro" expanded required>
                                            <option v-for="(option, index) in this.$store.state.options.op_orariritiro" :value="option.orario" :key="index">
                                                {{ option.orario }}
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns" v-if="cf_spedizione == 'Domicilio'">
                                <div class="column is-one-third">
                                    <b-field label="Indirizzo di consegna *">
                                        <b-input v-model="cf_address" required></b-input>
                                    </b-field>
                                </div>
                                <div class="column is-one-third">
                                    <b-field label="Città *">
                                        <b-select placeholder="Seleziona Città" v-model="cf_citta" expanded required>
                                            <option v-for="(option, index) in this.$store.state.options.op_paesi" :value="option.paesi" :key="index">
                                                {{ option.paesi}}
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                                <div class="column is-one-third">
                                    <b-field label="Fascia Oraria Consegna*">
                                        <b-select placeholder="Seleziona Fascia Oraria" v-model="cf_fasciaoraconsegna" expanded required>
                                            <option v-for="(option, index) in this.$store.state.options.op_oraridomicilio" :value="option.orario" :key="index">
                                                {{ option.orario}}
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                            </div>
    
                            <div class="columns">
                                <div class="column is-full">
                                    <b-field label="Note di consegna">
                                        <b-input maxlength="200" type="textarea" v-model="cf_message"></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-full">
                                    <b-field>
                                        <b-checkbox required v-model="cf_privacy">Dichiaro di aver letto e di accettare l'informativa sulla <a :href="this.$store.state.options.op_privacy">Privacy</a></b-checkbox>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns hidden">
                                <textarea rows="5" name="cf_list" id="cf_list" v-model="prodottiCarrello" disabled></textarea>
                            
                                <input type="text" v-model="cf_bombolo" class="cf_bombolo" name="cf_bombolo">
                            </div>
                            <div class="columns">
                                <div class="column has-text-centered"><DataConsegna @childDataConsegna="getDataConsegna" /></div>
                                <div class="column">
                                    
                                    <b-button type="is-primary" native-type="submit" expanded style="height:100%">Invia la richiesta</b-button>
                                    <div v-if="isLoading"> <img src="@/assets/images/loading.gif" alt="Loading">  Invio in corso...</div>

                                </div>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
   </div>           
</template>


<script>
import axios from 'axios'
import DataConsegna from '@/components/DataConsegna.vue'
import ThankYou from '@/components/ThankYou.vue'

export default {
    name: 'Checkout',
    components:{
		DataConsegna,
	},

    data(){
        return {
            cf_name : '',
            cf_email : '',
            cf_tel : '',
            cf_address : '',
            cf_citta : '',
            cf_fasciaoraritiro: '',
            cf_fasciaoraconsegna: '',
            cf_message : '',
            cf_bombolo : '',
            cf_totale : '',
            cf_dataconsegna: '',
            cf_privacy : '',
            cf_spedizione: this.$store.state.consegnaAttiva,
            isLoading : false,

        }
    },

    computed:{
        carrello(){
            return this.$store.state.carrello; 
        },
        
        
        totaleCarrello(){
            //Fare $emit per navbar

            if(this.cf_spedizione == 'Domicilio'){
                this.$store.commit('addShipPrice', this.cf_spedizione); 
            } else {
                this.$store.commit('addShipPrice', this.cf_spedizione); 
            }
            // lo faccio per verificare se true o false
            this.$store.commit('updateTotCarrello');
            return (Math.round(this.$store.state.totalecarrelloSpedizione * 100) / 100)
        },  
        prodottiCarrello(){
            let prodcarrello = '' ;

            //estraggo dal carrello le stringhe per costruire la mail
            this.carrello.forEach(function(item) {
                prodcarrello += 'Nome: '+item.name+'\n';
                prodcarrello += 'Quantità: '+item.quantity+item.units+'\n';
                prodcarrello += 'Prezzo Unitario: '+item.price+'€'+'\n';
                prodcarrello += 'Prezzo Totale: '+item.sumprice+'€'+'\n\n';
            });
            return prodcarrello;
        }
        
       
    },
    methods:{     
        getDataConsegna(value) {
            this.cf_dataconsegna = value;
        },
        sendList(){

            let form = new FormData();
            
            form.append("cf_name", this.cf_name)
            form.append("cf_email", this.cf_email)
            form.append("cf_address", this.cf_address)
            form.append("cf_tel", this.cf_tel)
            form.append("cf_citta", this.cf_citta)
            form.append("cf_fasciaoraconsegna",this.cf_fasciaoraconsegna)
            form.append("cf_fasciaoraritiro",this.cf_fasciaoraritiro)
            form.append("cf_dataconsegna",this.cf_dataconsegna)
            form.append("cf_message", this.cf_message)
            form.append("cf_privacy", this.cf_privacy)
            form.append("cf_spedizione", this.cf_spedizione)
            form.append("cf_list", this.prodottiCarrello)
            form.append("cf_totale", this.totaleCarrello)

            if( this.cf_bombolo == ''){

                this.isLoading = true;
                
                axios({
                    method: 'post',
                    url: `https://www.webisonstage.cloud/beretta/wp-json/contact-form-7/v1/contact-forms/159/feedback`,
                    data: form,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    } //necessario per CF7
                }).then((response) => { 
                    
                    if(response.data.status != 'validation_failed'){
                        this.$store.commit('emptyCart');

                        this.$buefy.modal.open({
                            parent: this,
                            component: ThankYou,
                            hasModalCard: false,
                            customClass: 'thank-you-message',
                            trapFocus: true
                        })
                                  
                        //redirect alla home
                        this.$router.push('/home');
                          
                    } else {
                        this.$buefy.toast.open({
                            message: response.data.message,
                            type: 'is-danger',
                            position: 'is-bottom',
                            queue: false,
                            duration: 1000
                        })
                        
                    }

                    this.isLoading = false;

                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .hidden{
        visibility: hidden;
        height: 0;
    }
    .thank-you {
        z-index: 10;
    }
    .b-radio.radio:not(.button){
        margin-right: 1.5rem;
    }
</style>