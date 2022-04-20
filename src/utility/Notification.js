/** ===== Notifications Handler ===== */
import {toast} from 'react-toastify';
export const showMessage = (message, type) => toast(message, { type });

export const ErrorNotify = error => {

    let error_message = '';

    if (error.response && error.response.status === 422)
        error_message = Object.values(error.response.data.errors)[0][0];
    else if (error.response && error.response.status === 500)
        error_message = 'خطای سرور.لطفا به مدیر گزارش دهید.';
    else
        error_message = 'اتصال به اینترنت برقرار نیست.'

    toast.error(error_message, MessageOptions);
}


export const SuccessNotify = (message = 'عملیات با موفقیت انجام شد.') => {
    toast.success(message, MessageOptions);
}

export const gotennisNotif = (type = 1 ,text) => {
    let message=customeAlert('به اپلیکشین خوش آمدید ');
    switch(type) {
        case 1:
             message=customeAlert('به اپلیکشین خوش آمدید ');
            break;
        case 2:
            message=customeAlert('برای رزرو باید موبایل شما تایید شود ');
            break;
        case 3:
            message=customeAlert('خطا در جنسیت سانس');
            break;
        case 4:
            message=customeAlert(text);
            break;
        default:
        // code block
    }
     toast(message, MessageOptions);
}




const MessageOptions = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // limit:1
    // newestOnTop:true

}
const Style={
    display:"flex",
    fontSize:"16px",
    justifyContent: 'space-around',
    alignItems:"center",
    fontFamily:"sans"
}




const customeAlert =(text)=>{
    return(
        <div dir='rtl'  style={Style}><img src="/logo192.png" alt="" width={30}/> {text}  </div>
    )
}


