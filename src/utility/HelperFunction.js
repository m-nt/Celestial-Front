export const moveItem = (data, from, to) => {
    const temp = [...data];
    // remove `from` item and store it
    var f = temp.splice(from, 1)[0];

    // insert stored item into position `to`
    temp.splice(to, 0, f);

    return temp;
};

export const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export function  findIndexIfObjWithAttr   (array, attr, value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export const returnLocationCity = async data => {
    const mapApi =
        'https://restapi.amap.com/v3/geocode/regeo?output=json&location=';
    const longitude = data.location.longitude;
    const latitude = data.location.latitude;
    // const target = data.location.target;
    const accessKey =
        '&key=f5559968eee53a3b3c7fd7c7ec5bffbc&radius=1000&extensions=all';

    const mapResponse = await fetch(
        `${mapApi}${longitude},${latitude}${accessKey}`,
        {
            method: 'GET',
        },
    );
    const res = await mapResponse.json();
    console.log(res)

    const province = await res.regeocode.addressComponent?.province;
    const district = await res.regeocode.addressComponent?.district;
    const streetNumber = await res.regeocode.addressComponent?.streetNumber?.street;
    const city = await res.regeocode.addressComponent?.city;

    return {
        province,
        district,
        streetNumber,
        city,
        longitude,
        latitude,
        // target,
    };
};
export const ConvertDate = (values) => {
    let Time = `${values}`.split("/");
    return {
        day: parseInt(Time[1]),
        month: parseInt(Time[0]),
        year: parseInt(Time[2]),
    };
};
export function averageFunc (array) {
    var i = 0, sum = 0, len = array.length;
    while (i < len) {
        sum = sum + array[i++];
    }
    return sum / len;
}

export const setStatusProduct = async (item) => {

    if (item){
        if(  item.status.endContract){
            return 4

        }else if(( item.status.primarySampleSeller &&
            item.status.primarySampleBuyer &&
            (!item.status.secondarySampleSeller|| !item.status.secondarySampleBuyer)
        )){
            return 1
        } else if( item.status.secondarySampleSeller &&
            item.status.secondarySampleBuyer &&
            (!item.status.confirmTransportForSeller ||
                !item.status.confirmTransportForBuyer) ){

            return 2
        }else if( item.status.secondarySampleSeller &&
            item.status.secondarySampleBuyer &&
            item.status.confirmTransportForSeller &&
            item.status.confirmTransportForBuyer){
            return 3

        }else {
            return 0
        }

    }else {
        return 0
    }


}

export const getCity =  (item) => {
    let city=['unknow','unknow'];
    let City=['unknow','unknow'];
    // console.log(item)
    if (item){
        City[0]=item.location?.city?.length>2?item.location?.city:item.location?.province
        if(item?.status?.confirm){
            let newLoc=item?.status?.request[0].location
            City[1]=newLoc?.city?.length>2?newLoc?.city:newLoc?.province
        }

        if(item.creator==="seller"){
            city=[City[0],City[1]]
        }else {
            city=[City[1],City[0]]
        }
        return city
    }else{
        return city
    }



}
export const NumberSeparatorFunction = (number) => {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + ',');
}
// export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneRegExp = /^1[0-9]{10}$/;
export function ErrorRequest(error) {


    var resp ={state: '',message: ''};
    if (error.response===undefined){
        resp={state: 400,message: error.message}

    } else if (error.response.status===400 || error.response.status===401 ) {
        resp={state: 400,message: error.response.data.error}
        if (error.response.data.detail==="access denied") {
            // console.log("we are out !!!!!!!!!!");
            // localStorage.clear();
            //     window.location.reload();
        }

    } else if (error.response.status===422){
        resp={state:422,message:error.response.statusText}
    }else{
        resp={state:error.response.status||400,message:error.response.data.detail||error.message}
    }

    return resp;
}

export const HandelCategoriesLabelValue=(data)=>{
    return data.map((item,i)=> ({ value: item._id, label:  item.name, id: item._id, index: i }))

}
export const convertDate = (value) => {
    let date=value;
    // if ( localStorage.getItem("currentLanguage")) {
        // let type=localStorage.getItem("currentLanguage")==="fa"?"fa-IR":null
        // date = type!==null?new Date( value ).toLocaleDateString('en'):new Date( value ).toLocaleDateString()
        date = new Date( value ).toLocaleDateString()
    // }
    return date;
};

export const  timeConverterTimeStamp=(UNIX_timestamp)=>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}



export function compareDecimals(a, b) {
    if (a.number === b.number)
        return 0;
    return a.number < b.number ? -1 : 1;
}
export function nFormatter(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'GT';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'MT';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'KT';
    }
    return num;
}

export function getFileSize(files){
    var filesize = ((files.size/1024)/1024).toFixed(4)
    return filesize
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export const getDistance = async (item, element) => {

    const elem = await {
        longitude: element.location
            ? element.location.longitude
            : element.longitude,
        latitude: element.location ? element.location.latitude : element.latitude,
    };
    const origin = {
        longitude:
            item.creator === 'seller' ? item.location.longitude : elem.longitude,
        latitude:
            item.creator === 'seller' ? item.location.latitude : elem.latitude,
    };
    const destination = {
        longitude:
            item.creator === 'buyer' ? item.location.longitude : elem.longitude,

        latitude: item.creator === 'buyer' ? item.location.latitude : elem.latitude,
    };
    const originLongitude = await Number(origin.longitude);
    const originLatitude = await Number(origin.latitude);
    const destinationLatitude = await Number(destination.longitude);
    const destinationLongitude = await Number(destination.latitude);
    const accessKey = '&key=f5559968eee53a3b3c7fd7c7ec5bffbc&radius=1000';
    const api = `https://restapi.amap.com/v3/direction/driving?origin=${originLongitude},${originLatitude}&destination=${destinationLatitude},${destinationLongitude}&extensions=all&output=json${accessKey}`;

    const mapResponse = await fetch(api, {
        method: 'GET',
    });

    const res = await mapResponse.json();
    console.log(res);
    return res.route;
};

export async function sortTime(Array) {

    const x = await Array.sort(function (a, b) {
        // console.log('a.createAt===>', a.createAt);
        if (a.createAt && b.updatedAt) {
            return a.createAt < b.createAt;
        } else {
            return a.updatedAt < b.updatedAt;
        }
    });
    return x
}




//
// export const confirmRequest = async (controllers, request) => {
//     await store.dispatch(controllersActions.Loading(true));
//     const productId = controllers.ProductModalData._id;
//     const origin = {
//         longitude:
//             controllers.ProductModalData.creator === 'seller'
//                 ? controllers.ProductModalData.location.longitude
//                 : request.location.longitude,
//         latitude:
//             controllers.ProductModalData.creator === 'seller'
//                 ? controllers.ProductModalData.location.latitude
//                 : request.location.latitude,
//     };
//     const destination = {
//         longitude:
//             controllers.ProductModalData.creator === 'buyer'
//                 ? controllers.ProductModalData.location.longitude
//                 : request.location.longitude,
//
//         latitude:
//             controllers.ProductModalData.creator === 'buyer'
//                 ? controllers.ProductModalData.location.latitude
//                 : request.location.latitude,
//     };
//     const rez = await returnDistance(origin, destination);
//     const cost = rez.taxi_cost;
//     const {distance, duration} = rez.paths[0];
//
//     try {
//         const token = await store.getState().auth.token;
//         // const token = await AsyncStorage.getItem('x-access-token');
//         if (token) {
//             const rawResponse = await fetch(
//                 `${ServerIp}/product/confirm/${productId}/${request._id}/${cost}/${distance}/${duration}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                         authorization: `Bearer ${token}`,
//                     },
//                 },
//             );
//
//             const response = await rawResponse.json();
//
//             if (response.success) {
//                 await store.dispatch(controllersActions.Loading(false));
//                 await getAllProductsMe();
//                 await getAllProducts();
//             } else {
//                 await store.dispatch(controllersActions.Loading(false));
//             }
//         }
//     } catch (err) {
//         console.log('confirmRequest===>', err);
//         await store.dispatch(controllersActions.Loading(false));
//     }
// };