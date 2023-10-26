export default function getApiFunctions({Axios,baseUrl}){
    return {
        async submitPhoneNumber({firstname,lastname,mobile,nationalCode,province,address,day}){
            debugger
            let url = 'https://localhost:44339/api/v1/booking/FirstStepBookingRegistration';
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
                      "provinceName": "",
                      "provinceCode": "",
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
            let url = 'https://localhost:44339/api/v1/booking/SecondStepBookingRegisteration';
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
                        "provinceName": "",
                        "provinceCode": "",
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
            //let url = '';
            //let body = {};
            //let response = Axios.post(url,body);
            let result = [
                {text:'تهران',value:'tehran'},
                {text:'اصفهان',value:'isfahan'},
            ];
            return {result}
        }
    }
}