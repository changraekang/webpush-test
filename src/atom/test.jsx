export const AuthList = [
  { title: "email", path: "POST", explain: "이메일 토큰을 인증" },
  { title: "login", path: "POST", explain: "로그인 후 인증토큰을 반환한다" },
  {
    title: "password/link",
    path: "POST",
    explain: "비밀번호 재설정 링크 요청",
  },
  { title: "password/reset", path: "GET", explain: "비밀번호 재설정 페이지" },
  { title: "password/reset", path: "POST", explain: "비밀번호 재설정" },
  { title: "refresh", path: "POST", explain: "토큰 재발행" },
  { title: "register", path: "POST", explain: "사용자 등록" },
  { title: "registrationComplete", path: "GET", explain: "사용자의 토큰 확인" },
];
export const BoardList = [];
export const MessageList = [
  { title: "message/1", path: "GET", explain: "메세지 한건 호출" },
  { title: "message/1", path: "PUT", explain: "메세지 수정" },
  { title: "message/1", path: "DELET", explain: "메세지 삭제" },
  { title: "message/1/add", path: "POST", explain: "메세지 등록" },
  { title: "message/1/all", path: "GET", explain: "프로젝트별 메시지 목록" },
  { title: "message/all", path: "GET", explain: "메시지 전체 목록" },
];
export const ProjectList = [
  { title: "project/1", path: "GET", explain: "카테고리 한건 호출" },
  { title: "project/1", path: "PUT", explain: "카테고리 수정" },
  { title: "project/1", path: "DELET", explain: "카테고리 삭제" },
  { title: "project/add", path: "POST", explain: "카테고리 등록" },
  { title: "project/all", path: "GET", explain: "카테고리 전체 목록" },
];
export const CategoryList = [
  { title: "category/1", path: "PUT", explain: "카테고리 수정" },
  { title: "category/1", path: "DELETE", explain: "카테고리 삭제" },
  { title: "category/add", path: "POST", explain: "카테고리 등록" },
  { title: "category/all", path: "GET", explain: "카테고리 전체 출력" },
];
export const MemberList = [
  { title: "member/password/update", path: "PUT", explain: "비밀번호 수정" },
  { title: "member/password/logout", path: "GET", explain: "로그아웃" },
  { title: "member/password/me", path: "POST", explain: "로그인유저정보 호출" },
];
