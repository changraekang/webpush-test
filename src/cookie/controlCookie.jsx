import Cookies from "universal-cookie";
import { instanceAxios } from "../api/axios";
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    secure: true,
  });
}

export function setAccessTokenToCookie(accessToken) {
  cookies.set("accessToken", accessToken, { sameSite: "strict", secure: true });
}

export const getCookie = (name) => {
  return cookies.get(name);
};

const logoutData = {
  deviceInfo: {
    deviceId: "Non empty string",
    deviceType: "DEVICE_TYPE_ANDROID",
    notificationToken: "Non empty string",
  },
};

export const logout = async () => {
  try {
    const response = await instanceAxios.post(`/member/logout`, logoutData);
    console.log(response);
    console.log("로그아웃");
    window.localStorage.removeItem("recoil-persist");
    // window.localStorage.setItem('logout', Date.now());
    if (response.status === 200) {
      // dispatch({type: 'logout'})
      cookies.remove("refreshToken");
      cookies.remove("accessToken");
      instanceAxios.defaults.headers.common["Authorization"] = null;
      window.location.reload();
      console.log("로그아웃 성공🎉");
    }
  } catch (err) {
    // cookies.remove('refreshToken');
    // cookies.remove('accessToken');
    // instanceAxios.defaults.headers.common['Authorization'] = null;
    // window.location.reload();
    console.error(err);
  }
};
export const logoutSession = async () => {
  window.localStorage.removeItem("recoil-persist");
  try {
    const response = await instanceAxios.post(`/member/logout`, logoutData);
    const cookies = new Cookies();
    cookies.remove({ path: "/" });
    console.log(response);
    console.log("로그아웃");
    if (response.status === 200) {
      const cookies = new Cookies();
      // dispatch({type: 'logout'})
      cookies.remove("refreshToken");
      cookies.remove("accessToken");
      instanceAxios.defaults.headers.common["Authorization"] = null;
      window.location.reload();
      console.log("로그아웃 성공🎉");
    }
  } catch (err) {
    const cookies = new Cookies();
    cookies.remove({ path: "/" });
    cookies.remove("refreshToken");
    cookies.remove("accessToken");
    instanceAxios.defaults.headers.common["Authorization"] = null;
    window.location.reload();
    console.log("로그아웃 세션만료🎉");
    console.error(err);
  }
};
