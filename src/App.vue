<template>
  <div id="app" :style="$store.state.appstyles">
    <Navbar v-if="this.$route.path != '/'"/>
    <router-view/>
    <footer class="footer" v-if="this.$route.path != '/'">
      <div class="container">
        <div class="content has-text-centered">
          <p>{{$store.state.options.op_datifiscali}} - <a :href="this.$store.state.options.op_privacy">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
  export default {
    title: 'Beretta Web App',
    mounted() {
      this.$store.dispatch("getProdotti");
      this.$store.dispatch("getCategorieProdotti");
      this.$store.dispatch("getOptions");
    },
    components:{
      Navbar,
    },
  }
</script>