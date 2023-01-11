import { atom } from "recoil";

const MyProfile = atom({
  key: "MyProfile", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const MyProject = atom({
  key: "MyProject", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export { MyProfile, MyProject };
