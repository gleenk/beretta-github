<template>
   <div id="login">
       <section class="login-wrapper">
           <div class="login-logo"><img :src="$store.state.options.op_logo.url" :alt="$store.state.options.op_logo.alt"></div>
           
            <div class="login-address has-text-centered" :style="{'color' : $store.state.options.op_color2 }">
                <p>{{$store.state.options.op_indirizzo}}<br>
                T: <a :href="`tel:${$store.state.options.op_telefono}`">{{$store.state.options.op_telefono}}</a>
                </p>
            </div>
            <b-button type="is-primary" inverted tag="router-link" :to="{ path: '/home' }">Ordina a domicilio</b-button>
        </section>
    </div>
</template>

<script>
//import axios from 'axios';

export default {
    name: 'Login',
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    #login{
        height: 100%;
    }
    .login-wrapper {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
        max-width: 480px;
        align-items: center;
        margin: 0 auto;
        padding: 3rem 0;
        width: 80%;
        .login-logo{
            transform: translateY(40%);
        }
    }
    #login{
        background-color: var(--app-bgcolor);
        background-image: url('../assets/images/circles.svg');
        background-repeat: no-repeat;
        background-position: center 75vh;
        background-size: 600px ;
        .button.is-primary{
            border: none;
            padding: 1.25rem 4rem;
            font-size: 1.25rem;
            width: 100%;
        }
    }
    .login-address {
        a {
            color:$brown;
        }
    }
</style>