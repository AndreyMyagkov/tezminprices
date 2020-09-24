const arr = [];
arr[0] = [
    {
        id:1,
        hotelStar: 3
    },
    {
        id: 2,
        hotelStar: 3
    },
    {
        id: 3,
        hotelStar: 5
    },
    {
        id: 4,
        hotelStar: 4
    },
    {
        id: 5,
        hotelStar: 3
    },
    {
        id: 6,
        hotelStar: 4
    },
    {
        id: 7,
        hotelStar: 3
    },

];
// arr[1] = [];
// arr[2] = [3,3,3,3];
// arr[3] = [3,3,3];
// arr[4] = [3, 3];
// arr[5] = [3];
// arr[6] = [4,4,4,4];
// arr[7] = [4, 4, 4];
// arr[8] = [4, 4];
// arr[9] = [4];
// arr[11] = [5,5,5,5];
// arr[12] = [5, 5, 5];
// arr[13] = [5, 5];
// arr[14] = [5];
// arr[15] = [4, 4, 5, 5];
// arr[16] = [4, 4, 5];
// arr[17] = [4, 5];
// arr[18] = [3, 3, 4, 4];
// arr[19] = [3, 3, 4];
// arr[20] = [3, 4];
// arr[21] = [3, 3, 5, 5];
// arr[22] = [3, 3, 5];
// arr[23] = [3, 5];

/**
 * 
 * @param arr {array}
 * @param star {number} - звездность
 * @param count {number} - кол-во в выборке
 */
function getByStar(arr, star, count = 3) {
    return arr.filter(item => item.hotelStar === star).slice(0, count)
}
//console.log(getByStar(arr[5], 3, count = 3));


/**
 * Возращает по возможности 3 отеля звездности 3,4,5 *
 * @param {array} arr - массив выдачи
 * @return {array}
 */
function queryStars(arr) {
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
}


arr.forEach((item, i) => {
    console.log(`${i}`);
    console.log(`${item}`);
    console.log(queryStars(item));

})

