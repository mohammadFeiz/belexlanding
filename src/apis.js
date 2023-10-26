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
            return {response,result}
        },
        async submitCode({code,model}){
            let {firstname,lastname,mobile,nationalCode,province,address,day} = model;
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
            return {response,result}
        },
        async getProvinces(){
            let url = 'https://retailerapp.bbeta.ir/api/v1/booking/GetAllBookingProvinces';
            let response = await Axios.get(url);
            let result = response.data.data.map(({name,phoneCode})=>{
              return {text:name,value:phoneCode}
            });
            return {result}
        },
        async capacity(){

        }
    }
}