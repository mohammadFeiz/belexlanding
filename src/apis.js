export default function getApiFunctions({ Axios, baseUrl }) {
  return {
    async submitPhoneNumber({ model, provinces, cities }) {
      let { firstname, lastname, mobile, nationalCode, province, city, address, day } = model;
      let url = 'https://retailerapp.bbeta.ir/api/v1/booking/FirstStepBookingRegistration';
      debugger
      let c = cities.find((o) => o.value === city) || {};
      let cityName = c.name;
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
              "cityId": city,
              "cityName": cityName,
              "provinceName": provinces.find((o) => o.value === province).text,
              "provinceCode": province, // provinceCode ?
              "addressLine": "",
              "postalCode": ""
            }
          ]
        },
        "registerarId": 1,
        "eventId": 2412,
        "timeId": {'23':1023,'24':1025,'25':1026,'26':1027}[day.toString()],
        "sectionId": 0
      };
      let response = await Axios.post(url, body);
      let result = true;
      return { response, result }
    },
    async submitCode({ code, model, provinces, cities }) {
      let { firstname, lastname, mobile, nationalCode, province, city, address, day } = model;
      let c = cities.find((o) => o.value === city) || {};
      let cityName = c.name;
      
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
              "cityId": city,
              "cityName": cityName,
              "provinceName": provinces.find((o) => o.value === province).text,
              "provinceCode": province, // provinceCode ?
              "addressLine": "",
              "postalCode": ""
            }
          ]
        },
        "code": code,
        "registerarId": 1,
        "eventId": 2412,
        "timeId": {'23':1023,'24':1025,'25':1026,'26':1027}[day.toString()],
        "sectionId": 0

      };
      let response = await Axios.post(url, body);
      let result = true;
      return { response, result }
    },
    async getProvinces() {
      let url = 'https://retailerapp.bbeta.ir/api/v1/booking/GetAllBookingProvinces';
      let response = await Axios.get(url);
      let result = response.data.data.map(({ name, phoneCode, id }) => {
        return { text: name, value: phoneCode, id }
      });
      return { result }
    },
    async getCities({ provinceCode, provinces }) {
      let province = provinces.find((o) => o.value === provinceCode)
      let url = `https://retailerapp.bbeta.ir/api/v1/Booking/GetAllBookingCitiesInProvince?provinceId=${province.id}`;
      let response = await Axios.get(url);
      let result = response.data.data.map(({ name, id }) => {
        return { text: name, value: id }
      });
      return { result }
    },
    async capacity() {

    }
  }
}