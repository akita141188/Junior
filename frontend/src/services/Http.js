import axios from "axios";
import { BASE_API } from "../shared/constants/app";
import { store } from "../redux-setup/store";
import { jwtDecode } from "jwt-decode";
import { updateCustomerToken } from "../redux-setup/reducers/authReducer";
import { refreshToken } from "./Api";

const Http = axios.create({
  withCredentials: true,
  baseURL: BASE_API,
});



// Add a request interceptor
Http.interceptors.request.use(async function (config) {
  // Do something before request is sent
  const Auth = store.getState().Auth;
  const token = Auth.login.currentCustomer?.accessToken;

  //code này lỗi do new Date() ( lấy time từ client), do vậy có thể sửa time để accesstoken sống
  // if(token){
  //     const decoded = jwtDecode(token)
  //     if(decoded.exp < new Date()/1000 ) {
  //       if(config.url.indexOf("/customer/refreshtoken") >=0 )return config
  //         const data = (await refreshToken()).data;
  //         const newAccessToken = data.accessToken;
  //         const newRefreshToken = data.refreshToken;
  //         console.log(newAccessToken);
  //         console.log(newRefreshToken);
  //         store.dispatch(updateCustomerToken({newAccessToken,newRefreshToken}))
  //         config.headers["token"] = `Bearer ${newAccessToken}` 
  //         return config;
  //     }
  // }
  config.headers["token"] = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

Http.interceptors.response.use(
  async (response) => {
    if (response.data.message === "Token Expired") {
      if (response.config.url.indexOf("/customer/refreshtoken") >= 0) return response // so sánh api '/customer/refreshtoken'
      const data = (await refreshToken()).data;
      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;
      console.log(newAccessToken);
      console.log(newRefreshToken);
      store.dispatch(updateCustomerToken({ newAccessToken, newRefreshToken }))
      response.config.headers["token"] = `Bearer ${newAccessToken}`
      return Http(response.config) // trả lại config về cho header
    }
    return response;
  },

  async (error) => {
    return Promise.reject(error);
  }
)


export default Http;