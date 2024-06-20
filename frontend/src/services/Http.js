import axios from "axios";
import { BASE_API } from "../shared/constants/app";
import { store } from "../redux-setup/store";
import { jwtDecode } from "jwt-decode";
import { loggedOut } from "../redux-setup/reducers/authReducer";

const Http = axios.create({
    baseURL: BASE_API,
});



// Add a request interceptor
Http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const Auth = store.getState().Auth;
    const token = Auth.login.currentCustomer?.accessToken;
    if(token){
        const decoded = jwtDecode(token)
        if(decoded.exp < new Date()/1000 ) {
            store.dispatch(loggedOut())
        }
    }
    config.headers["token"] = `Bearer ${token}` 
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export default Http;