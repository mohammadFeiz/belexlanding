export default function getApiFunctions({Axios,baseUrl}){
    return {
        async submitPhoneNumber({firstname,lastname,mobile,nationalCode,province,address,day}){
            debugger
            let url = 'https://retailerapp.bbeta.ir/api/v1/booking/FirstStepBookingRegistration';
             let body = {
                "owner": {
                  "firstName": firstname,
                  "lastName": lastname,
                  "mobileNo": mobile,
                  "nationalCode": nationalCode,
                  "cardCode": "",
                  "addresses": [
                    {
                      "title": "",
                      "cityId": 0,
                      "cityName": "",
                      "provinceName": province,
                      "provinceCode": "", // provinceCode ?
                      "addressLine": "",
                      "postalCode": ""
                    }
                  ]
                },
                "registerarId": 1,
                "eventId": 2412,
                "timeId": 10+day,
                "sectionId": 0
              };
             let response = await Axios.post(url,body);
            let result = true;
            return {result}
        },
        async submitCode({code,model}){
            let {firstname,lastname,mobile,nationalCode,province,address,day} = model;
            debugger
            let url = 'https://retailerapp.bbeta.ir/api/v1/booking/SecondStepBookingRegisteration';
            let body = {
                
                "owner": {
                    "firstName": firstname,
                    "lastName": lastname,
                    "mobileNo": mobile,
                    "nationalCode": nationalCode,
                    "cardCode": "",
                    "addresses": [
                      {
                        "title": "",
                        "cityId": 0,
                        "cityName": "",
                        "provinceName": province,
                        "provinceCode": "", // provinceCode ?
                        "addressLine": "",
                        "postalCode": ""
                      }
                    ]
                  },
                  "code" : code,
                  "registerarId": 1,
                  "eventId": 2412,
                  "timeId": 10+day,
                  "sectionId": 0
                
            };
            let response = await Axios.post(url,body);
            let result = true;
            return {result}
        },
        async getProvinces(){
            debugger
            //let url = 'https://retailerapp.bbeta.ir/api/v1/booking/GetAllBookingProvinces';
            //let body = {};

            // const result2 = [];
            // obj = {}

            // for(var i = 0; i < response.data.data.length; i++) {
            // var obj = {};

            // obj['text'] = response[i].data.data.name;
            // obj['value'] = response[i].data.data.id;
            // result2.push(obj);
            // }
            // return {result2}
            //let response = await Axios.get(url);
            let result = [
                {text:'تهران',value:'tehran'},
                {text:'اصفهان',value:'isfahan'},
            ];
            return {result}
        }
    }
}