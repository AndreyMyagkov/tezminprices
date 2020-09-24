<template>

<div id="tez-results-min">

    <h2 class="tours-not-found-block" v-if="getNotFound">{{ $t('results.error.notFound') }}</h2>

    <!-- туры с группировкой по отелю-->
    <toursGroupped :tours="resultsGroupped" />

    <progressbar  v-if="getTourLoading"></progressbar>

</div>

  


</template>

<script>
import { mapGetters } from 'vuex';


import progressbar from '@/components/results/progressbar.vue'
import toursGroupped from '@/components/results/toursGroupped.vue'



export default {
    name: 'results',
     components: {
        progressbar,
        toursGroupped,
    },

    methods: {

        loadMore() {
            this.$store.dispatch('loadMore');
        }

    },
    computed: {
        ...mapGetters([
            'getResults',
            'getTourLoading',
            'getTotal',
            'getNotFound',
            'getHasNext',
        ]),


        total() {

        },

        

        resultsGroupped(){
            return this.$store.getters.getResults
        }
    },
    filters: {
        priceFormat: function (value) {
            if (!value) return ''
            return new Intl.NumberFormat('ru-RU').format(value)+' ₽'
        }
    },


}
</script>

<style scoped>
#tez-results-min {
    /* padding-top: 50px; */
    font-family: 'PT Sans',
    Arial,
    sans-serif;
    line-height: 1;
    min-width: 320px;
    height: 100%;
    color: #333;
    --baseColor: #333;
    --formColorTop: #007cb9;
    --formColorBottom: #ececfb;
    --buttonColor: #2db29f;
}

</style>