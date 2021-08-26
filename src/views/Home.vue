<template>
	<div id="Beretta">
		<div class="container">
			<div class="container is-fluid main-container">
			<div class="columns is-variable is-8 my-5">
				<div class="column is-one-third">
					<div class="pre-title">Benvenuti,</div>
					<div class="title">{{pageTitle}}</div>

					<b-field>
						<b-input placeholder="Cerca prodotti..." type="search" v-model="searchProd" icon="magnify" expanded></b-input>
					</b-field>

					<div class="filter-category buttons">
						<b-button type="is-primary" size="is-small" inverted @click="resetFilter('Tutti')" :class="{ 'is-active': isActive('Tutti') }">Tutti</b-button>
						<b-button type="is-primary" size="is-small" inverted v-for="categoria in this.$store.state.catsprodotti" :key="categoria.id" @click="filterCategory(categoria)" :class="{ 'is-active': isActive(categoria.name) }">{{categoria.name}}</b-button>
					</div>   

					

				</div><!--/.column-->
				<div class="column is-two-thirds">
					<div class="title">Prodotti</div>
					<transition-group name="list" tag="div" class="products-grid">
						<div v-for="prodotto in computedProducts" :key="prodotto.id">
						<Prodotto :datiprodotto="prodotto" />
						</div>
					</transition-group>
					<transition name="list">
						<b-message type="is-danger" v-if="computedProducts.length  == 0">Nessun prodotto corrispondente ai filtri di ricerca</b-message>
					</transition>
				</div><!--/.column-->
				
			</div>

		</div><!--/.container--> 
		</div>		
	</div>
</template>

<script>

import Prodotto from '@/components/Prodotto.vue'

export default {
	name : 'Home',
	components:{
		Prodotto,
	},

	data() {
		return {
			pageTitle: process.env.VUE_APP_TITLE,
			stateProdotti : '',
			stateCategorieProdotti: '',
			errors: [],
			selectedCategory: '',
			searchProd: '',
			activeItem : 'Tutti'
		}
	},

	computed:{
		
		computedProducts(){
			
			return this.$store.state.prodotti.filter( //controllo tutti gli item e mi ritorna solo gli elementi per cui il return è sempre true
				(item) => {

					var category = this.selectedCategory ? (item.category.includes(this.selectedCategory)) : true,
						search = this.searchProd ? (item.name.toLowerCase().includes(this.searchProd.toLowerCase())) : true; //verifico se la categoria selezionata è nell'array ritorna true

					return category && search; //restituisco l'item solo se la risposta è true / true / true
				
				}
			);
			
		}
	},
	methods:{

		isActive(cat){
			return this.activeItem == cat
		},

		filterCategory(getcategory){
			this.activeItem = getcategory.name;
			this.selectedCategory = getcategory.name;
		},
		resetFilter(){
			this.searchProd = '',
			this.selectedCategory = '';
			this.activeItem = 'Tutti';
			
		}
	}
}
</script>

<style lang="scss">
	.flex-wrapper,
	.flex-wrapper > div{
	display: flex;
	justify-content: center;
	}
	.list-enter-active, .list-leave-active {
	transition: all .2s;
	}
	.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	}

	.filters-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.products-grid {
		display: grid;
		grid-gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}

	@media (max-width:768px){
		.filter-category {
			flex-wrap: nowrap;
			overflow: auto;
		}
	}
	img {
		max-width: 100%;
		height: auto;
	}
</style>