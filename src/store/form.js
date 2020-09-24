import i18n from '@/i18n'
import axios from 'axios'
import {config} from '@/config.js'
import helper from '@/helper/helper.js'

export default {
    state: {
        form:{
            cityId: 3746, // Таллин
            countryId: 7067673, //Кипр    1104, // Турция
            after: helper.timeStamptoDDMMYYYY((new Date()).getTime() + 7 * 86400 * 1000), // Дата с
            before: helper.timeStamptoDDMMYYYY((new Date()).getTime() + 14 * 86400 * 1000), // Дата до
            nightsMin: 3,
            nightsMax: 11,
            priceMin: 0,
            priceMax: 999999,
            rAndBId: 15350,                             // Питание
            rAndBBetter: true,                          // Питание +
            accommodationId: 2,                         // Размещение
            hotelClassId: 2568, //269506,                       // Звездность
            hotelClassBetter: true,                      // Звездность +
            birthdays: '',                              // Дни рождения детей
            locale: i18n.locale,
            currency: 18864,                            // Валюта
            tourType: 1,                                // Полный пакет
            hotelInStop: false,
            specialInStop: false,
            noTicketsTo: false,
            noTicketsFrom: false,
            //searchTypeId: 3,
            recommendedFlag: false,
            salePrivateFlag: false,
            onlineConfirmFlag: false,
           // promoFlag: false,
            groupByHotel: 3,
            version: 2,
           // demo: true,                                 // Демо данные
        },
        countries: [],           // Страна назначения
        hotelClasses: [],        //Категория отеля
        accommodations: [],        // Размещение
        rAndBs: [],              // Питание
        pansionGuide: [],       // Питание по Id
        permitCountries: [],    // Доступные страны назначения для текущего города
        regions: [],               // Регионы
        checkedRegions: [],         // Выбранные регионы
        hotels: [],                 // Отели страны
        checkedHotels: [],          // Выбранные отели
        isLoading: true
        
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        getForm(state) {
            return state.form;
        },
        getCountries(state) {
            return state.countries;
        },
        getHotelClasses(state) {
            return state.hotelClasses;
        },
        getRAndBs(state) {
            return state.rAndBs;
        },
        getPansionGuide(state) {
            return state.pansionGuide;
        },
        // getRAndBBetter(state) {
        //     return state.rAndBBetter;
        // },
        getPermitCountries(state) {
            return state.rAndBs;
        },
        getAccommodations(state) {
            return state.accommodations;
        },
        getPermittedCountries(state) {
            return state.countries.filter(item => {
                return state.permitCountries.indexOf(item.countryId) !== -1
            })
        },
        getRegions(state) {
            return state.regions;
        },
        getCheckedRegions(state) {
            return state.checkedRegions;
        },

        getHotels(state) {
            return state.hotels;
        },
        getCheckedHotels(state) {
            return state.checkedHotels;
        },

        getSearchParams(state, getters) {
            const params = {};
            for (let key in state.form) {
                params[key] = state.form[key];
            }
            return params
         }


    },
    mutations: {
        setLocale(state, payload) {
            state.form.locale = payload
        },
        setIsLoading(state, payload) {
            state.isLoading = payload
        },
        setCountries(state, payload) {
            state.countries = payload
        },
        setHotelClasses(state, payload) {
            state.hotelClasses = payload
        },
        setHotelClassId(state, payload) {
            state.form.hotelClassId = payload
        },
        setRAndBs(state, payload) {
            state.rAndBs = payload
        },
        setPansionGuide(state, payload) {
            const guide = {};
            
            payload.forEach(item => {
                guide[item.id] = item.name
            })
            state.pansionGuide = guide
        },
        setPermitCountries(state, payload) {
            state.permitCountries = payload
        },
        setAccommodations(state, payload) {
            state.accommodations = payload
        },
        setRegions(state, payload) {
            state.regions = payload
        },
        setCheckedRegions(state, payload) {
            state.checkedRegions = payload
        },
        setHotels(state, payload) {
            state.hotels = payload
        },
        setCheckedHotels(state, payload) {
            state.checkedHotels = payload
        },
        setAllRegions(state) {
            state.checkedRegions = [];
            state.regions.forEach(item => {
                state.checkedRegions.push(item.tourId[0])
            });
            
        },
        

        setForm(state, form) {
            const stringParams = ['after', 'before', 'birthdays', 'rAndBBetter', 'hotelClassBetter'];

            for (let key in form) {
                
                let param = form[key];
                if (!stringParams.includes(key)) {
                    param = parseInt(param);
                }
                state.form[key] = param;

            }

        },
    },

    actions: {

        setFormDefault({commit, getters}){
            commit('setIsLoading', true);
            // Грузим справочники

            const commonParams = `cityId=${getters.getForm.cityId}&countryId=${getters.getForm.countryId}&locale=${i18n.locale}&formatResult=true&xml=false`;

            const URL_references = `${process.env.VUE_APP_API_URL}references.php?${commonParams}`;
            const URL_permitcountries = `${process.env.VUE_APP_API_URL}permitcountries.php?${commonParams}`;
            const URL_accommodations = `${process.env.VUE_APP_API_URL}accommodations.php?${commonParams}`;
            const URL_hotelClasses = `${process.env.VUE_APP_API_URL}hotelClasses.php?${commonParams}`;
            const URL_regions = `${process.env.VUE_APP_API_URL}regions.php?${commonParams}`;
            const URL_hotels = `${process.env.VUE_APP_API_URL}hotels.php?${commonParams}`;


            const references = axios.get(URL_references);
            const permitcountries = axios.get(URL_permitcountries);
            const accommodations = axios.get(URL_accommodations);
            const hotelClasses = axios.get(URL_hotelClasses);
            const regions = axios.get(URL_regions);
            const hotels = axios.get(URL_hotels);

            Promise.all([references, permitcountries, accommodations, hotelClasses, regions, hotels])
                .then(function (values) {
                    commit('setCountries', values[0]['data']['countries'])
                    commit('setHotelClasses', values[0]['data']['hotelClasses'])
                    commit('setRAndBs', values[0]['data']['rAndBs'])
                    commit('setPansionGuide', values[0]['data']['rAndBs'])
                    commit('setPermitCountries', values[1]['data']['permitCountries'])
                    commit('setAccommodations', values[2]['data']['accommodations'])
                    commit('setHotelClassId', values[3]['data']['hotelClasses'][0]['classId'])
                    commit('setHotelClasses', values[3]['data']['hotelClasses'])
                    
                    commit('setRegions', values[4]['data']['tours'])
                    commit('setAllRegions')

                    commit('setHotels', values[5]['data']['hotels'])
                    
                    

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    commit('setIsLoading', false)
                });
        },

        // Смена города
        changeCity({commit, getters}, payload) {

            commit('setIsLoading', true);

            commit('setForm',{'cityId':payload})

            const commonParams = `cityId=${getters.getForm.cityId}&countryId=${getters.getForm.countryId}&locale=${i18n.locale}&formatResult=true&xml=false`;

            const URL_permitcountries = `${process.env.VUE_APP_API_URL}permitcountries.php?${commonParams}`;
            const URL_accommodations = `${process.env.VUE_APP_API_URL}accommodations.php?${commonParams}`;
            const URL_hotelClasses = `${process.env.VUE_APP_API_URL}hotelClasses.php?${commonParams}`;
            const URL_regions = `${process.env.VUE_APP_API_URL}regions.php?${commonParams}`;
            const URL_hotels = `${process.env.VUE_APP_API_URL}hotels.php?${commonParams}`;

            const permitcountries = axios.get(URL_permitcountries);
            const accommodations = axios.get(URL_accommodations);
            const hotelClasses = axios.get(URL_hotelClasses);
            const regions = axios.get(URL_regions);
            const hotels = axios.get(URL_hotels);

            Promise.all([permitcountries, accommodations, hotelClasses, regions, hotels])
                .then(function (values) {

                    commit('setPermitCountries', values[0]['data']['permitCountries'])
                    commit('setAccommodations', values[1]['data']['accommodations'])
                    commit('setHotelClassId', values[2]['data']['hotelClasses'][0]['classId'])
                    commit('setHotelClasses', values[2]['data']['hotelClasses'])
                    commit('setRegions', values[3]['data']['tours'])
                    commit('setAllRegions')

                    commit('setHotels', values[4]['data']['hotels'])
                    commit('setCheckedHotels', [])

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    commit('setIsLoading', false)
                });



        },

        changeCountry({commit, getters}, payload) {
            commit('setForm',{'countryId':payload});
            commit('setIsLoading', true);

            const commonParams = `cityId=${getters.getForm.cityId}&countryId=${getters.getForm.countryId}&locale=${i18n.locale}&formatResult=true&xml=false`;

            const URL_accommodations = `${process.env.VUE_APP_API_URL}accommodations.php?${commonParams}`;
            const URL_hotelClasses = `${process.env.VUE_APP_API_URL}hotelClasses.php?${commonParams}`;
            const URL_regions = `${process.env.VUE_APP_API_URL}regions.php?${commonParams}`;
            const URL_hotels = `${process.env.VUE_APP_API_URL}hotels.php?${commonParams}`;

            const accommodations = axios.get(URL_accommodations);
            const hotelClasses = axios.get(URL_hotelClasses);
            const regions = axios.get(URL_regions);
            const hotels = axios.get(URL_hotels);

            Promise.all([accommodations, hotelClasses, regions, hotels])
                .then(function (values) {

                    commit('setAccommodations', values[0]['data']['accommodations'])
                    commit('setHotelClassId', values[1]['data']['hotelClasses'][0]['classId'])
                    commit('setHotelClasses', values[1]['data']['hotelClasses'])
                    commit('setRegions', values[2]['data']['tours'])
                    commit('setAllRegions')

                    commit('setHotels', values[3]['data']['hotels'])
                    commit('setCheckedHotels', [])

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    commit('setIsLoading', false)
                });


        }

    }
}