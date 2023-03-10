import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// Auth
const MyProfile = atom({
  key: "MyProfile", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

// Project
const MyProject = atom({
  key: "MyProject", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const MyPushProject = atom({
  key: "MyPushProject", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const MyCategory = atom({
  key: "MyCategory", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
// Alert
const IsAlertOpen = atom({
  key: "AlertModalOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const AlertMessage = atom({
  key: "AlertMessage", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
// Logout
const LogoutMessage = atom({
  key: "LogoutMessage", // unique ID (with respect to other atoms/selectors)
  default: "로그아웃 성공🎉", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const IsLogoutOpen = atom({
  key: "LogoutModalOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const AlertCode = atom({
  key: "AlertCode", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export {
  MyProfile,
  MyProject,
  MyPushProject,
  MyCategory,
  IsAlertOpen,
  AlertMessage,
  AlertCode,
  LogoutMessage,
  IsLogoutOpen,
};
