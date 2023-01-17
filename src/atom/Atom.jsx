import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const MyProfile = atom({
  key: "MyProfile", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

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

const IsOpenModal = atom({
  key: "IsOpen",
  default: true, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const MyCategory = atom({
  key: "MyCategory", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export {
  MyProfile,
  MyProject,
  MyPushProject,
  MyCategory,
  IsOpenModal,
};
