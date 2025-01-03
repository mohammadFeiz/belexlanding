import React, { Component, createRef } from 'react';
import RVD from './../react-virtual-dom/react-virtual-dom';
import AIOStorage from './../aio-storage/aio-storage';
import AIOInput from './../aio-input/aio-input';
import { Icon } from '@mdi/react';
import { mdiCellphone, mdiLock, mdiLoading, mdiAccount, mdiAccountBoxOutline, mdiEmail, mdiChevronRight } from '@mdi/js';
import AIOService from './../aio-service/aio-service';

import './aio-login.css';
// type I_props = {
//     id:string,
//     onSubmit:(model:I_model,mode:I_mode)=>{nextMode:I_mode,error?:String,token?:string},
//     methods:('OTPNumber' |'userName' |'email' |'phoneNumber')[],
//     timer?:Number,
//     checkToken:(token:string)=>Boolean,
//     register?:{type:'mode'|'button'|'tab',fields:I_registerField[],text:string},
//     forget?:{type:'phoneNumber' | 'email',codeLength:Number},
//     otpLength?:number,
//     attrs?:object
// }
// type I_mode = 'OTPNumber' |'OTPCode' |'userName' |'email' | 'phoneNumber' | 'forgetId' | 'forgetCode' | 'register' | 'error' | 'auth'
// type I_model = {
//     login:{userId:string,password:string},
//     register?:{[field:string]:any},
//     forget?:{id?:string,code?:string,password?:string,rePassword?:string},
// }

export default class AIOlogin{
    constructor(props){
        let {id,onAuth,onSubmit,methods,timer, checkToken,register,userId,attrs,forget,otpLength} = props;
        AIOMapValidator(props);
        let storage = AIOStorage(`-AIOLogin-${id}`);
        this.setStorage = (key,value) => {storage.save({name:key,value});}
        this.getStorage = () => {
            let token = storage.load({ name: 'token', def: false });
            let userId = storage.load({ name: 'userId', def: '' });
            let isAuth = storage.load({ name: 'isAuth', def: false });
            let userInfo = storage.load({ name: 'userInfo' });
            return {token,userId,isAuth,userInfo}                    
        }
        this.setUserInfo = (userInfo)=>{this.setStorage('userInfo',userInfo)}
        this.getUserInfo = ()=>{return this.getStorage().userInfo}
        this.removeToken = ()=>{storage.remove({name:'token'});}
        this.getToken = () => {return this.getStorage().token;}
        this.setToken = (token) => {this.setStorage('token',token)}
        this.getUserId = () => {return this.getStorage().userId}
        this.logout = () => { this.removeToken(); window.location.reload() }
        this.props = {
            id, checkToken,onAuth,onSubmit,methods,register,userId,attrs,timer,forget,otpLength,
            getStorage:this.getStorage,
            setStorage:this.setStorage,
            removeToken:this.removeToken,
            setToken:this.setToken,
            getToken:this.getToken,
            getUserId:this.getUserId,
            logout:this.logout
        }
    }
    render = ()=><AIOLOGIN {...this.props}/>
}
class AIOLOGIN extends Component {
    constructor(props) {
        super(props);
        let {id, checkToken = ()=>true,onSubmit,removeToken,getStorage} = props;
        this.valid = true
        this.state = {
            isAuth: false,
            reportedAuthToParent:false,//prevent unlimit loop between aio login and parent
            apis: new AIOService({
                id: `AIOLoginApis-${id}`,
                getToken:()=>{},
                getApiFunctions: () => {
                    return {
                        checkToken: async () => {
                            let {token,userId,isAuth,userInfo} = getStorage();
                            if (typeof token !== 'string' || !isAuth) { return { result: false } }
                            let result = await checkToken(token,{userId,userInfo});
                            if(result === false){removeToken()}
                            return { result }
                        },
                        onSubmit:async ({model,currentMode}) =>{
                            let res = await onSubmit(model,currentMode);
                            if(!res){return {result:{noAction:true}}}
                            if(!res.nextMode){return {result:'aio-login error => onSubmit should returns an object contain nextMode property'}}
                            let {nextMode,error,token} = res;
                            if(nextMode === currentMode){return {result:false}}
                            removeToken();
                            if(nextMode === 'error'){
                                if(error){return {result:error}}
                                else {return {result:{nextMode:'error'}}}
                            }
                            return {result:{nextMode,token}}
                        }
                    }
                },
                onCatch: (res,service) => { 
                    this.setState({ isAuth: false });
                }
            })
        }
    }
    async componentDidMount() {
        if (!this.valid) { return }
        let {apis} = this.state
        let res = await apis.request({
            api: 'checkToken', description: 'بررسی توکن',
            message: {error:'اتصال خود را بررسی کنید'},
        })
        this.mounted = true;
        if(res === false){
            let {removeToken} = this.props;
            removeToken()
        }
        this.setState({ isAuth: res });
    }
    handleOnsubmitError(currentMode,nextMode,methods,token){
        if(nextMode === 'auth' && !token){
            alert(`
                aio-login error => if onSubmit returns an object contain nextMode:"auth", token props is required
            `)
        }
        if(currentMode === 'OTPNumber'){
            if(nextMode !== 'OTPCode' && nextMode !== 'register'){
                alert(`
                    aio-login error => in onSubmit props cannot switch from mode:"${currentMode}" to mode:"${nextMode}" 
                    in this mode you just can switch to 'OTPCode' or 'register' or 'error' mode
                `)
            }
        }
        else if(currentMode === 'OTPCode'){
            if(nextMode !== 'auth' && nextMode !== 'register'){
                alert(`
                    aio-login error => in onSubmit props cannot switch from mode:"${currentMode}" to mode:"${nextMode}" 
                    in this mode you just can switch to 'auth' or 'register' or 'error' mode
                `)
            }
        }
        else if(currentMode === 'forgetId'){
            if(nextMode !== 'forgetCode'){
                alert(`
                    aio-login error => in onSubmit props cannot switch from mode:"${currentMode}" to mode:"${nextMode}" 
                    in this mode you just can switch to 'forgetCode' or 'error' mode
                `)
            }
        }
        else if(currentMode === 'forgetCode'){
            if(methods.indexOf(nextMode) === -1){
                alert(`
                    aio-login error => in onSubmit props cannot switch from mode:"${currentMode}" to mode:"${nextMode}" 
                    in this mode you just can switch to ${methods.concat('error').split(' or ')} mode
                `)
            }
        }
        else if(currentMode === 'register'){}
        else{
            if(['auth','register'].indexOf(nextMode) === -1){
                alert(`
                    aio-login error => in onSubmit props cannot switch from mode:"${currentMode}" to mode:"${nextMode}" 
                    in this mode you just can switch to "register" | "auth" | "error" mode
                `)
            }
        }
    }
    async onSubmit(model,currentMode){
        let { methods,setStorage } = this.props;
        let { apis } = this.state;
        let description = {
            "OTPNumber":'ارسال شماره همراه',
            "OTPCode":'ارسال کد یکبار مصرف',
            "userName":'ارسال نام کاربری و رمز عبور',
            "phoneNumber":'ارسال شماره همراه و رمز عبور',
            "email":'ارسال آدرس ایمیل و رمز عبور',
            "register":'عملیات ثبت نام'
        }[currentMode];
        let obj = await apis.request({api:'onSubmit', parameter: {model,currentMode}, description,loading:false})
        if(typeof obj !== 'object'){return}
        if(obj.noAction){return}
        let {token,nextMode} = obj;
        if(nextMode === 'error'){return 'error'}
        let modes = [];
        this.handleOnsubmitError(currentMode,nextMode,methods,token);
        if(this.fields){modes.push('register')}
        if(['OTPNumber','phoneNumber','userName','email'].indexOf(currentMode) !== -1){
            setStorage('userId',model.login.userId);
        }
        if (token) { 
            setStorage('token',token);
            this.setState({ token})
        }
        if(nextMode === 'auth'){
            setStorage('isAuth',true);
            this.setState({isAuth:true})
        }
        else {return nextMode}
    }
    render() {
        if (!this.valid) { return null }
        if (!this.mounted) { return null }
        let { layout, otpLength, onAuth, id, timer,methods,userId,register = {},attrs = {},forget,getStorage,logout } = this.props;
        let { isAuth,reportedAuthToParent } = this.state;
        if (isAuth && !reportedAuthToParent) {
            let {token,userId,userInfo} = getStorage();
            onAuth({token,userId,userInfo,logout})
            this.setState({reportedAuthToParent:true})
            return null
        }
        let fields = register.fields?register.fields.map(({ before, label, field, type,validation }) => {return { label, field, type, before,validation }}):undefined
        this.fields = fields;
        let registerText = register.text || 'ثبت نام'
        let html = (
            <LoginForm
                forget={forget}
                time={timer} otpLength={otpLength} id={id} methods={methods} attrs={attrs} userId={userId} 
                fields={fields}
                registerText={registerText}
                registerButton={register.type === 'button'?registerText:undefined}
                registerTab={register.type === 'tab'?registerText:undefined}
                onSubmit={this.onSubmit.bind(this)}
            />
        )
        if (layout) { return layout(html) }
        return html
    }
}
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.dom = createRef()
        this.storage = AIOStorage(`-AIOLogin-${props.id}`);
        let { time = 30, fields = [] } = props;
        let mode = props.methods[0];
        this.state = {
            mode,fields, time, recode: false,tab:'login',
            formError: true,
            model: this.getInitialModel(mode)
        }
    }
    getLabels(mode){
        let {model,tab} = this.state;
        let {registerText,forget} = this.props;
        if(mode === 'OTPNumber'){
            let subtitle = 'شماره همراه خود را وارد کنید . پیامکی حاوی کد برای شما ارسال خواهد شد';
            return {inputLabel:'شماره همراه',title:'ورود با کد یکبار مصرف',submitText:'ورود',subtitle}
        }
        if(mode === 'OTPCode'){return {inputLabel:'کد پیامک شده',title:false,submitText:'ورود',subtitle:`کد پیامک شده به شماره ی ${model.login.userId} را وارد کنید`}}
        if(mode === 'register'){return {inputLabel:false,title:registerText,submitText:registerText,subtitle:false,backButton:tab !== 'register'}}
        if(mode === 'forgetId'){
            let subtitle = `${forget.type === 'phoneNumber'?'شماره همراه':'ایمیل'} خود را وارد کنید . کد باز یابی رمز عبور برای شما ارسال خواهد شد`
            return {inputLabel:forget.type === 'email'?'ایمیل':'شماره همراه',backButton:true,title:'بازیابی رمز عبور',submitText:'دریافت کد بازیابی رمز',subtitle}
        }
        if(mode === 'forgetCode'){
            let {type} = forget;
            let subtitle = `کد ${type === 'phoneNumber'?'پیامک':'ایمیل'} شده به ${type === 'phoneNumber'?'شماره ی':'آدرس'} ${model.forget.id} را وارد کنید`
            return {inputLabel:`کد ${type === 'email'?'ایمیل':'پیامک'} شده`,backButton:true,title:'بازیابی رمز عبور',submitText:'تایید',subtitle}
        }
        if(mode === 'userName'){return {inputLabel:'نام کاربری',title:'ورود با نام کاربری',submitText:'ورود',subtitle:false}}
        if(mode === 'email'){return {inputLabel:'ایمیل',title:'ورود با ایمیل',submitText:'ورود',subtitle:false}}
        if(mode === 'phoneNumber'){return {inputLabel:'شماره همراه',title:'ورود با شماره همراه',submitText:'ورود',subtitle:false}}
    }
    changeMode(mode){
        this.setState({
            mode,
            formError: true,
            model: this.getInitialModel(mode)
        })
    }
    getInitialModel(mode) {
        if(!mode){mode = this.state.mode}
        let { userId } = this.props;
        return {forget:{},register:{},login:{userId}};
    }
    getWaitingTime(){
        let {time,mode} = this.state;
        let lastTry = this.storage.load({name:'lastTry' + mode,def: new Date().getTime() - (time * 1000)})
        let now = new Date().getTime();
        let res = Math.round((now - lastTry) / 1000);
        if(res < time){return time - res}
        return 0
    }
    setLastTry(){
        let {mode} = this.state;
        this.storage.save({name:'lastTry' + mode,value:new Date().getTime()})
    }
    async onSubmit() {
        let {onSubmit} = this.props;
        let { loading, formError,model,mode } = this.state;
        if (formError || loading) { return }
        this.setState({loading:true})
        let nextMode = await onSubmit(model,mode);
        this.setState({loading:false})
        if(!nextMode){return}
        this.setLastTry();
        if(nextMode === 'error'){this.changeMode(mode)}
        else {this.setState({mode:nextMode})}
    }
    title_layout({title,backButton}) {
        if(!title){return false}
        let {methods} = this.props;
        return {
            className: 'aio-login-title',align: 'v',
            row:[
                {show:!!backButton,html:<Icon path={mdiChevronRight} size={1} />,size:48,align:'vh',onClick:()=>this.changeMode(methods[0])},
                {html:title}
            ]
        }
    }
    subtitle_layout({subtitle}) {
        if(!subtitle){return false}
        return { html:subtitle, className: 'aio-login-subtitle' }
    }
    getInputs(labels) {
        let { fields, mode, model } = this.state;
        let {userId,forget} = this.props;
        let {register = {}} = model;
        let {otpLength} = this.props;
        if (mode === 'register') {
            return [
                ...fields.map((o) => { 
                    let validations;
                    if(o.validation){validations = [['function', () => errorHandler({field:'register',value:register,parameter:{validation:o.validation}} )]]}
                    else if(o.validations){validations = o.validations}
                    return {input:{...o,label:undefined},label:o.label, field: 'value.register.' + o.field,validations} 
                })
            ]
        }
        if(mode === 'forgetId'){
            let {type} = forget;
            return [
                {
                    show:type === 'phoneNumber',field: `value.forget.id`,label: labels.inputLabel,
                    input:{
                        type: 'text',justNumber: true,before: <Icon path={mdiCellphone} size={0.8} />, 
                        placeholder: '09...',maxLength:11,style:{direction:'ltr'}
                    },  
                    validations: [['function', () => errorHandler({field:'phoneNumber', value:model.forget.id})]]
                },
                {
                    show:type === 'email',field: 'value.forget.id',label: labels.inputLabel, 
                    input:{type: 'text',before: <Icon path={mdiAccount} size={0.8} />,style:{direction:'ltr'}}, 
                    validations: [['function', () => errorHandler({field:'email', value:model.forget.id})]],
                },
            ]
        }
        if(mode === 'forgetCode'){
            let {type,codeLength} = forget;
            return [
                {
                    field: 'value.forget.code', label: labels.inputLabel,
                    input:{
                        maxLength: codeLength, justNumber: true, type: 'text', placeholder: Array(codeLength).fill('-').join(''),
                        className:'aio-login-otp-code'
                    },
                    validations: [['function', () => errorHandler({field:'code', value:model.forget.code, parameter:{codeLength}})]]
                },
                {
                    field: 'value.forget.password',label: 'رمز عبور جدید', 
                    input:{type: 'password',before: <Icon path={mdiLock} size={0.8} />,style:{direction:'ltr'}}, 
                    validations: [['function', () => errorHandler({field:'password', value:model.forget.password})]]
                },
                {
                    field: 'value.forget.rePassword',label: 'تکرار رمز عبور جدید', 
                    input:{type: 'password',before: <Icon path={mdiLock} size={0.8} />,style:{direction:'ltr'}}, 
                    validations: [['function', () => errorHandler({field:'rePassword', value:model.forget.rePassword,parameter:{password:model.forget.password}})]]
                }
            ]
        }
        let inputs = [
            {
                show:mode === 'userName',field: 'value.login.userId',label: labels.inputLabel, 
                input:{
                    type: 'text', disabled:!!userId,placeholder: 'نام کاربری',before: <Icon path={mdiAccount} size={0.8} />,
                    style:{direction:'ltr'}
                },
                validations: [['function', () => errorHandler({field:'userName', value:model.login.userId})]]
            },
            {
                show:mode === 'OTPNumber' || mode === 'phoneNumber',field: `value.login.userId`,label: labels.inputLabel,
                input:{
                    type: 'text',disabled:!!userId,justNumber: true,before: <Icon path={mdiCellphone} size={0.8} />, 
                    placeholder: '09...',maxLength:11,style:{direction:'ltr'}
                },  
                validations: [['function', () => errorHandler({field:'phoneNumber', value:model.login.userId})]]
            },
            {
                show:mode === 'email',field: 'value.login.userId',label: labels.inputLabel, 
                input:{type: 'text', disabled:!!userId,before: <Icon path={mdiAccount} size={0.8} />,style:{direction:'ltr'}}, 
                validations: [['function', () => errorHandler({field:'email', value:model.login.userId})]],
            },
            {
                show:!!model.login.userId && mode === 'OTPCode',field: 'value.login.password', label: labels.inputLabel,
                input:{
                    maxLength: otpLength, justNumber: true, type: 'text', placeholder: Array(otpLength).fill('-').join(''),
                    className:'aio-login-otp-code'
                },
                validations: [['function', () => errorHandler({field:'code', value:model.login.password, parameter:{codeLength:otpLength}})]]
            },
            {
                show:mode !== 'OTPNumber' && mode !== 'OTPCode',field: 'value.login.password',label: 'رمز عبور', 
                input:{type: 'password',before: <Icon path={mdiLock} size={0.8} />,style:{direction:'ltr'}}, 
                validations: [['function', () => errorHandler({field:'password', value:model.login.password})]]
            }
        ];
        return inputs
    }
    form_layout(labels) {
        let { model,mode } = this.state;
        return {
            className:'ofy-auto',
            html: (
                <AIOInput
                    type='form' key={mode} lang='fa' value={model} rtl={true} 
                    onChange={(model,errors) => {
                        this.setState({ model,formError:!!Object.keys(errors).length})}
                    }
                    inputs={{props:{gap:12},column:this.getInputs(labels)}}
                />
            )
        }
    }
    submit_layout({submitText}) {
        let { loading,formError } = this.state;
        let waitingTime = this.getWaitingTime();
        let text;
        if(waitingTime){
            setTimeout(()=>this.setState({}),1000)
            text = `لطفا ${waitingTime} ثانیه صبر کنید`
        }
        return {
            style: { padding: '0 12px' }, className: 'm-b-12',
            html: (
                <SubmitButton
                    text={text || submitText} loading={loading}
                    disabled={() => !!formError || !!waitingTime}
                    onClick={() => this.onSubmit()}
                />
            )
        }
    }
    changeUserId_layout(){
        let { mode } = this.state;
        if(mode !== 'OTPCode'){return false}
        return {
            onClick: () => this.changeMode('OTPNumber'), 
            className: 'aio-login-text m-b-12', align: 'vh', html: 'تغییر شماره همراه'
        }
    }
    recode_layout() {
        let { mode ,model} = this.state;
        if (mode !== 'OTPCode') { return false }
        let waitingTime = this.getWaitingTime();
        if(!!waitingTime){return false}
        return {
            className: 'aio-login-text m-b-12', html: `ارسال مجدد کد`, align: 'vh',
            onClick: () => {
                this.setState({mode:'OTPNumber',model:{...model,login:{...model.login,password:''}}})
            }
        }    
    }
    changeMode_layout() {
        let { mode } = this.state;
        if (mode === 'register' || mode === 'forgetId' || mode === 'forgetCode') { return false }
        let { methods } = this.props;
        let others = []
        for (let i = 0; i < methods.length; i++) {
            let key = methods[i];
            if (mode === key) { continue }
            if(mode === 'OTPCode' && key === 'OTPNumber'){continue}
            let title = {OTPNumber:'رمز یکبار مصرف',userName:'نام کاربری و رمز عبور',email:'آدرس ایمیل و رمز عبور',phoneNumber:'شماره همراه و رمز عبور'}[key];
            let icon = {OTPNumber: mdiAccount,phoneNumber: mdiCellphone,userName: mdiAccountBoxOutline,email:mdiEmail}[key]
            others.push({
                flex: 1,
                className: `of-visible aio-login-other-method aio-login-${key}`,
                onClick: () => this.changeMode(key),
                row: [
                    { html: <Icon path={icon} size={0.7}/>, align: 'vh' },
                    { size: 6 },
                    { align: 'v', html: title }
                ]
            })
        }
        if (!others.length) { return false }
        return {
            className: 'p-h-12',
            column: [
                {
                    gap: 6,
                    row: [
                        { flex: 1, html: <div className='aio-login-splitter'></div>, align: 'v' },
                        { html: 'یا ورود با', align: 'v', className: 'aio-login-or bold' },
                        { flex: 1, html: <div className='aio-login-splitter'></div>, align: 'v' },
                    ]
                },
                { size: 12 },
                { grid: others, gridCols: 1, gridRow: { gap: 12 } }
            ]
        }
    }
    registerButton_layout(){
        let {registerButton} = this.props;
        let {mode} = this.state;
        if(!registerButton || mode === 'register'){return false}
        return {
            align:'vh',
            html:(
                <button onClick={()=>this.changeMode('register')} className='aio-login-register-button'>{registerButton}</button>
            )
        }
    }
    registerTab_layout(){
        let {registerTab,methods} = this.props;
        if(registerTab === true){registerTab = 'ثبت نام'}
        if(!registerTab){return false}
        let {mode} = this.state;
        if(mode === 'forgetId' || mode === 'forgetCode'){return false}
        return {
            html:(
                <AIOInput
                    className='aio-login-register-tabs'
                    type='tabs' value={mode === 'register'?'register':'login'}
                    options={[
                        {text:'ورود',value:'login'},
                        {text:registerTab,value:'register'},
                    ]}
                    onChange={(tab)=>{
                        if(tab === 'login'){this.changeMode(methods[0])}
                        else if(tab === 'register'){this.changeMode('register')}
                    }}
                />
            )
        }
    }
    forget_layout(){
        let {mode} = this.state;
        let {forget} = this.props;
        if(!forget){return false}
        if(mode === 'register' || mode === 'OTPCode' || mode === 'OTPNumber' || mode === 'forgetId' || mode === 'forgetCode'){return false}
        let {text = []} = forget
        let buttonText = text[0] || 'رمز عبور خود را فراموش کرده اید؟ اینجا کلیک کنید';
        return {
            className:'aio-login-forget',
            html:buttonText,
            onClick:()=>this.changeMode('forgetId')
        }
    }
    render() {
        let {attrs} = this.props;
        let {mode} = this.state;
        let labels = this.getLabels(mode);
        return (
            <RVD
                layout={{
                    className: 'aio-login' + (attrs.className?' ' + attrs.className:''),style:attrs.style,
                    attrs: { ...attrs,onKeyDown: (e) => { if (e.keyCode === 13) { this.onSubmit() } } },
                    column: [
                        this.registerTab_layout(),
                        {column: [this.title_layout(labels),this.subtitle_layout(labels)]},
                        this.form_layout(labels),
                        this.forget_layout(),
                        this.submit_layout(labels),
                        {gap:12,align:'h',row:[this.recode_layout(),this.changeUserId_layout()]},
                        this.changeMode_layout(),
                        this.registerButton_layout()
                    ]
                }}
            />
        )
    }
}
function errorHandler({field, value = '', parameter}) {
    return {
        userName() {if (!value) { return 'نام کاربری را وارد کنید' } return false},
        phoneNumber() {
            if (!value) { return 'شماره همراه خود را وارد کنید' }
            if (value.indexOf('09') !== 0) { return 'شماره همراه باید با 09 شروع شود' }
            if (value.length !== 11) { return 'شماره همراه باید 11 رقم باشد' }
            return false
        },
        email() {
            let atSignIndex = value.indexOf('@');
            if (!value) { return 'ایمیل خود را وارد کنید' }
            if (atSignIndex < 1) { return 'ایمیل خود را به درستی وارد کنید' }
            if (value.indexOf('.') === -1) { return 'ایمیل خود را به درستی وارد کنید' }
            if (value.lastIndexOf('.') > value.length - 3) { return 'ایمیل خود را به درستی وارد کنید' }
            return false
        },
        password() {if (value.length < 1) { return 'رمز عبور را وارد کنید' } return false;},
        rePassword() {
            if (value.length < 1) { return 'رمز عبور را وارد کنید' } 
            if(value !== parameter.password){return 'رمز با تکرار آن مطابقت ندارد'}
            return false;
        },
        code() {
            let {codeLength} = parameter;
            let res;
            if (value.length !== codeLength) { res = `کد ورود باید شامل ${codeLength} کاراکتر باشد` }
            else { res = false }
            return res
        },
        register(){
            return parameter.validation(value);
        }
    }[field]()
}

class SubmitButton extends Component {
    state = { reload: false }
    async onClick() {
        let { onClick, loading } = this.props;
        if (loading) { return; }
        await onClick();
    }
    render() {
        let { disabled, loading, text,outline } = this.props;
        let { reload } = this.state;
        if (loading && !reload) { setTimeout(() => this.setState({ reload: true }), 16 * 1000) }
        let loadingText = reload ? 'بارگزاری مجدد' : 'در حال ارسال';
        return (
            <button className={'aio-login-submit' + (outline?' aio-login-submit-outline':'')} disabled={disabled()} onClick={() => this.onClick()}>
                {!loading && text}
                {!!loading && <Icon path={mdiLoading} size={1} spin={0.2} style={{ margin: '0 6px' }} />}
                {!!loading && loadingText}
            </button>
        )
    }
}
function AIOMapValidator(props){
    let {id,onAuth,onSubmit,methods,timer, checkToken,register,userId = '',attrs,forget,otpLength} = props;
    for(let prop in props){
        if(['id','onAuth','onSubmit','methods','timer','checkToken','register','userId','attrs','forget','otpLength'].indexOf(prop) === -1){
            let error = `
                aio-login error => invalid props 
                ${prop} is not one of AIOLogin props,
                valid props are 'id' | 'onAuth' | 'onSubmit' | 'methods' | 'timer' | 'checkToken' | 'register' | 'userId' | 'attrs' | 'forget' | 'otpLength'
            `;
            alert(error); console.log(error); return;
        }
    }
    if (!id) { alert(`aio-login error=> missing id props, id props should be an string`) }
    if (!onAuth) { 
        let error = `
            aio-login error => missing onAuth props
            onAuth type is => ({token:string,userId:string,logout:function})=>void
        `;
        alert(error); console.log(error); return;
    }
    if(typeof userId !== 'string'){
        let error = `
            aio-login error=> userId props should be an string
        `;
        alert(error); console.log(error); return;
    }
    if(!checkToken){
        let error = `
            aio-login error=> missing checkToken props 
            checkToken type is => (token:string)=>boolean
            for prevent it set checkToken : ()=>true
        `;
        alert(error); console.log(error); return;
    }
    if (!onSubmit) { 
        let error = `
            aio-login error=> missing onSubmit props,
            onSubmit type is => 
            (model:<model type>,mode:<mode type>)=>{
                nextMode:<mode type> // define next mode after submition
                error?:String, //should set in 'error' mode
                token?:string // should set in 'auth' mode
            }
            <model type> is {
                login:{
                    userId:string,
                    password:string | number
                },
                forget:{
                    userId:string,
                    password:string | number
                },
                register:{
                    [field:string]:any
                }
            }
            <mode type> is 'OTPNumber' | 'OTPCode' | 'userName' | 'email' | 'phoneNumber' | 'forgetId' | 'forgetCode' | 'register' | 'error', | 'auth'
        `;
        alert(error); console.log(error); return;
    }
    if(typeof timer !== 'number'){
        let error = `aio-login error=> timer props should be an number`;
        alert(error); console.log(error); return;
    }
    if(!Array.isArray(methods) || !methods.filter((o)=>['OTPNumber','userName','email','phoneNumber'].indexOf(o) !== -1).length){
        let error = `
            aio-login error=> methods props should be an array contain composite of 'OTPNumber' | 'userName' | 'email' | 'phoneNumber'
        `
        alert(error); console.log(error); return;
    }
    if(methods.indexOf('OTPNumber') !== -1){
        if(!otpLength){
            let error = `aio-login error=> otpLength props is not an number (for define length of otp code)`
            alert(error); console.log(error); return;
        }
    }
    if(register){
        if(
            typeof register !== 'object' || 
            ['mode','tab','button'].indexOf(register.type) === -1 || 
            !register.text || 
            !Array.isArray(register.fields) || 
            !register.fields.length
        ){
            let error = `
                aio-login error=> register props should be an object contain: 
                type: "tab" | "button" | "mode"
                fields:[
                    {
                        type:"text" | "number" | "textarea" | "chechbox" | "radio" | "select" | "multiselect" ,
                        before:html (for example an icon),
                        label:string (form input label),
                        validation:(value)=>string (error message) | undefined,
                        field:string (register object property)
                    },
                    ...
                ],
                text:string
            `;
            alert(error); console.log(error); return;
        }
    }
    if(forget){
        if(typeof forget !== 'object'){alert(`aio-login error=> forget props should be an object`)}
        if(['phoneNumber','email'].indexOf(forget.type) === -1){
            let error = `aio-login error=> forget props object, type property should be one of "phoneNumber" | "email"`;
            alert(error); console.log(error); return;
        }
        if(isNaN(forget.codeLength)){
            let error = `aio-login error=> forget props object, codeLength property should be an number`;
            alert(error); console.log(error); return;
        }
    }
}
