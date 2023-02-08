import Cookies from "universal-cookie";
import { instanceAxios } from "../api/axios";

const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    secure: true,
    path: "/",
  });
}

export function setAccessTokenToCookie(accessToken) {
  cookies.set("accessToken", accessToken, {
    path: "/",
    sameSite: "strict",
    secure: true,
  });
}

export function setRememberEmail(email) {
  cookies.set("rememberEmail", email, {
    path: "/",
    sameSite: "strict",
    secure: true,
  });
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
  const cookies = new Cookies();
  try {
    const response = await instanceAxios.post(`/member/logout`, logoutData);
    console.log(response);
    console.log("로그아웃");
    // window.localStorage.setItem('logout', Date.now());
    if (response.status === 200) {
      cookies.remove("refreshToken");
      cookies.remove("accessToken");
      instanceAxios.defaults.headers.common["Authorization"] = null;
      // dispatch({type: 'logout'})
      window.location.reload();
    }
  } catch (err) {
    cookies.remove("refreshToken");
    cookies.remove("accessToken");
    instanceAxios.defaults.headers.common["Authorization"] = null;
    console.error(err);
  }
};
export const logoutSession = async () => {
  try {
    const response = await instanceAxios.post(`/member/logout`, logoutData);
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
    cookies.remove("refreshToken");
    cookies.remove("accessToken");
    instanceAxios.defaults.headers.common["Authorization"] = null;
    window.location.reload();
    console.log("로그아웃 세션만료🎉");
    console.error(err);
  }
};
