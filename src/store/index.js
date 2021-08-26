import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ //serve a preservare gli state quando faccio refresh di pagina
    storage: window.sessionStorage,
  })],
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    prodotti : [],
    listaprezzi: [],
    catsprodotti: [],
    intervalloprezzi: [],
    carrello: [],
    totalecarrello: Number,
    isLoaded: false,
    totalQuantity: 0,
    options: {},
    appstyles : {},
    consegnaAttiva : 'Negozio',
    totalecarrelloSpedizione : 0,
    bloccoConsegne: false
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    addProdotto(state, payload){
      state.prodotti.push(payload)
    },
    setOptions(state,payload){
      state.options = payload
      state.appstyles = {
        '--app-color1': payload.op_color1,
        '--app-color2': payload.op_color2 ,
        '--app-bgcolor': payload.op_sfondo,
      }
    },
    setCategorie(state, payload){
      state.catsprodotti = payload
    },
    setProdotti(state, payload){
      
      state.prodotti = payload
      state.isLoaded = true;
    },
    addToCart(state, payload){
      state.carrello.push(payload)
    },
    updateCart(state, payload){
      //cerchiamo l'array con lo stesso ID e aggiorniamo in base al payload
      const item = state.carrello.find(item => item.id === payload.id);
      Object.assign(item, payload);      
    },
    removeFromCart(state,payload){

      const index = state.carrello.indexOf(payload); //per rimuovere un elemento dell'array devo prima cercare la
      if (index > -1) {
        state.carrello.splice(index, 1);
      }
      
    },
    updateTotCarrello(state){
      let totaleprezzi = 0;
      let totalqty = 0;

      state.carrello.forEach(function(item) {
          totaleprezzi = totaleprezzi + item.sumprice
          totalqty = totalqty + item.quantity;
      });

      state.totalQuantity = totalqty;
      state.totalecarrello = Math.round(totaleprezzi* 100) / 100;

      if(this.state.consegnaAttiva == 'Domicilio'){
        state.totalecarrelloSpedizione = state.totalecarrello + parseInt(state.options.op_consegna);
      } else {
        state.totalecarrelloSpedizione = state.totalecarrello;
      }

    },
    addShipPrice(state, payload){
      state.consegnaAttiva = payload;
    },
    emptyCart(state){
      state.totalQuantity = 0;
      state.carrello = []
      state.totalecarrello = 0
      state.totalecarrelloSpedizione = 0
    },
    blockConsegna(state){
      let datablocco = new Date(state.options.op_blocco);
      let todayDate = new Date();
      //se datablocco è superiore ad oggi --> blocco
      if(datablocco > todayDate){
          state.bloccoConsegne = true
      } else {
        state.bloccoConsegne = false
      }
    },
  },
  actions: {
    getOptions({ commit }){
      axios({
        url: process.env.VUE_APP_ROOT_API+'/acf/v3/options/options', 
        method: 'GET'
      })
      .then(response => {
          // JSON responses are automatically parsed.
          commit('setOptions', response.data.acf)

          //verifico se è attivo blocco
          commit('blockConsegna');

      }).catch(err => {
        console.log(err)
      })
    },

    getProdotti({ commit }){
      axios({
        url: process.env.VUE_APP_ROOT_API+'/wl/v1/prodotti', 
        method: 'GET'
      })
      .then(response => {
          // JSON responses are automatically parsed.
          commit('setProdotti', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getCategorieProdotti({commit}){
      axios({
        url: process.env.VUE_APP_ROOT_API+'/wl/v1/prodotti-categorie', 
        method: 'GET'
      }).then(response => {
          // JSON responses are automatically parsed.
          commit('setCategorie', response.data)
      }).catch(err => {
        console.log(err)
      })
    },



  },
  getters : {
    authStatus: state => state.status,
    StateProdotti: state => state.prodotti,
    StateCategorieProdotti: state => state.catsprodotti
  }
})