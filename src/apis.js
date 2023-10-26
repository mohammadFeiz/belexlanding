export default function getApiFunctions({Axios,baseUrl}){
    return {
        async submitPhoneNumber({firstname,lastname,mobile,nationalCode,province,address,day}){
            debugger
            // let url = '';
            // let body = {};
            // let response = Axios.post(url,body);
            let result = true;
            return {result}
        },
        async submitCode({code,model}){
            let {firstname,lastname,mobile,nationalCode,province,address,day} = model;
            debugger
            //let url = '';
            //let body = {};
            //let response = Axios.post(url,body);
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