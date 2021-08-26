<template>
    <div class="delivery" v-bind:class="{'has-background-warning py-2': this.$route.path == '/checkout'}">
        <div class="label mb-0">Prossima data {{labelConsegna}}</div>
        <div>{{tomorrowDate}}</div>
    </div>
</template>

<script lang="ts">


export default {
    name : 'DataConsegna',
    computed:{

        labelConsegna(){
            if(this.$store.state.consegnaAttiva == 'Domicilio'){
                return "consegna"
            }else {
                return "ritiro"
            }
        },
        
        tomorrowDate(){
            var dateFormat = require("dateformat");
            dateFormat.i18n = {
                dayNames: [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mer",
                    "Gio",
                    "Ven",
                    "Sab",
                    "Domenica",
                    "Lunedì",
                    "Martedì",
                    "Mercoledì",
                    "Giovedì",
                    "Venerdì",
                    "Sabato",
                ],
                monthNames: [
                    "Gen",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mag",
                    "Giu",
                    "Lug",
                    "Ago",
                    "Set",
                    "Ott",
                    "Nov",
                    "Dic",
                    "Gennaio",
                    "Febbraio",
                    "Marzo",
                    "Aprile",
                    "Maggio",
                    "Giugno",
                    "Luglio",
                    "Agosto",
                    "Settembre",
                    "Ottobre",
                    "Novembre",
                    "Dicembre",
                ],
            };

            const today = new Date()
            const todayDate = new Date(today)
            
            let dataconsegna;
            
            //se oggi è sabato, la consegna va a lunedì
            if(dateFormat(todayDate, "dddd") == 'Sabato'){
                dataconsegna = todayDate.setDate(todayDate.getDate() + 2)
            } else if(dateFormat(todayDate, "HH") >= '19' && dateFormat(todayDate, "dddd") != 'Venerdì'){
                dataconsegna = todayDate.setDate(todayDate.getDate() + 2)
            } else if(dateFormat(todayDate, "dddd") == 'Venerdì' && dateFormat(todayDate, "HH") >= '19'  ){
                dataconsegna = todayDate.setDate(todayDate.getDate() + 3)
            } else {
                dataconsegna = todayDate.setDate(todayDate.getDate() + 1)
            }

            this.$emit('childDataConsegna', dateFormat(dataconsegna, "dddd d mmmm yyyy"));
            return dateFormat(dataconsegna, "dddd d mmmm yyyy");
        },
    },
}
</script>
