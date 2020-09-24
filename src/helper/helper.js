import i18n from '@/i18n'
export default {

    prepareData(data, countryName) {
        const ret = [];

        data.forEach(item => {
            let tour = {};
            //tour.items = [];
            tour.country={};
            tour.country = {
                name: countryName
            };
            tour.dateFrom = item[0];
            tour.dateFromDDMM = item[0].slice(0,5);
            tour.dayWeekFrom = item[2];
            tour.nights = item[3];

            tour.dateTo = dateBydateFrom(item[0], item[4]);
            tour.dateToDDMM = item[4];

            tour.resort = {};
            tour.resort = {
                name: item[5][0],
                nameTraiff: item[5][1],
                id: item[5][2],
                typeId: item[5][3],
                nameFlyTo: item[5][4],
                idFlyTo: item[5][5],
                nameFlyFrom: item[5][6],
                nameAccomodation: item[5][7]
            }
                
            tour.hotel = {};
            tour.hotel = {
                url: item[6][0],
                name: item[6][1],
                thumb: item[6][2] || '/tezminprices/i/noimage.jpg',
                id: item[6][3],
                urlPath: item[6][4],
                stars: item[6][1].replace(/[^\d\*]/g, '').slice(-2, -1),
            };

            tour.pansion = {};
            tour.pansion = {
                name: item[7][0],
                descr: (item[7][0] !== item[7][1] ? item[7][1] : false),
                id: item[7][2],
                id2: item[7][3],
            };

            tour.room = {};
            tour.room = {
                id: item[8][0],
                name: item[8][1],
                id2: item[8][2],
            };

            tour.groupAges = {};
            tour.groupAges = {
                adt: item[9][0] ? item[9][0][0] : 0,
                chd: item[9][1] ? item[9][1][0] : 0,
                inf: item[9][2] ? item[9][2][0] : 0,
            };
            tour.prices = parseInt(item[10].total);

          
            tour.totalFormatted = new Intl.NumberFormat('ru-RU').format(parseInt(item[10].total));

            tour.orderLinks = item[11];

            tour.roomAvailability = (item[12] == "Есть" || item[12] == "Olemas") ? 'Available' : 'No';

            tour.roomAvailabilityText = item[12];

            tour.seatsAvailability = item[13][0];
            tour.info = item[14];

            tour.countAccommodation = item[15];

            tour.from={};
            tour.from = {
                cityName: item[16][0],
                countryName: item[16][1]
            };

            tour.notes = {};
            tour.notes = {
                id: item[17],
                text: item[18],
            };

            // 19 - empty
            // 20 - ?
            // 21 - empty
            tour.transfer = {};
            tour.transfer = {
                toId: item[22][0],
                fromId: item[22][1],
                toId2: item[23][0],
                fromId2: item[23][1],
            };
            // 24 - empty

            ret.push(tour);
        })
        return ret
    },


    /*
    * Группирует туры по отелям
    */
    groupingByHotel(data){
        const groupData = {};
        const idsHotel = [];
        let hidGroup;

        data.forEach(item => {

            hidGroup = 'hid_' + item.hotel.id.toString();
            
            //if ($.inArray(item[6][3], idsHotel) == -1) {
            if (idsHotel.indexOf(item.hotel.id) == -1) {
                idsHotel.push(item.hotel.id);
                groupData[hidGroup] = [];
            }
            
            groupData[hidGroup].push(item);
        })
        return groupData;
    },

    /*
    * Подготавливает сводную информацию по отелю для каждой группы туров
    */
    prepareHotelInfo(data){
        const hotels = [];

        for (let key in data) {
            const hotel = {};
            hotel.info = {};

            let priceMin;
            let totalFormatted;
            let nightsMin;
            let nightsMax;
            let CheckInMin;
            let CheckInMax;
            let checkInMinStr;
            let checkInMaxStr;
            let dayWeekFrom;


            data[key].forEach((item, i) => {
                if (i == 0) {
                    priceMin = item.prices;
                    totalFormatted = item.totalFormatted;
                    nightsMin = item.nights;
                    nightsMax = item.nights;
                    CheckInMin = dateDMY2YMD(item.dateFrom);
                    CheckInMax = dateDMY2YMD(item.dateFrom);
                    checkInMinStr = item.dateFromDDMM;
                    checkInMaxStr = item.dateFromDDMM;
                    dayWeekFrom = item.dayWeekFrom;
                }

                if (dateDMY2YMD(item.dateFrom) < CheckInMin) {
                    CheckInMin = dateDMY2YMD(item.dateFrom);
                    checkInMinStr = item.dateFromDDMM;
                    dayWeekFrom = item.dayWeekFrom;
                }

                if (dateDMY2YMD(item.CheckInMin) > CheckInMax) {
                    CheckInMax = dateDMY2YMD(item.CheckInMin);
                    checkInMaxStr = item.dateFromDDMM;
                }

                if (item.nights < nightsMin) {
                    nightsMin = item.nights
                }

                if (item.nights > nightsMax) {
                    nightsMax = item.nights
                }
            })

            hotel.id = data[key][0].hotel.id;
            hotel.info.country = data[key][0].country;
            hotel.info.checkInMinStr = checkInMinStr;
            hotel.info.checkInMaxStr = checkInMaxStr;
            hotel.info.dayWeekFrom = dayWeekFrom;
            hotel.info.nightsMin = nightsMin;
            hotel.info.nightsMax = nightsMax;
            hotel.info.totalFormatted = totalFormatted;

            hotel.info.hotel = data[key][0].hotel;
            hotel.info.resort = data[key][0].resort;
            hotel.info.groupAges = data[key][0].groupAges;
            
            hotel.info.info = data[key][0].info;

            
            hotel.items = [];
            hotel.items=data[key];
            hotels.push(hotel);
        }
        return hotels
    },


    /**
     * Возращает по возможности 3 отеля звездности 3,4,5 *
     * @param {array} arr - массив выдачи
     * @return {array}
     */
    queryStars(arr) {
        let ret = [];

        if (!arr.length) {
            return ret
        }

        let star3 = getByStar(arr, 3);
        let star4 = getByStar(arr, 4);
        let star5 = getByStar(arr, 5);

        // Если не нашли 3* - берем 4* или 5*
        if (!star3.length) {
            if (star4.length) {
                star3.push(star4.shift());
            } else {
                star3.push(star5.shift());
            }
        }

        // Если не нашли 4* - берем 3* или 5*
        if (!star4.length) {
            if (star3.length >= 2) {
                star4.push(star3[1]);
            } else {
                star4.push(star5.shift());
            }
        }

        // Если не нашли 5* - берем 4* или 3*
        if (!star5.length) {
            if (star4.length >= 2) {
                star5.push(star4[1]);
            } else {
                star5.push(star3.shift());
            }
        }



        [star3[0], star4[0], star5[0]].forEach(item => {
            if (item) {
                ret.push(item)
            }
        })
        return ret
    },

    timeStamptoDDMMYYYY(date) {

        if (!date) return;

        date = new Date(date);
        let d = date.getDate();
        if (d < 10) {
            d = '0' + d
        }

        let m = date.getMonth() + 1;
        if (m < 10) {
            m = '0' + m
        }

        let y = date.getFullYear();

        return `${d}.${m}.${y}`
    }

}

/**
 * 
 * @param arr {array}
 * @param star {number} - звездность
 * @param count {number} - кол-во в выборке
 */
function getByStar(arr, star, count = 3) {
    return arr.filter(item => item.info.hotel.stars == star).slice(0, count)
}

/*
* Возращает дату чекаута в формате DDMMYYYY по дате чекина в формате DDMMYYYY и дате чекина в формате DDMM
*/

function dateBydateFrom(from, to) {
    const fromParts = from.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    let fromMonth = fromParts[2];
    let fromYear = fromParts[3];

    const toParts = to.match(/(\d{2})\.(\d{2})/);
    let toMonth = toParts[2];
    let toYear = fromYear;
    if (fromMonth > parseInt(toMonth)) {
        toYear++
    }
    return `${to}.${toYear}`
}







function priceFormatted(value){
    if (!value) return ''
    return new Intl.NumberFormat('ru-RU').format(value);
}





function dateDMY2YMD(date){
    let ret= parseDate(date);
    return `${ret.year}.${ret.month}.${ret.day}`
}

function dateYMD2DMY(date) {
    if (!date) { return }

    const dateParts = date.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    const day = dateParts[3];
    const month = dateParts[2];
    const year = dateParts[1];
    return `${day}.${month}.${year}`
}


// Рабивает строку даты в объект

function parseDate(date) {
    if (!date) {
        return {
            'day': '',
            'month': '',
            'year': '',
            'dateOfWeek': '',
            'timestamp':''
        }
    }
    const dateParts = date.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    const day = dateParts[1];
    const month = dateParts[2];
    const year = dateParts[3];
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();

    return {
        'day': day,
        'month': month,
        'year': year,
        'dateOfWeek': dayOfWeek,
        'timestamp': dateObj.getTime()
    }

}

