export const AuthList = [
  { title: "emailToken", path: "POST", explain: "이메일 토큰을 인증" },
  {
    title: "emailToken/",
    path: "get",
    explain: "이메일 토큰을 받아옵니다",
  },
  { title: "emailTokenComplete", path: "POST", explain: "이메일 토큰을 확인" },
  { title: "login", path: "POST", explain: "로그인 후 인증토큰을 반환한다" },
  {
    title: "password/link",
    path: "POST",
    explain: "비밀번호 재설정 링크 요청",
  },
  { title: "password/reset", path: "POST", explain: "비밀번호 재설정" },
  { title: "refresh", path: "POST", explain: "토큰 재발행" },
  { title: "register", path: "POST", explain: "사용자 등록" },
];
export const BoardList = [];
export const MessageList = [
  { title: "{id}", path: "GET", explain: "메세지 한건 호출" },
  { title: "{id}", path: "PUT", explain: "메세지 수정" },
  { title: "{id}", path: "DELET", explain: "메세지 삭제" },
  { title: "{id}/add", path: "POST", explain: "{id}프로젝트의 메세지 등록" },
  { title: "{id}/all", path: "GET", explain: "프로젝트별 메시지 목록" },
  { title: "all", path: "GET", explain: "메시지 전체 목록" },
];
export const ProjectList = [
  { title: "{id}", path: "GET", explain: "카테고리 한건 호출" },
  { title: "{id}", path: "PUT", explain: "카테고리 수정" },
  { title: "{id}", path: "DELET", explain: "카테고리 삭제" },
  { title: "add", path: "POST", explain: "카테고리 등록" },
  { title: "all", path: "GET", explain: "카테고리 전체 목록" },
];
export const CategoryList = [
  { title: "{id}", path: "PUT", explain: "카테고리 수정" },
  { title: "{id}", path: "DELETE", explain: "카테고리 삭제" },
  { title: "add", path: "POST", explain: "카테고리 등록" },
  { title: "all", path: "GET", explain: "카테고리 전체 출력" },
];
export const MemberList = [
  { title: "password/update", path: "PUT", explain: "비밀번호 수정" },
  { title: "password/logout", path: "GET", explain: "로그아웃" },
  { title: "password/me", path: "POST", explain: "로그인유저정보 호출" },
];
