// ********Request Apis****
export const endPoints = {
  user: {
    login: "/users/auth/login",
    register: {
      register: "/users/auth/register",
      complete: "/users/auth/completeregister",
      completeWeb: "/users/auth/completeregisterweb",
      approveLineMaker: "/users/auth/approvelinemaker",
    },
    profile: "/users/auth/me",
    logOut: "/users/auth/logout",
    updateProfile: "/users/auth/updatedetails",
    updatePassword: "/users/auth/updatepassword",
    forgetPassword: {
      sendCode: "/users/auth/forgotpassword",
      resetPassword: "/users/auth/resetpassword",
    },
    seen:"/users/auth/seenuser",
    picprofile:"/users/auth/pictureprofileweb",
  },
  forum: {
    all: "/users/post/all",
    allCategory: "/users/forumcategory/all",
    addPost: "/users/post/create",
    addComment: "/users/post/addcomment",
    like: "/users/post/likeordislike/",
    // eachCategory:"users/forumcategory/one/61350a2c4cd39f5fa3a6133d"
    eachCategory: "users/forumcategory/one/",
  },
  News: {
    all: "/users/news/all",
    allCategory: "/users/newscategory/all",
    // eachCategory:"users/forumcategory/one/61350a2c4cd39f5fa3a6133d"
    eachCategory: "/users/newscategory/one/",
  },
  product: {
    add:"/users/product/create",
    addWeb:"/users/product/createweb",
    update: "/users/product/update/",
    delete: "/users/product/delete/",
    comment: "/users/product/addcomment",
    me: "/users/product/allme",
    all: "/users/product/getall",
    decline: "/users/product/decline/",
    requestto: "/users/product/requestto/",
    acceptBusinessMan: "/users/product/confirm/",
    acceptDriver: "/users/product/confirmdriver/",
    rejectDriver: "/users/product/rejectdriver/",
    status: "/users/product/statusproduct/",
    homeChart: "/users/chart/charthome",
  },
  Search: {
    all: "/users/search/all/",
    location:"https://api.ipregistry.co/?key=tryout"
  },
};
// ****Route***
export const pageName = {
 
  main: "/",
  home: "/home",
  mint: "/mint",
  stack: "/soulhunt",
 

};

// ****localStorage****
export const LOCALSTORAGE_PREFIX = "celestial-";
export const localStorageKeys = {
  users: "users",
  token: "token",
};

// ****Base Url****
export const url = "http://195.201.73.13:5000/";
export const urlPath = "api/v1";
 
 

// *******component Const ********
export const TabsName = ["Login", "Register", "Sign In"];
export const Roles = ["businessMan", "truckDriver", "subUser"];
