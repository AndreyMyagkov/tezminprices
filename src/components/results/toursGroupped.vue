<template>

<ul class="search-result__list">
    <li :class="['search-result__list-item', 'search-result__list-item_full-group', {'search-result__list-item_opened-group': expandedHotelId==item.id}]" v-for="(item,i) of tours" :key="i">
        <div class="search-result__list-item-info search-result__list-item-info_full-group">

            <!-- фото -->
            <a :href="`/${lng}/otel?id=${item.info.hotel.id}`" target="_blank" rel="nofollow" class="search-result__hotel-photo-wrapper search-result__col-1">
                    <img class="tour-badge__img" title="" src="/tezminprices/i/priority.png" v-if="item.info.info.baseHotel.value">

                    <img class="tour-badge__img" title="" src="/tezminprices/i/recommended.png" v-if="item.info.info.topPriority.value">

                    <img class="tour-badge__img" title="" src="/tezminprices/i/exclusive.png" v-if="item.info.info.exclusive.value">
                    <div class="tour-badge" v-if="item.info.info.baseHotel.value || item.info.info.topPriority.value || item.info.info.exclusive.value">
                </div>
                <img :src="item.info.hotel.thumb"  class="search-result__hotel-photo">
            </a>

            <!-- инфо -->
            <div class="search-result__col-2">
                <div class="search-result__col-wr">
                    <div class="search-result__col-4">

                        <!-- name -->
                        <a :href="`/${lng}/otel?id=${item.info.hotel.id}`" target="_blank" class="search-result-text search-result-text_hotel search-result-text_full-group-hotel search-result__property" :title="item.info.hotel.name">{{ item.info.hotel.name }}</a>
                        
                        <!-- geo -->
                        <div class="search-result__full-group-destination">
                            <div class="search-result__property search-result-text_grey" v-html="`${item.info.country.name}, ${item.info.resort.name}`">
                                
                            </div>
<!-- TODO: ET, вынос в предложения, а тут перечислить все? -->
                            
                            <div class="search-result__arrival search-result__property" :title="$t('results.card.aeroport')" v-html="item.info.resort.nameFlyTo">
                            </div>
                           
                            <div class="search-result__property">
                                {{ $tc('results.tourists.adult', item.info.groupAges.adt) }}
                                <template v-if="item.info.groupAges.chd || item.info.groupAges.inf">
                                ,
                                {{ $tc('results.tourists.childs', item.info.groupAges.chd + item.info.groupAges.inf) }}
                                </template>
                            </div>
                        </div>

                    </div>

                    <div class="search-result__col-5">               
                        
                        <!-- dates TODO: мин макс-->
                        <div class="search-result__full-group-dates">
                            <div class="search-result-text search-result-text_big search-result-text_bold search-result-text_dates">
                                {{ $t('results.card.flights') }}
                                {{ `${item.info.checkInMinStr} (${item.info.dayWeekFrom})` }}
                                <template v-if="item.info.checkInMinStr!=item.info.checkInMaxStr">
                                    <span> — </span>
                                    {{ item.info.checkInMaxStr }}
                                </template>
                                </div>
                            <div class="search-result__nights  -text search-result-text_grey">
                                {{ (item.info.nightsMin!=item.info.nightsMax?`${item.info.nightsMin} - `:'') + $tc('date.nights', item.info.nightsMax) }}
                               
                            </div>
                        </div>

                        <div>
                            <div class="tourpackage">
                                <div class="tourpackage__item tourpackage__avia" :title="$t('results.card.packet.flight')"></div>
                                <div class="tourpackage__item tourpackage__accomodation" :title="$t('results.card.packet.accommodation')"></div>
                                <div class="tourpackage__item tourpackage__transfer" :title="$t('results.card.packet.transfer')"></div>
                                <!-- <div class="tourpackage__item tourpackage__insurance" :title="$t('results.card.packet.insurance')"></div> -->
                            </div>
                        </div>


                    </div>
                </div>

            </div>

            <!-- прайс, бронь -->
            <div class="search-result__col-3 search-result__full-aside">

                <div class="search-result__full-price">
                    {{ $t('results.from') }} <span>&nbsp;</span>
                    <span class="sr-currency-rub search-result-text__standart-price search-result-text__standart-price_with-border">
                        {{ item.info.totalFormatted }} €
                    </span>
                </div>

                <div class="search-result-text search-result-text_normal search-result__full-toursInGroup">
                    {{ $tc('results.tours', item.items.length) }}
                </div>

                <button class="uis-button uis-button_orange uis-button_small uis-button_show-more-info" v-show="expandedHotelId!=item.id" @click="expandedHotelId=item.id; toursShowed=10">{{ $t('results.card.showTours') }}</button>

                <button class="uis-button uis-button_orange uis-button_small uis-button_show-more-info uis-button_show-more-info-active" v-show="expandedHotelId==item.id" @click="expandedHotelId=null">{{ $t('results.card.closeTours') }}</button>


            </div>


        </div>

        <div class="search-result__more-info" v-if="expandedHotelId==item.id">
            <ul class="search-result-grouped-tours">
                <li class="search-result-grouped-tours__item" v-for="(subitem,k) of item.items.slice(0,toursShowed)" :key="k">

                    <div class="search-result__col-1">
                        
                        <!-- dates -->
                        <div class="search-result__full-group-dates">
                            <div class="search-result-text search-result-text_bold search-result-text_dates">
                                {{ subitem.dateFromDDMM }} {{ subitem.dayWeekFrom }}
                               
                                <template v-if="subitem.dateFromDDMM!=subitem.dateToDDMM">
                                    <span> — </span>
                                    {{ subitem.dateToDDMM }}
                                </template>

                                </div>
                            <div class="search-result__nights   search-result-text_grey">{{ $tc('date.nights', subitem.nights) }}</div>
                        </div>

                        

                    </div>

                    <div class="search-result__col-4">

                        <!-- meal room -->
                        <div class="search-result__full-accomodation">
                            <div class="search-result__full-simple-block search-result__full-simple-block_double-size">
                                <div class="search-result-text"><span class="search-result-text search-result-text_bold">{{ subitem.pansion.name }}</span>
                                    <span class="search-result-text search-result-text_grey" :title="subitem.pansion.descr" v-if="subitem.pansion.descr"> — {{ subitem.pansion.descr }}</span>
                                </div>
                                <div class="search-result__full-type-room">
                                    <div class="search-result-text search-result-text_grey">
                                        <span class="search-result-text search-result-text_bold search-result-text_black">{{ subitem.room.name }}</span>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="search-result__col-5">

                        <!-- наличие мест, билетов -->
                        <div class="search-result__full-flat-cell">
                            <div class="search-result-availability">
                                <span :class="`search-result-availability__item search-result-availability__item_icon-house search-result-availability__item_${subitem.roomAvailability}`">
                                    <svg width="12" height="11"><use xlink:href="#icon-house"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.placesInHotel') }} — {{ $t(`results.avalability['${subitem.roomAvailability}']`) }}</div>
                                </span>


                                 <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.to.econom.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-fly-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsEconomTo') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.to.econom.seatSet}']`) }}</div>
                                </span>

                               <!-- <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.to.premiumEconom.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-fly-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsPremiumEconomTo') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.to.premiumEconom.seatSet}']`) }}</div>
                                </span>


                                <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.to.business.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-biz-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsBusinessTo') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.to.business.seatSet}']`) }}</div>
                                </span>


                                <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.to.first.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-biz-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsFirstTo') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.to.first.seatSet}']`) }}</div>
                                </span> -->

                                

                                <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.from.econom.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-fly-back"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsEconomFrom') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.from.econom.seatSet}']`) }}</div>
                                </span>

                                <!-- <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.from.premiumEconom.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-fly-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsPremiumEconomFrom') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.from.premiumEconom.seatSet}']`) }}</div>
                                </span>


                                <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.from.business.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-biz-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsBusinessFrom') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.from.business.seatSet}']`) }}</div>
                                </span>


                                <span :class="`search-result-availability__item search-result-availability__item_${subitem.seatsAvailability.from.first.seatSet}`">
                                    <svg width="22" height="11"><use xlink:href="#icon-biz-there"></use></svg>
                                    <div class="search-result__special-popup search-result__special-popup_for-icon">{{ $t('results.avalability.ticketsFirstFrom') }} — {{ $t(`results.avalability['${subitem.seatsAvailability.from.first.seatSet}']`) }}</div>
                                </span> -->
                            </div>
                        </div>


                        <div class="search-result__operator-name search-result-text_grey"></div>
                    </div>

                    <div class="search-result__col-3">
                        <div class="sr-currency-rub search-result-text__standart-price search-result-text__standart-price_with-border">{{ subitem.totalFormatted }} €</div>
                        <div class="search-result__tour-action-btn-wrapper">
                            <span class="search-result__short-pay"
                            @click="orderTour({
                                foto: item.info.hotel.thumb,
                                hotel:item.info.hotel.name,
                                
                                country: item.info.country.name,
                                resort: item.info.resort.name,
                                dateFrom: subitem.dateFrom,
                                dateTo: subitem.dateTo,
                                nights:subitem.nights,
                                room:subitem.room.name,
                                meal:subitem.pansion.name,
                                price: subitem.totalFormatted,
                                transfer: 1
                            })"
                            
                            >{{ $t('results.card.order') }}</span>
                            
                        </div>
                    </div>

                </li>
            </ul>
            <div class="search-result__show-more-tours" v-if="(item.items.length-toursShowed)>0" @click="showNextTOurs(item.items.length)">
                <span class="search-result__show-more-tours-link">
                    {{ $t('results.pagination.show')+' '+ $tc('results.pagination.next', item.items.length-toursShowed )+' '+ $tc('results.tours', item.items.length-toursShowed)  }}
                </span>
            </div>

        </div>

    </li>
</ul>

</template>

<script>
export default {
    props: {
        tours: {
            type: Array,
            
        }
    },
    data() {
        return {
            expandedHotelId: null,
            toursShowed:10,
            lng: (this.$store.getters.getForm.locale == 'ru'? 'ru': 'ee')
        
        }
    },
    methods: {
        showNextTOurs(count){
            if ((count-this.toursShowed)>=10){
                this.toursShowed=this.toursShowed+10
            } else {
                this.toursShowed=count
            }
        },
        orderTour(tour){
            this.$store.commit('setOrder', tour);
            this.$store.commit('openOrderShow');
        }
    }

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
.tez-badge__img {
    display: inline-block;
    vertical-align: middle;
}
.results__more {
    cursor: pointer;
    padding: 16px 0;
    color: #007cb9;
    text-align: center;
    text-transform: uppercase;
    background-color: #f7f7f7;
    border: solid 1px #e9e9e9;
    margin: 10px 0;
}

.results__more:hover {
    background-color: #007cb9;
    color:#fff;
}


.tour-badge {
    position: absolute;
    top:0;
    left:0;
    border: 17px solid transparent;
    border-left: 17px solid #ffc717;
    border-top: 17px solid #ffc717;
    z-index: 10;
}

.tour-badge__img {
    position: absolute;
    left: 0px;
    top: 3px;
    z-index: 11;
}


.tourpackage {

}

.tourpackage__item {
    display: inline-block;
    width: 18px;
    height: 18px;
    /background: url(/tezminprices/i/tourpackage-icons.png) #007cb9;
    margin-right: 5px;
    position: relative;
}

.tourpackage__avia {
    background-position: 0 0;
}
.tourpackage__accomodation {
    background-position: -18px 0;
}
.tourpackage__transfer {
    background-position: -36px 0;
}
.tourpackage__insurance {
    background-position: -54px 0;
}


.search-result__arrival {
    background: url(/tezminprices/i/ico-airplan_small.png) no-repeat 0 6px;
    padding: 0 0 0 12px;
    margin-bottom: 10px;
}

.search-result__property {
    margin-bottom: 9px;
}



.search-result__full-toursInGroup{
    margin-bottom: 10px;
}
/*Error*/
.search-noresult {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    margin: 20px auto;
    min-height: 208px;
}
.search-noresult__title {
    padding-top: 0;
}
.uis-header-2 {
    padding: 20px 0 11px;
    font-weight: 300;
    line-height: 1.25em;
    font-size: 30px;
    text-align: center;
}


.search-result__list-item_opened-group {
    -webkit-box-shadow: 0 3px 20px rgba(16, 90, 140, .34);
    box-shadow: 0 3px 20px rgba(16, 90, 140, .34);
}

/* Pagination */
.uis-pagination {
    list-style: none;
    padding: 0;
    margin: 24px 0 0;
    user-select: none;
    text-align: center;
}
.uis-pagination__item {
    display: inline-block;
    margin: 0 4px;
    vertical-align: top;
    font-family: "Open Sans", Tahoma, Arial, sans-serif;
    font-size: 15px;
    color: #313140;
    border: none;
    background: none;
    text-align: center;
}

.uis-pagination__item:focus {
    outline:none
}

.uis-pagination__item_prev,
.uis-pagination__item:first-child {
    margin: 0 26px 0 0;
    font-weight: 400;
    color: #9797a6;
    float: left;
}

.uis-pagination__item_next,
.uis-pagination__item:last-child {
    margin: 0 0 0 26px;
    font-weight: 400;
    color: #9797a6;
    float: right;
}


.uis-pagination__item:not(.uis-pagination__item_dots):not(.uis-pagination__active-page):hover span {
    border-radius: 50%;
    background-color: rgba(33, 118, 189, .2);
    cursor: pointer
}


.uis-pagination__active-page  span{
    border-radius: 50%;
    background-color: #2176bd;
    color: #fff;
    font-weight: 700;
}


.uis-pagination__dots {
    font-weight: 300
}

.uis-pagination_circle .uis-pagination__item:not(.uis-pagination__item_prev):not(.uis-pagination__item_next)>a,
.uis-pagination_circle .uis-pagination__item:not(.uis-pagination__item_prev):not(.uis-pagination__item_next)>span {
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border: none
}




.uis-pagination_circle .uis-pagination__item_next,
.uis-pagination_circle .uis-pagination__item_prev {
    width: auto;
    height: 32px;
    line-height: 32px
}



.tours-not-found-block {
    text-align: center;
    margin: 30px auto;
    margin: 30px auto;
    font-size: 30px;
    font-weight: 400;
}

.uis-loader_search-result {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 200px;
    margin-top: 20px;
}
.loader {
    display: inline-block;
    z-index: 11;
    width: 112px;
    height: 20px;
    position: relative;
}

.loader>div {
    content: " ";
    width: 10px;
    height: 10px;
    background: #7ac3ff;
    border-radius: 100%;
    position: absolute;
    animation: shift 4s linear infinite
}

.loader>div:nth-of-type(1) {
    animation-delay: -.8s
}

.loader>div:nth-of-type(2) {
    animation-delay: -1.6s
}

.loader>div:nth-of-type(3) {
    animation-delay: -2.4s
}

.loader>div:nth-of-type(4) {
    animation-delay: -3.2s
}



@keyframes shift {
    0% {
        left: -60px;
        opacity: 0
    }

    10% {
        left: 0;
        opacity: 1
    }

    90% {
        left: 100px;
        opacity: 1
    }

    100% {
        left: 160px;
        opacity: 0
    }
}


.search-result__full-flat-cell {

}
.search-result-availability {
    width: 140px;
    height: 30px;
    margin-bottom: 6px;
    display: flex;;
}

.search-result-availability__item {
    position: relative;
    -webkit-box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    padding-top: 2px;
    box-sizing: border-box;
    font-size: 13px;
    width: 20%;
    height: 30px;
    text-align: center;
    color: #9797a6;
}
.search-result-availability__item_icon-house {
    padding-top: 0;
}

.search-result__special-popup_for-icon,
.search-result__special-popup_for-link {
    display: block;
    opacity: 1;
    visibility: visible;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    top: 100%;
    bottom: auto;
    right: auto;
    margin-top: 12px;
    z-index: 2;
}
.search-result__special-popup_for-icon {
    z-index: -10;
    opacity: 0;
    font-style: normal;
}
.search-result-availability__item:hover .search-result__special-popup {
    opacity: 1;
    z-index: 1;
    visibility: visible;
}




.search-result__full-aside {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;


    padding-top: 14px;
    padding-right: 16px;
    padding-left: 14px;
    text-align: center;
    border-left: 1px dotted transparent;
}
.search-result__full-price {
 
    font-weight: 600;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    margin-bottom: 10px;
}
.search-result__full-operator-name {
    margin-top: 10px;
}


.search-group {
    display: flex;
    flex-wrap: wrap;
}
.uis-button_more-details {
    margin: 0;
    width: 160px;
}

.search-group__label {

}

.search-group__item {
    margin: 0 8px;
    cursor:pointer
}

.search-group__item.active {
    font-weight: bold;
}

.search-options {
    display: block;
    margin: auto;
    padding: 10px 0;
    font-family: Open Sans, sans-serif
}

.search-options_new {
    background-color: #f6f6fd;
    padding: 10px;
    margin-top: 2px;
    margin-bottom: 10px
}

.new-search-options {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 7px;
    font-size: 14px;
    line-height: 39px;
    font-family: Open Sans, sans-serif;
    color: #313140;
}


.search-options_new .search-result__legend {
    padding: 5px 7px;
    padding-bottom: 0
}



.search-result__legend {
    color: #9797a6;
    font-size: 11px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-bottom: 0;
    padding-top: 10px;
}

.search-options__item {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    line-height: 18px;
    border-right: 1px solid #dbdbde
}
.new-search-options__switch-label {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
}

.search-options__item:last-child {
    border-right: none
}

.search-result__legend-icon {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
}

.search-result svg {
    pointer-events: none;
    fill: currentColor;
}

.search-result__legend-text {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
}

.search-result__legend-icon_circle:after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.search-result__legend-icon_green:after {
    background-color: #88aa2a;
}

.search-result__legend-icon_yellow:after {
    background-color: #f6a70e;
}

.search-result__legend-icon_red:after {
    background-color: #c9462c;
}

.search-result__legend-icon_grey:after {
    background-color: #cacad9;
}

.search-result__legend-icon_cross:after {
    display: block;
    content: "\D7";
    color: #9797a6;
    font-size: 18px;
    font-style: normal;
    line-height: 18px;
}








/*  */
.icn {
    display: inline-block;
    width: 20px;
    height: 20px;
    max-width: 20px;
    fill: #fff;
}



.hotel-review-item-mobile {
    margin-top: 36px
}

.hotel-services {
    padding: 0;
    margin: 20px 0 30px;
    font-size: 0;
    list-style-type: none;
    color: #313140;
    -webkit-column-count: 2;
    column-count: 2;
    -webkit-column-width: 50%;
    column-width: 50%
}

.hotel-services__item {
    min-height: 70px;
    padding-left: 70px;
    padding-right: 20px;
    padding-bottom: 10px;
    font-size: 13px;
    background-repeat: no-repeat;
    background-position: 0 0;
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;
    break-inside: avoid
}

.hotel-services__icon {
    float: left;
    line-height: 1;
    border-radius: 5px;
    color: #2980b9;
    margin-left: -70px;
    background-color: #f3f5f6;
    position: relative;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px
}

.hotel-services__list {
    padding: 0;
    margin: 0;
    list-style-type: none
}

.hotel-services__title {
    margin: 0;
    padding: 5px 0 0;
    font-weight: 600;
    font-size: 15px;
    color: #313140
}

.cruise-image {
    display: block;
    margin-top: 20px
}



.wtb .uis-button-group_view-switcher {
    white-space: nowrap
}

svg {
    fill: currentColor
}

.content-title {
    color: #1a71ba;
    font-size: 18px;
    margin-bottom: 20px;
    margin-left: 20px
}


.right {
    float: right !important
}

.uis-button {
    -webkit-appearance: none !important;
    color: #fff;
    background: #2db29f;
    cursor: pointer;
    padding: 8px 23px;
    border: none;
    border-radius: 4px;
    outline: none;
}


.search-result__time-published {
    background-color: #eb6907;
    color: #fff;
    font-size: 11px;
    line-height: 16px;
    border-radius: 8px;
    padding: 0 7px 0 5px;
    position: relative;
    cursor: pointer
}


.search-result__time-published_short {
    display: inline-block;
    margin-left: 6px;
    top: 5px
}

.search-result__time-published_online {
    background-color: #72d350
}

.search-result__time-published:hover .search-result__special-popup {
    left: -20px;
    margin-left: 50%;
    visibility: visible;
    opacity: 1;
    z-index: 2
}

.sr-currency-rub:after {
    /* content: "\420";
    display: inline;
    font-family: ALSRubl-Tahoma, Tahoma, sans-serif;
    text-transform: uppercase;
    font-weight: 300*/
} 



.search-result__list {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    list-style-type: none
}

.search-result__list-item {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin-top: 12px;
    background-color: #fff;
    border: 1px solid #dbdbea
}

.search-result__list-item-info {
    position: relative
}

.search-result__list-item-info_full-group {
    /* height: 149px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 14px;
    padding-left: 245px */
    display: flex;
}

.search-result__list-item-info_grouped-tours {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 12px 20px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.search-result__full-accomodation {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 8px;
    margin-bottom: 8px;
}

.search-result__full-type-room {
    display: inline-block;
    margin: 0 0 0 0;
    max-width: 90%;
}


.search-result__list-item_full,
.search-result__list-item_full-group {
    position: relative
}

.search-result-grouped-tours {
    margin: 0;
    padding: 0;
    list-style-type: none;
    list-style: none;

}

.search-result-grouped-tours__item {
    position: relative;
    
    border-bottom: 1px solid #dbdbea;
    padding: 12px;
    display: flex;
}

.search-result-grouped-tours__item:hover {
    background-color: rgba(255, 204, 0, .2)
}

.search-result__more-info {
    background-color: #fff;
    border-top: 1px solid #dbdbea
}

.search-result__hotel-photo {
    display: block;
    width: 100%;
    height: 100%;
    background: url(/tezminprices/i/noimage.jpg) center center no-repeat;
    background-size: cover;
}

.search-result__hotel-photo-wrapper {
    /* position: absolute;
    top: 0;
    left: 0; */
    /* z-index: 1; */
    cursor: pointer;
    width: 225px;
    height: 150px;
    flex: 0 0 225px;
    position: relative;
}

.search-result__col-1 {
    flex: 0 0 225px;
}
.search-result__col-2 {
    padding: 15px 12px 12px 12px;
    flex: 1 1 auto;
}
.search-result__col-3 {
    flex: 0 0 190px;
    position: relative;
    text-align: center;

}

.search-result__col-wr {
    display: flex;
    justify-content: space-between;
}

.search-result__col-4 {
    flex: 1 1 49%;
}
.search-result__col-5 {
    flex: 1 1 45%;
}
.search-result__full-aside:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 15px;
    bottom: 15px;
    border-left: 1px dotted #dbdbea;
}
.search-result__special-tooltip {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    background-color: #b2d7ea;
    border-radius: 50%;
    cursor: pointer;
    text-align: center
}

.search-result__special-tooltip_grouped,
.search-result__special-tooltip_short {
    top: 5px
}


.search-result__special-tooltip:hover .search-result__special-popup {
    opacity: 1;
    z-index: 1;
    left: -12px;
    visibility: visible;
}

.search-result__special-tooltip_room-info {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px
}

.search-result__full-type-room .search-result__special-tooltip_room-info,
.search-result__grouped-type-room .search-result__special-tooltip_room-info {
    float: right;
    margin: -16px -24px 0 0
}

.search-result__special-tooltip:before {
    content: "i";
    display: block;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #fff
}

.search-result__special-tooltip_big {
    width: 30px;
    border-radius: 8px
}

.search-result__special-tooltip_big:before {
    content: "\422\423\420";
    font-size: 11px
}


.search-result__special-popup {
    position: absolute;
    top: 100%;
    padding: 8px 12px;
    margin-top: 10px;
    background-color: rgba(49, 49, 64, .9);
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .27);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .27);
    opacity: 0;
    -webkit-transition: opacity .15s ease-out 0s;
    transition: opacity .15s ease-out 0s;
    visibility: hidden;
    color: #fff;
    font-family: Open Sans, sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 15px;
    white-space: nowrap;
    cursor: default;
    text-align: left
}

.search-result__special-popup:after {
    content: "";
    bottom: 100%;
    left: 12px;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-bottom-color: rgba(49, 49, 64, .9);
    border-width: 8px
}

.search-result__special-popup:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 10px
}

.search-result__special-popup_for-icon,
.search-result__special-popup_for-link {
    display: block;
    opacity: 1;
    visibility: visible;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    top: 100%;
    bottom: auto;
    right: auto;
    margin-top: 12px;
    z-index: 2
}

.search-result__special-popup_for-icon:after,
.search-result__special-popup_for-link:after {
    left: 50%;
    margin-left: -8px
}

.search-result__special-popup_for-icon {
    z-index: -10;
    opacity: 0;
    font-style: normal
}

.search-result-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.search-result-text_hotel {
    position: relative;
    color: #0078be;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    font-size: 15px
}

.search-result-text_big {
    font-size: 15px
}

.search-result-text_bigger {
    font-size: 14px
}

.search-result-text_normal {
    font-size: 13px
}

.search-result-text_bold {
    font-weight: 600
}

.search-result-text_full-group-hotel,
.search-result-text_full-hotel {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
}

.search-result-text__standart-price {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: bottom;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    position: relative;
    font-family: Panton, sans-serif;
    font-size: 22px;
    line-height: 22px;
    font-weight: 700
}

.search-result-text__standart-price_with-border {
    cursor: pointer
}

.search-result-text__price-change {
    display: inline-block;
    font-family: Panton, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: normal
}

.search-result-text_align-center {
    text-align: center
}

.search-result-text_dates {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: top;
    max-width: 100%;
    margin-right: 8px;
    margin-bottom: 10px;
}

.search-result-text_gray,
.search-result-text_grey {
    color: #9797a6
}

.search-result-text_black {
    color: #313140
}

.search-result-text_visible-overflow {
    overflow: visible
}

.search-result__short-pay {
    font-family: Panton, sans-serif;
    font-size: 15px;
    color: #0078be;
    border-bottom: 1px dotted;
    cursor: pointer
}

.search-result__full-group-destination {
    margin-bottom: 6px;
}

.search-result__nights {
    margin-bottom: 10px;
}

.search-result__full-group-dates {
    margin-bottom: 6px;
}

.search-result__full-group-info-link {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 63px;
    color: #0078be;
    font-family: Open Sans, sans-serif;
    font-size: 13px;
    font-weight: 400;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    border-bottom: 1px dotted;
    text-decoration: none
}

.search-result__full-group-info-link:hover {
    border-bottom-color: transparent
}

.search-result__full-group-info-link:after {
    content: "";
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGc+ICAgPHBhdGggZmlsbD0iIzAwNzhiZSIgZD0ibTIyMC4wODgsNTcuNjY3bC05OS42NzEsOTkuNjk1bC05OS42NzEsLTk5LjcwN2MtNC43NTIsLTQuNzUyIC0xMi40MzksLTQuNzUyIC0xNy4xOTEsMGMtNC43NCw0Ljc1MiAtNC43NCwxMi40NTEgMCwxNy4yMDNsMTA4LjI2MSwxMDguMjk3bDAsMGwwLDBjNC43NCw0Ljc1MiAxMi40MzksNC43NTIgMTcuMTc5LDBsMTA4LjI2MSwtMTA4LjI5NmM0Ljc0LC00Ljc1MiA0Ljc0LC0xMi40NjMgMCwtMTcuMjE1Yy00LjcyOCwtNC43MjkgLTEyLjQyOCwtNC43MjkgLTE3LjE2OCwwLjAyM3oiLz4gPC9nPjwvc3ZnPg==");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 8px 8px;
    width: 8px;
    height: 7px;
    display: block;
    position: absolute;
    right: -12px;
    top: 7px;
    -webkit-transition: transform .15s ease-in;
    -webkit-transition: -webkit-transform .15s ease-in;
    transition: -webkit-transform .15s ease-in;
    transition: transform .15s ease-in;
    transition: transform .15s ease-in, -webkit-transform .15s ease-in
}

.search-result__full-group-aside {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 100%;
    width: 190px;
    right: 0;
    top: 0;
    padding: 14px 16px;
    text-align: center;
    border-left: 1px dotted transparent
}

.search-result__full-group-aside:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 15px;
    bottom: 15px;
    border-left: 1px dotted #dbdbea
}


.search-result__full-group-operators-amount {
    margin-top: 10px
}

.search-result__full-group-facility-preview {
    height: 42px
}



.search-result__full-hotel-name-subscription {
    display: block;
    margin-left: -3px
}


.search-result__full-price {
    font-family: Panton, sans-serif;
    font-weight: 600;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    margin-bottom: 10px
}



.search-result__grouped-dates {
    width: 225px
}

.search-result__grouped-accomodation,
.search-result__grouped-dates {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top
}

.search-result__grouped-accomodation {
    width: 350px
}



.search-result__grouped-availability,
.search-result__grouped-transfer {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top
}

.search-result__grouped-availability {
    padding: 0 20px
}



.search-result__grouped-cell-4,
.search-result__grouped-price {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block
}

.search-result__grouped-price {
    vertical-align: middle;
    width: 155px
}


.search-result__grouped-oil {
    position: relative
}

.search-result__grouped-type-room {
    display: inline-block;
    margin: 0 10% 0 0;
    max-width: 90%
}



.search-result__operator-name {
    display: block;
    margin: 4px 0 0 8px
}

.search-result-category {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    padding-left: 6px;
    font-size: 15px;
    color: #f7be33
}


.search-result-category:before {
    color: #313140;
    font-weight: 700
}

.search-result-category__star-container {
    display: inline-block;
    vertical-align: middle
}

.search-result-category_stars-2:before {
    content: "2"
}

.search-result-rating {
    display: inline-block
}

.search-result-rating__number {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    padding-left: 20px;
    padding-right: 6px;
    margin-left: 3px;
    top: -1px;
    font-size: 10px;
    color: #313140;
    border-radius: 8px;
    line-height: 16px;
    background-repeat: no-repeat;
    background-position: 2px;
    background-size: 14px 14px
}

.search-result-rating__number_good {
    color: #548a06;
    background-color: #d5e9b4;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTMuMjI0IDQ5My4yMjQiPjxwYXRoIGZpbGw9IiM1NDhhMDYiIGQ9Ik0yNDYuNjEzIDBDMTEwLjQxMyAwIDAgMTEwLjQxMiAwIDI0Ni42MTNzMTEwLjQxMyAyNDYuNjExIDI0Ni42MTMgMjQ2LjYxMSAyNDYuNjExLTExMC40MTIgMjQ2LjYxMS0yNDYuNjExUzM4Mi44MTIgMCAyNDYuNjEzIDB6bTk2LjYyNSAxMjguNzMzYzIxLjEyOCAwIDM4LjI1NiAxNy4xMjggMzguMjU2IDM4LjI1NnMtMTcuMTI4IDM4LjI1Ni0zOC4yNTYgMzguMjU2LTM4LjI1Ni0xNy4xMjgtMzguMjU2LTM4LjI1NiAxNy4xMjgtMzguMjU2IDM4LjI1Ni0zOC4yNTZ6bS0xOTYuNzQzIDBjMjEuMTI4IDAgMzguMjU2IDE3LjEyOCAzOC4yNTYgMzguMjU2cy0xNy4xMjggMzguMjU2LTM4LjI1NiAzOC4yNTYtMzguMjU2LTE3LjEyOC0zOC4yNTYtMzguMjU2IDE3LjEyOC0zOC4yNTYgMzguMjU2LTM4LjI1NnptMTAwLjczOCAyODQuMTg0Yy03NC4zNzQgMC0xMzguMjI1LTQ1LjAyNS0xNjUuODA1LTEwOS4zMDJoNDguNzI1YzI0LjAyMSAzOS41IDY3LjQ2OSA2NS44ODUgMTE3LjA3OSA2NS44ODVzOTMuMDU4LTI2LjM4NCAxMTcuMDc5LTY1Ljg4NWg0OC43MjVjLTI3LjU3NiA2NC4yNzctOTEuNDI4IDEwOS4zMDItMTY1LjgwMyAxMDkuMzAyeiIvPjwvc3ZnPg==)
}

.search-result-rating__number_average {
    color: #ffba00;
    background-color: rgba(255, 186, 0, .3);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTMuMiA0OTMuMiI+PHBhdGggZmlsbD0iI2ZmYmEwMCIgZD0iTTI0Ni42IDBDMTEwLjQgMCAwIDExMC40IDAgMjQ2LjZzMTEwLjQgMjQ2LjYgMjQ2LjYgMjQ2LjYgMjQ2LjYtMTEwLjQgMjQ2LjYtMjQ2LjZTMzgyLjggMCAyNDYuNiAwem05Ni42IDEyOC43YzIxLjEgMCAzOC4zIDE3LjEgMzguMyAzOC4zcy0xNy4xIDM4LjMtMzguMyAzOC4zUzMwNSAxODguMSAzMDUgMTY3czE3LjEtMzguMyAzOC4yLTM4LjN6bS0xOTYuNyAwYzIxLjEgMCAzOC4zIDE3LjEgMzguMyAzOC4zcy0xNy4xIDM4LjMtMzguMyAzOC4zLTM4LjMtMTcuMS0zOC4zLTM4LjMgMTcuMi0zOC4zIDM4LjMtMzguM3ptMTk2LjcgMjI0LjJIMTQ2LjV2LTQzLjNoMTk2Ljd2NDMuM3oiLz48L3N2Zz4=)
}

.search-result-rating__number_bad {
    color: #d84c2f;
    background-color: rgba(216, 76, 47, .3);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTMuMiA0OTMuMiI+PHBhdGggZmlsbD0iI2Q4NGMyZiIgZD0iTTI0Ni42IDBDMTEwLjQgMCAwIDExMC40IDAgMjQ2LjZzMTEwLjQgMjQ2LjYgMjQ2LjYgMjQ2LjYgMjQ2LjYtMTEwLjQgMjQ2LjYtMjQ2LjZTMzgyLjggMCAyNDYuNiAwem05Ni42IDEyOC43YzIxLjEgMCAzOC4zIDE3LjEgMzguMyAzOC4zcy0xNy4xIDM4LjMtMzguMyAzOC4zUzMwNSAxODguMSAzMDUgMTY3czE3LjEtMzguMyAzOC4yLTM4LjN6bS0xOTYuNyAwYzIxLjEgMCAzOC4zIDE3LjEgMzguMyAzOC4zcy0xNy4xIDM4LjMtMzguMyAzOC4zLTM4LjMtMTcuMS0zOC4zLTM4LjMgMTcuMi0zOC4zIDM4LjMtMzguM3pNNDEzIDM5MS45aC00OC43Yy0yNC0zOS41LTY3LjUtNjUuOS0xMTcuMS02NS45cy05My4xIDI2LjQtMTE3LjEgNjUuOUg4MS40YzI3LjYtNjQuMyA5MS40LTEwOS4zIDE2NS44LTEwOS4zczEzOC4zIDQ1IDE2NS44IDEwOS4zeiIvPjwvc3ZnPg==)
}

.hotel-services__item_search-result-full:hover .hotel-services__description {
    z-index: 2;
    opacity: 1;
}

.search-result-rating__tripadvisor {
    display: inline-block;
    position: relative;
    margin-left: 8px
}


.search-result-availability__item {
    position: relative;
    -webkit-box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    padding-top: 2px;
    box-sizing: border-box;
    font-size: 13px;
    width: 20%;
    height: 30px;
    text-align: center;
    color: #9797a6
}

.search-result-availability__item:after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    left: 50%;
    bottom: 0;
    margin-left: -3px;
    border-radius: 50%
}

.search-result-availability__item_Available:after {
    background-color: #88aa2a
}

.search-result-availability__item_Few:after {
    background-color: #f6a70e;
}

.search-result-availability__item_No:after {
    background-color: #c9462c
}

.search-result-availability__item_request:after {
    background-color: #cacad9
}



.search-result-availability__item_icon-house {
    padding-top: 0
}

.uis-button_small {
    width: 140px;
    height: 39px;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.uis-button_show-more-info {
    position: relative;
    margin: 0;
    width: 100%;
    padding-right: 11px;
    padding-left: 6px;
}

.uis-button_show-more-info:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 12px;
    margin-top: -3px;

    background-image: url("data:image/svg+xml,%3Csvg height='5' width='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M-.5 1l1-1 4 3 4-3 1 1-5 4-5-4z'/%3E%3C/svg%3E");
    width: 10px;
    height: 5px;
    -webkit-transition: -webkit-transform .15s ease-in;
    transition: -webkit-transform .15s ease-in;
    transition: transform .15s ease-in;
    transition: transform .15s ease-in, -webkit-transform .15s ease-in;
    transition: transform .15s ease-in, -webkit-transform .15s ease-in;
    color:#fff
}

.uis-button_show-more-info-active:after {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

.uis-button_orange {
    color: #313140;
    background-color: #fc0;
    box-shadow: inset 0 -1px 0 #eb6907;
}

.uis-button_orange:hover,
.uis-button_orange_hover {
    box-shadow: inset 0 -2px 0 #eb6907, 0 -1px 0 #fc0;
}
.uis-button,
.uis-button:active,
.uis-button:hover,
.uis-button_hover {
    transition-property: background;
    transition-duration: .3s;
}


.uis-button_grouped-find {
    display: block;
    width: 240px;
    margin: 12px auto
}


.search-result__line-space {
    height: 15px
}

.nav {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid #dbdbea;
    width: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f8f8ff;
    color: #313140;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}



.nav__item {
    border-top: 1px solid #dbdbea;
    position: relative
}

.nav__item:first-child {
    border-top: 0
}

.nav_one-item {
    position: absolute;
    width: 35px;
    bottom: 0;
    top: 0;
    right: 0;
    background-color: #f8f8ff;
    border: none;
    border-left: 1px solid #dbdbea
}

.nav_one-item>.nav__item {
    height: 100%
}

.nav_one-item>.nav__item>.nav__icon {
    height: 33px;
    line-height: 33px;
    width: 34px;
    position: absolute;
    top: 50%;
    margin-top: -16px
}



.nav__icon {
    color: #cacad9;
    width: 34px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    cursor: pointer;
    border: 0;
    background: none;
    -webkit-appearance: none;
    outline: none
}


.search-result__tour-action-btn-wrapper {
    position: relative;
    margin-top: 18px
}

.search-result__pessimization-warn {
    position: absolute;
    display: inline-block;
    color: #0282c2;
    font-size: 13px;
    white-space: nowrap;
    left: -32px;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    cursor: default
}



.search-result__show-more-tours {
    padding: 26px 0;
    background-color: #f6f6ff;
    border-bottom: 1px solid #dbdbea;
    text-align: center;
    cursor: pointer
}

.search-result__show-more-tours-link {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    color: #000;
    font-size: 17px;
    font-weight: 400;
    border-bottom: 1px dashed
}

.search-result__show-more-tours-link:before {
    content: "+";
    position: absolute;
    display: block;
    width: 44px;
    height: 44px;
    left: -56px;
    top: 50%;
    margin-top: -22px;
    font-size: 50px;
    line-height: 44px;
    border: 1px solid #cacad9;
    color: #cacad9;
    border-radius: 50%
}

.hotel-services_search-result-full {
    -webkit-column-count: auto;
    column-count: auto;
    -webkit-column-width: auto;
    column-width: auto;
    padding: 4px 0;
    white-space: nowrap;
    margin: 0;
    display: inline-block
}

.hotel-services__item_search-result-full {
    padding: 0;
    margin: 0 14px 0 0;
    min-height: 52px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 11px
}



.hotel-services__icon_search-result-full {
    padding: 5px;
    margin: 0;
    color: #0078be;
    background-color: #cce4f2;
    border-radius: 2px
}

.hotel-services__title_search-result-full {
    font-size: 11px;
    letter-spacing: .7px;
    font-weight: 700;
    padding: 0;
    color: inherit
}

.hotel-services__description_search-result-full {
    position: absolute;
    top: 42px;
    left: -4px;
    padding: 8px 12px;
    z-index: -10;
    background-color: rgba(49, 49, 64, .9);
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .27);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .27);
    opacity: 0;
    -webkit-transition: opacity .15s ease-out 0s;
    transition: opacity .15s ease-out 0s;
    color: #fff;
    font-family: Open Sans, sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 15px;
    cursor: default;
    white-space: nowrap;
    text-align: left
}

.hotel-services__description_search-result-full:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 10px
}

.hotel-services__description_search-result-full:after {
    content: "";
    bottom: 100%;
    left: 12px;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: rgba(49, 49, 64, .9);
    border-width: 8px
}

.hotel-services__list_search-result-full {
    -webkit-column-count: 1;
    column-count: 1;
    -webkit-column-width: auto;
    column-width: auto
}

.search-result__legend-group {
    display: flex;
    justify-content: space-between;
}
.search-result__legend-item {
    flex: 1 1 auto;
    margin-right: 20px;
}


@media (min-width:768px) and (max-width:991px) {
    .search-result__grouped-accomodation {
        width: 150px;
    }

    .search-result__grouped-dates {
        width: 100px;
    }

    .search-result-text {
        white-space: normal;
    }

    .search-result__full-group-dates {
        position: relative;
        left: 0;
        top: 0;
    }

    .search-result__list-item-info_full-group {
        height: auto;

    }

    .search-result__full-group-destination {
        max-width: 270px;
    }



    .search-result__legend-item {
        text-align: center;
        margin-right: 10px;
    }
}

@media only screen and (max-width:768px) {
    .search-result__col-wr {
        flex-wrap: wrap;
    }
    .search-result__col-wr .search-result__col-4,
    .search-result__col-wr .search-result__col-5 {
        flex: 1 1 100%;
        margin-bottom: 12px;
    }
    .search-result__legend-group {
        margin-bottom: 10px;
        justify-content: center;
    }
}

@media only screen and (max-width:767px) {
    .search-group {
        width: 100%;
        justify-content: center;
    }
    .search-result__legend {
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }
    .search-result__legend-item {
        margin: 0 10px;
        text-align: center;
    }
    .search-result__legend-item:nth-child(1) {
        margin-bottom: 10px;
        /* min-width: 150px; */
    }
    .search-result__legend-item:nth-child(2) {
        margin-bottom: 10px;
        /* min-width: 200px; */
    }
    .search-result__legend-item:nth-child(3) {
        margin-bottom: 10px;
        /* min-width: 230px; */
    }
    
    
    .search-result__legend-item:nth-child(4),
    .search-result__legend-item:nth-child(5),
    .search-result__legend-item:nth-child(6) {
        min-width: 40px;
    }


    .search-result__list-item {
        margin-bottom: 50px;
        padding-bottom: 20px;
    }

    .search-result__col-1 {
        flex: 0 0 225px;
        margin: 0 auto;
    }

    .search-result__col-2 {
        width: 100%;
    }
    .search-result__col-wr .search-result__col-4,
    .search-result__col-wr .search-result__col-5 {
        flex: 1 1 49%;
    }

    .search-result__col-3 {
        margin: 0 auto;
    }
    .search-result__full-aside:before {
        border-left: none;
    }
    .search-result__full-price {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .search-result-grouped-tours__item {
        flex-wrap: wrap;
        justify-content: center;
    }
    .search-result-grouped-tours__item>div {
        flex: 1 0 100%;
    }


    .search-result__list-item {
        border-width: 0 0 1px 0;
    }

    .search-result__list-item-info_full-group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding-left: 0;
        height: auto;
        border: none;
        padding: 0;
    }

    .search-result__hotel-photo-wrapper {
        width: 100%;
        display: block;
        position: relative;
        margin-bottom: 15px;
    }



    .search-result-text_full-group-hotel,
    .search-result-text_full-hotel {
        max-width: none;
    }

    .search-result__full-group-dates {
        position: relative;
        left: 0;
        width: 100%;
        top: 0;
        max-width: none;
        margin-bottom: 15px;
    }

    .search-result__full-hotel-name-subscription {
        margin: 0;
    }

    .search-result__full-group-destination {
        max-width: none;
        width: 100%;
        margin: 15px 0;
    }

    .search-result__full-group-facility-preview {
        width: 100%;
        height: auto;
    }

    .search-result__full-group-info-link {
        margin-right: 20px;
    }

    .search-result__full-group-aside {
        padding: 0;
        position: relative;
        display: block;
        width: 100%;
    }

    .search-result__full-group-aside::before {
        display: none;
    }

    .search-result__list-item-info_grouped-tours {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 10px 0;
    }

    .search-result__grouped-dates {
        text-align: center;
        max-width: none;
        width: 100%;
        margin-bottom: 30px;
        margin-top: 15px;
        margin-right: 35px;
    }

    .search-result__grouped-accomodation {
        width: 100%;
        margin-bottom: 15px;
        margin-right: 35px;
    }

    .search-result__grouped-availability {
        padding: 0;
        width: 100%;
        margin-bottom: 15px;
        margin-right: 35px;
    }

    .search-result__grouped-price {
        width: 100%;
        margin-right: 35px;
    }

    .search-result__tour-action-btn-wrapper {
        margin-top: 0;
    }

    .search-result__full-price {
        /* -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        margin: 15px 0; */
    }

    .search-result-text {
        white-space: normal;
    }

    .search-result__special-popup {
        display: none;
    }

    .search-result__show-more-tours-link::before {
        lefT: 50%;
        margin-left: -22px;
        top: -30px;
    }

    .search-result__show-more-tours {
        padding-top: 60px;
    }

    .search-result-availability {
        width: 100%;
        max-width: 200px;
    }

    .search-result__operator-name {
        margin: 15px 0;
        text-align: center;
    }
}

@media screen and (max-width: 500px) {
    .search-result__col-1 {
        flex: 0 0 100%;
        margin: 0 auto;
    }
    .search-result__full-group-destination {
        margin: 0;
    }
    .search-result__arrival {
        display: inline-block;
    }
    .search-result__col-wr .search-result__col-5 {
        flex: 1 1 100%;
    }
    .search-result__col-2 {
        text-align: center;
    }
    .search-result-grouped-tours__item {
        text-align: center;
    }
    .search-result-availability {
        width: 100%;
        max-width: 200px;
        margin: 10px auto;
        justify-content: center;
    }
    .search-result__tour-action-btn-wrapper {
        margin-top: 22px;
        margin-bottom: 20px;
    }
    .hotel-services__item_search-result-full:nth-child(4) .hotel-services__description_search-result-full,
    .hotel-services__item_search-result-full:nth-child(5) .hotel-services__description_search-result-full {
        right: -4px;
        left:auto;
        max-width: 320px;
    }


    .hotel-services__item_search-result-full:nth-child(4) .hotel-services__description_search-result-full:after,
    .hotel-services__item_search-result-full:nth-child(5) .hotel-services__description_search-result-full:after {
        right: 12px;
        left:auto;

    }

    .hotel-services__item_search-result-full:nth-child(3) .hotel-services__description_search-result-full {
        left: -100px;
        max-width: 320px;
    }


    .hotel-services__item_search-result-full:nth-child(3) .hotel-services__description_search-result-full:after {
        left: 106px;

    }

}
</style>  