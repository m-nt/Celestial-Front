import {LOCALSTORAGE_PREFIX, pageName} from "./Conts";
import Home from "../Page/Home/Home";
import Mint from "../Page/Mint/Mint";
import Stack from "../Page/Stack/Stack";
 
import { Navigate, Route } from "react-router-dom";
 
import {getLocalStorage} from "./LocalStorageHelper";
 



export const router = [
  { path: pageName.home, component: Home, type: "public" },
  { path: pageName.mint, component: Mint, type: "public" },
  { path: pageName.stack, component: Stack, type: "public" },
  { path: pageName.main, component: Home, type: "public" },
  // { path: pageName.auth.login, component: Entry, type: "public" },
  // { path: pageName.auth.signUp.signUpStep1, component: Entry, type: "public" },
  //  { path: pageName.home, component: MainSwipe, type: "public"  },
  // { path: pageName.test, component: Test, type: "public" },
  // { path: pageName.product, component: Product, type: "public" },
  //  { path: pageName.forum, component: MainSwipe,   type: "private",    rPath: pageName.home, },
 
  // { path: pageName.register, component: DriverForm, type: "public" },
  // { path: pageName.shiping, component: ContactShipping, type: "public" },
  //  {  path: pageName.NewsDetails,  component: NewsDetail,  type: "private",  rPath: pageName.home, },

];

export const Private =   ({
  LoginValidation= localStorage.getItem(LOCALSTORAGE_PREFIX + 'token')  ,
  component: Component,
  rPath: RedirectPath,
  ...rest
}) => {
  console.log("LoginValidation")
  console.log(LoginValidation)
  return (
    <Route
      {...rest}
      render={(props) =>
        LoginValidation ? (
          <Component {...props} />
        ) : (
          <Navigate to={RedirectPath} />
        )
      }
    />
  );
};

export const Public = ({ component: Component, ...rest }) => {
  return <Route path="/" element={<Home />} />
  // <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const PrivateComponents = async ({

  component: Component,
  ...rest
}) =>


{
  let token=await getLocalStorage("token");

  console.log('token')
  console.log(token)
  return token ? <Component {...rest} /> : null;
};

// export const LoginValidation = () => {
//     try {
//         const hasLogin = localStorage.getItem(TOKEN_KEY) ? true : false;
//         if (hasLogin) {
//             var decrypted = JSON.parse(CryptoJs.AES.decrypt(localStorage.getItem(TOKEN_KEY), SECRET_KEY).toString(CryptoJs.enc.Utf8));
//             return decrypted;
//         }
//         else return false
//     }
//     catch {
//         return false
//     }
// }
//
// export default LoginValidation

// import CryptoJs from "crypto-js";
//
// export const GetToken = () => {
//     try {
//         const hasLogin = localStorage.getItem(TOKEN_KEY) ? true : false;
//         if (hasLogin) {
//             const data = localStorage.getItem(TOKEN_KEY);
//             const Bytes = CryptoJs.AES.decrypt(data, SECRET_KEY);
//             const decrypted = JSON.parse(Bytes.toString(CryptoJs.enc.Utf8));
//             const token = decrypted.token;
//             return token
//         }
//         else return false
//     }
//     catch {
//         return false
//     }
// }
//
// export default GetToken
