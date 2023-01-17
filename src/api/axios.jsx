import axios from "axios";
import { getCookie } from "../cookie/controlCookie";
const userAccessToken = getCookie("accessToken"); //null

export const instanceAxios = axios.create({
  baseURL: "https://api.dmpush.kr/api/",
  // baseURL: "http://localhost:8080/api/", // 로컬
  headers: {
    Authorization: `${userAccessToken}`,
  },
});

instanceAxios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    const userAccessToken = getCookie("accessToken");
    if (userAccessToken) {
      config.headers["Authorization"] = userAccessToken;
    }
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// // 응답 인터셉터 추가
// instanceAxios.interceptors.response.use(
//   function (response) {
//     // 응답 데이터를 가공
//     // ...
//     return response;
//   },
//   function (error) {
//     // 오류 응답을 처리
//     // ...
//     return Promise.reject(error);
//   });

//https://velog.io/@ino5/axios-Interceptor-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-JWT-%ED%97%A4%EB%8D%94-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
