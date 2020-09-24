<template>
    <transition name="modal"> 
        <!-- @click.self="$emit('close')" -->
        <div class="modal__wrapper" >
            <div class="modal-content" >
                
                <!-- header  -->
                <div class="modal-header">
                    <span class="modal-title">{{ $t('order.title') }}</span>
                    <span class="button-close" @click="$emit('close')">×</span>
                </div>

                <!-- body  -->
                <div class="modal-body">

                    <div class="order__top">
                        
                        <div class="order__list">
                            <div class="order__item"><span class="order__label">{{ $t('order.hotel') }}:</span> {{order.hotel}} 
                                
                            </div>
                            <div class="order__item"><span class="order__label">{{ $t('order.country') }}:</span> <span v-html="`${order.country},  ${order.resort}`"></span></div>
                            <div class="order__item"><span class="order__label">{{ $t('order.dates') }}:</span> {{order.dateFrom}} - {{order.dateTo}}</div>
                            <div class="order__item"><span class="order__label">{{ $t('order.nights') }}:</span> {{order.nights}}</div>
                            <div class="order__item"><span class="order__label">{{ $t('order.room') }}:</span> {{order.room}}</div>
                            <div class="order__item"><span class="order__label">{{ $t('order.meal') }}:</span> {{order.meal}}</div>
                            <div class="order__item"><span class="order__label">{{ $t('order.transfer') }}:</span>
                            <template v-if="order.transfer">
                                {{ $t('order.transferIncluded')}}
                            </template>
                            <template v-else>
                                {{ $t('order.transferNotIncluded') }}
                            </template>
                            </div>
                            
                            <div class="order__item order__item_price"><span class="order__label">{{ $t('order.price') }}:</span> {{order.price}} €</div>

                            <div class="order__item"><small><span class=""><sup>*</sup> {{$t('order.to')}}:</span> {{$t('order.operator')}}</small></div>
                        </div>

                        <div class="order__figure">
                            <img :src="order.foto" :alt="order.hotel" class="order__foto">
                        </div>

                    </div>


                    <div class="order__bottom">
                        <div class="order__header">{{ $t('order.tourists') }}</div>

                        <form class="order__form" @submit.prevent="submitOrder()" v-if="touristCount">
                            <div class="tourist" v-for="(tourist,i) in touristCount" :key="i">
                                <div class="tourist__header">{{ $t('order.tourist') }} № {{i+1}}</div>

                                <div class="tourist__row">
                                    <div class="tourist__col">

                                        <div class="tourist__field">
                                            <label :for="`tourist__field-n${i}`" class="tourist__label">{{ $t('order.name') }} <span class="tourist__required">*</span></label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-n${i}`"  required v-model="tourists[i]['name']" >
                                        </div>

                                        <div class="tourist__field">
                                            <label :for="`tourist__field-f${i}`" class="tourist__label">{{ $t('order.secondName') }} <span class="tourist__required">*</span></label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-f${i}`" required v-model="tourists[i]['secondName']">
                                        </div>

                                        <div class="tourist__field">
                                            <label :for="`tourist__field-g${i}`" class="tourist__label">{{ $t('order.nationality') }} <span class="tourist__required">*</span></label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-g${i}`"  required v-model="tourists[i]['nationality']">
                                        </div>
                                       
                                    </div>

                                    <div class="tourist__col">
                                        
                                        <div class="tourist__field">
                                            <label class="tourist__label">{{ $t('order.gender') }} <span class="tourist__required">*</span></label>
                                            <span class="tourist__radio-wr">
                                                <input type="radio" class="tourist__radio" :name="`tourist__field-s${i}`" :id="`tourist__field-s${i}`" required v-model="tourists[i]['gender']" value="m"> {{ $t('order.male') }}
                                            </span>
                                            <span class="tourist__radio-wr">
                                                <input type="radio" class="tourist__radio" :name="`tourist__field-s${i}`"  v-model="tourists[i]['gender']" value="f"> {{ $t('order.female') }}
                                            </span>
                                        </div>
                                      

                                        <div class="tourist__field">
                                            <label :for="`tourist__field-d${i}`" class="tourist__label">{{ $t('order.birthDay') }}</label>
                                            <input type="text" class="tourist__input passportTo" :id="`tourist__field-d${i}`"
                                                    :data-id="i"
                                                    v-model="tourists[i]['birthDay']"
                                                    placeholder="дд.мм.гггг"
                                                   >
                                        </div>

<!--                                    @input="setDate(i, $event.target.value)"    -->

                                        <template v-if="!i">
                                        <div class="tourist__field">
                                            <label :for="`tourist__field-t${i}`" class="tourist__label">{{ $t('order.phone') }} <span class="tourist__required">*</span></label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-t${i}`" required v-model="contacts['phone']">
                                        </div>

                                        <div class="tourist__field">
                                            <label :for="`tourist__field-e${i}`" class="tourist__label">{{ $t('order.email') }} <span class="tourist__required">*</span></label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-e${i}`"  required v-model="contacts['email']">
                                        </div>

                                        <!-- <div class="tourist__field">
                                            <label :for="`tourist__field-a${i}`" class="tourist__label">{{ $t('order.address') }}</label>
                                            <input type="text" class="tourist__input" :id="`tourist__field-a${i}`"  v-model="contacts['address']">
                                        </div> -->

                                        </template>

                                    </div>
                                </div>

                            </div>

                            <div class="tourist__field">
                                <label for="tourist__field-m" class="tourist__label">{{ $t('order.note') }}</label>
                                <textarea class="tourist__textarea" id="tourist__field-m" v-model="msg"></textarea>
                            </div>

                            <div class="tourist__field">
                                <input type="checkbox" name="letter" id="tourist__field-letter" class="checkbox-list__checkbox"  v-model="newsletter">
                                <label for="tourist__field-letter" class="checkbox-list__title"><span class="checkbox-list__name">{{ $t('order.newsletter') }}</span></label>
                            </div>

                            <div class="order__success" v-if="sended">
                                {{ $t('order.success') }}
                            </div>


                            <div class="order__success" v-if="error">
                                {{ $t('order.error') }}
                            </div>


                            <div class="tourist__submit-wr" v-if="!sended">
                                <button type="submit" class="tourist__submit uis-button uis-button_orange uis-button_small uis-button_more-details" :disabled="loading">{{ $t('order.send') }}</button>
                            </div>
                        </form>
                    </div>



                </div>


            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
//import Litepicker from 'litepicker'
import {config} from '@/config.js'


export default {
    data(){
        return {
            tourists:[],
            contacts: {
                phone:'',
                email:''
            },
            msg:'',
            newsletter: true,

            loading: false,
            error:false,
            sended: false
        }
    },
    computed: {
        order(){
            return this.$store.getters.getOrder
        },
        touristCount(){

            let tourists = this.$store.getters.getResults;
            if (tourists.length) {
                tourists = tourists[0]['info']['groupAges'];
                tourists = tourists.adt + tourists.chd +tourists.inf;
            } else {
                tourists = 0;
            }

            this.tourists = [];
        
            for (let i=0; i<tourists; i++) {
                this.tourists.push({
                    name:'',
                    secondName:'',
                    nationality: '',
                    gender: '',
                    birthDay:'',
                })
            }



          //  setTimeout(this.fireCalendar, 500);
           return tourists; 
        }
    },
    methods: {
        setDate(i, value){
            this.tourists[i].birthDay = value
        },
        submitOrder(){
        
            this.loading=true;
            this.error=false;
            this.sended=false;

            const params= {

                'order': this.order,
                'tourists': this.tourists,
                'contacts': this.contacts,
                'msg': this.msg,
                'newsletter': this.newsletter
            }


            let lng=this.$i18n.locale;

            if (lng=='et') {lng='ee';}

            axios
            .post(`${lng}/lk/api/order`, params)
            .then(response=>{

                // ок
               if (response.data.code==200) {
                    this.loading=false;
                    this.error=false;
                    this.sended=true;
               } else {
                    this.loading=false;
                    this.error=true;
                    this.sended=false;                   
               }
               
            })
            .catch( (error) => {
                // handle error
                console.log(error);
                    this.loading=false;
                    this.error=true;
                    this.sended=false;  
            })
            .finally(function () {
                document.querySelector('.modal-body').scrollTo(0,document.querySelector('.modal-body').scrollHeight)
            });


        },
        fireCalendar () {
       
            if (document.querySelectorAll('.passportTo').length){
              
                document.querySelectorAll('.passportTo').forEach(i => {
              

                    let lng=this.$i18n.locale;

                    if (lng=='ru') {lng='ru-Ru';}
                    if (lng=='et') {lng='et-EE';}
                    if (lng=='en') {lng='en-En';}

                    new Litepicker({
                        element: i,
                        singleDate: true,
                        numberOfMonths: 1,
                        numberOfColumns: 1,
                        format:'DD.MM.YYYY',
                        lang: lng,
                        selectForward: false,
                        selectBackward: false,
                        maxDate: (new Date()),
                        minDate: (new Date()) - 100*365*86400*1000,
                        dropdowns: {
                            minYear: (new Date()).getFullYear()-100,
                            maxYear: (new Date()).getFullYear(),
                            months: true,
                            years: true,
                        },
                        onSelect: function (date1)  {

                            // Эмулируем событие Change, что бы значение из календаря подхватил Vue
                            let event = new MouseEvent('input', {
                                'view': window,
                                'bubbles': false,
                                'cancelable': true
                            });
                            let cb = this.options.element;

                            cb.dispatchEvent(event);
                            // let touristIndex = this.options.element.getAttribute('data-id');
                            // this.setDate(touristIndex, date1);
                            // console.log(date1);
                    
                        }
                        
                        
                        
                    }); 
                });
            }
        }
    },
    created(){
        // Создаем массив объектов туристов
       

        
    },
    mounted(){




        
        // Закоментил, что бы закрытия попапа было только по крестику
        // document.body.addEventListener('keyup', e=>{
        //     if(e.keyCode===27){
        //         this.$emit('close');
        //     }
        // })
    }
}
</script>


<style scoped>

.tourist__submit  {
    -webkit-appearance: none !important;
    cursor: pointer;
    padding: 8px 23px;
    border: none;
    border-radius: 4px;
    outline: none;
    width: 140px;
    height: 39px;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #313140;
    background-color: #fc0;
    box-shadow: inset 0 -1px 0 #eb6907;
}

.tourist__submit, .tourist__submit:active {
    transition-property: background;
    transition-duration: .3s;
}

.tourist__submit:hover {
    box-shadow: inset 0 -2px 0 #eb6907, 0 -1px 0 #fc0;
}

.modal-content {
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

.order__top {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.order__list {
    width: 100%;
}

.order__item {
    margin-bottom: 12px;
}

.order__item small {
    font-size:0.8em
}

.order__item .search-result-category__star {
    color: #f7be33;
}
.order__item_price {
    font-size: 20px;
    font-weight: bold;
}

.search-result-category__star {}

.order__figure {
    width: 100%;
}

.order__foto {
    display: block;
    height: 190px;
    max-width: 100%;
}


.order__bottom {}

.order__header {
    font-size: 20px;
    font-weight: bold;;
    margin-bottom: 12px;
}

.order__form {

}

.order__label {
    font-weight: bold;
    display: inline-block;
    width: 150px;
}

.tourist+.tourist {
    margin-top: 30px;
}

.tourist__header {
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: bold;
}


.tourist__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.tourist__col {
    width: 100%;
}

.tourist__field {
    margin-bottom: 12px;
    min-height: 51px;
}

.tourist__label {
    margin-bottom: 5px;
    display: block;
}

.tourist__input {
    border:solid 1px #ccc;
    padding: 0 0.5em;
    height: 30px;
    width: 100%;
}

.tourist__textarea {
    border:solid 1px #ccc;
    padding: 0 0.5em;
    height: 60px;
    width: 100%;
}

.tourist__submit-wr{
    display: flex;
    justify-content: center;
}

.tourist__submit {

}

.order__success,
.order__error {
    padding: 12px 24px;
    font-size: 16px;
    text-align: center;
    border-radius: 3px;;
}

.order__success {
    color: #4c4c4c;
    background: #e6fdfa;
    border: solid 1px #2db29f;
}
.order__error {
    background: #fdeae6;
    border: solid 1px #b22d2d;
}

.tourist__submit[disabled] {
    opacity: 0.4;
    cursor: default;
}

.tourist__radio-wr {
    margin-right: 20px;
}

.tourist__required {
    color:#dd0000;
}

/* input[type='text'].tourist__input:required {
    border-color: #ccc;
}
input[type='text'].tourist__input:invalid {
    border-color:#ff0000;
} */

    .modal-enter,
    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-content,
    .modal-leave-active .modal-content {
        transform: scale(1.2);
    }

    .modal__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: opacity 0.3s ease;
        z-index: 998;
        background-color: rgba(0, 0, 0, 0.48);
    }

    .modal-content {
        position: relative;
        max-width: 900px;
        width: 90%;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        transition: all 0.3s ease;
        border-radius: 5px;
        z-index: 999;
        padding-bottom: 5px;
        top: 20px;
    }

    .modal-header {
        display: flex;
        align-self: center;
        justify-content: space-between;
        padding: 12px 18px;
        background-color: #f5f5f5;
    }

    .modal-header span {
        font-size: 24px;
    }

    .button-close {
        cursor: pointer;
    }

    .modal-body {
        max-height: calc(95vh - 90px);
        overflow: auto;
        padding: 12px 18px;
    }

    .order__bottom .order__header {text-align: center;}

    .order__form .tourist {
        padding: 12px;
    }

    .order__form .tourist:nth-child(even) {
        background-color: #f9f9f9;
    }

    .order__form>.tourist__field {
        margin-top: 30px;
    }


@media screen and (min-width: 768px) {
    .order__list {
        width: 48%;
        flex: 1 1 48%;
        padding-right: 20px;
    }
    .order__figure {
        flex: 1 1 48%;
        max-width: 300px;
    }
    .tourist__col {
        width: 48%;
    }
}

@media screen and (max-width: 767px) {
    .order__label {
        display: block;
        margin-bottom: 5px;
    }
    .order__foto {
        height: auto;
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
    }

}
</style>
