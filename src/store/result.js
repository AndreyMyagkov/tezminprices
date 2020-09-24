import helper from '../helper/helper.js'
import axios from 'axios';
import {config} from '@/config.js'
import i18n from '@/i18n'


export default {
    state: {
        results: [],
        notFound: null,
        tourLoading: false,
        progress: 0,
        total: 0,
        hasNext: false,
        minPrice:0,
    },
    getters: {
        getResults: state => {
            return state.results
        },
        getNotFound: state => {
            return state.notFound
        },
        getTourLoading: state => {
            return state.tourLoading
        },
        getProgress: state => {
            return state.progress
        },
        getTotal: state => {
            return state.total
        },
        getHasNext: state => {
            return state.hasNext
        },
        getMinPrice: state => {
            return state.minPrice
        },
    },
    mutations: {
        setResults:(state, payload)=>{
            //state.results=payload;
            state.results = state.results.concat(payload);
        },
        setClearResults: (state) => {
            state.results=[];
        },
        setNotFound: (state, payload) => {
            state.notFound = payload;
        },
        setTourLoading: (state, payload) => {
            state.tourLoading = payload;
        },
        setProgress: (state, payload) => {
            state.progress = payload;
        },
        setTotal: (state, payload) => {
            state.total = payload;
        },
        setHasNext: (state, payload) => {
            state.hasNext = payload;
        },
        setMinPrice: (state, payload) => {
            state.minPrice = payload;
        },
    },

    actions: {

        // Загрузка следующей страницы
        loadMore: ({commit, getters, dispatch}, payload) => {

            commit('setTourLoading', true);
            commit('setHasNext', false);

            const getSearchParams = getters.getSearchParams;
            
            getters.getSearchParams.priceMin = getters.getMinPrice;
            dispatch('loadTours', getters.getSearchParams);
        },

        // Загрузка туров по параметрам
        loadTours: ({commit, getters, state}, params) =>{

            const getParams = new URLSearchParams();
            for (let key in params) {
                getParams.append(key, params[key]);
            }

            getters.getCheckedRegions.forEach(item => {
                getParams.append('tourId', item);
            })

            getters.getCheckedHotels.forEach(item => {
                getParams.append('hotelId', item);
            })

            if (getters.getCheckedHotels.length) {
                getParams.delete('groupByHotel');
            }

            axios
                .get(`https://search.tez-tour.com/tariffsearch/getResult`, {
                    params: getParams
                })
                .then(response => {
                    const total = parseInt(response.data.info[1][1]);

                    if (response.data.success == true && total) {

                        let countryName;
                        if (response.data.arrivalCountryId) {
                            // getters.getCountries.forEach(item => {
                            //     if (item.countryId == response.data.arrivalCountryId) {
                            //         countryName = item.name
                            //     }
                            // });
                            countryName = i18n.t('country')[response.data.arrivalCountryId]
                        }
                       
                        
                        //$t('message.hello')
                        
                        

                        let data = response.data.data;
                        let minPrice = data[data.length - 1][10].total;
                        
                        // Обработка сырых данных
                        data = helper.prepareData(response.data.data, countryName);

                        // Добавляем описание пансиона для ee версии
                        data.forEach(item => {
                            if (!item.pansion.descr) {
                                item.pansion.descr = getters.getPansionGuide[item.pansion.id]
                            }
                        })

                        // Группировка по отелю
                        let groups = helper.groupingByHotel(data);

                        // Саммари по отелю
                        let hotels = helper.prepareHotelInfo(groups);
                        //console.log(groups);

                        //console.log(hotels);

                        hotels = helper.queryStars(hotels);

                        commit('setResults', hotels);
                        commit('setTotal', total);
                        commit('setHasNext', (response.data.info[3][1] == "true"));

                        if (!getters.getMinPrice) {
                           
                           

                        }
                        commit('setMinPrice', minPrice);
                    } else {
                        commit('setNotFound', true);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    commit('setTourLoading', false);
                    commit('setProgress', 100);
                });
        },

        // Загрузка первой страницы
        runSearch: ({commit, getters, dispatch}, payload) =>{
      
            
            commit('setClearResults');
            commit('setNotFound', false);
            commit('setTourLoading', true);
            commit('setProgress', 0);
            commit('setTotal', 0);
            commit('setHasNext', false);
            commit('setMinPrice', 0);
           
            const getSearchParams = getters.getSearchParams;
            getSearchParams.priceMin = 0;
            dispatch('loadTours', getters.getSearchParams);
            
        }
    }
}

