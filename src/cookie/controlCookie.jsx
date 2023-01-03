
import Cookies from 'universal-cookie';
import { instanceAxios } from '../api/axios';
const cookies = new Cookies(); 

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set('refreshToken', refreshToken, { sameSite: 'strict', secure : true,})
}

export function setAccessTokenToCookie(accessToken) {
  cookies.set('accessToken', accessToken, {sameSite: 'strict', secure : true, })
}

export const getCookie = (name) => {
  return cookies.get(name);
}

const logoutData = { 
  "deviceInfo" : {
    "deviceId": "adf", // chrome, firefox ... 
    "deviceType" : "DEVICE_TYPE_ANDROID", //true or false
    "notificationToken" : "dghjk" // window, android, ios ,,,
  }
}

export const logout = async (token) => {
  try {
    const response = await instanceAxios.post('/member/logout', logoutData);
    console.log(response); 
    console.log("로그아웃"); 
    // window.localStorage.setItem('logout', Date.now());
    if(response.status === 200) {
      // dispatch({type: 'logout'})
      cookies.remove('refreshToken');
      cookies.remove('accessToken');

      instanceAxios.defaults.headers.common['Authorization'] = null;
      window.location.reload();
    }
  } catch (err) {
      cookies.remove('refreshToken');
      cookies.remove('accessToken');
      instanceAxios.defaults.headers.common['Authorization'] = null;
      window.location.reload();
    console.error(err);
  }
}