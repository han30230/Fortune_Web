export const NAV_LINKS = [
  { href: "/today", label: "오늘의운세" },
  { href: "/newyear", label: "신년운세" },
  { href: "/compatibility", label: "궁합" },
  { href: "/saju", label: "사주풀이" },
] as const;

export const ROUTES = {
  home: "/",
  today: "/today",
  newyear: "/newyear",
  compatibility: "/compatibility",
  saju: "/saju",
} as const;

export const CTA_LINK = "/today"; // "무료로 보기" 링크

export const GENDER_OPTIONS = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
] as const;

// 출생시간: 2시간 단위 (자시 23~1, 축시 1~3, ... 해시 17~19)
export const BIRTH_TIME_OPTIONS = [
  { value: "unknown", label: "모름" },
  { value: "23-01", label: "자시 (23:00~01:00)" },
  { value: "01-03", label: "축시 (01:00~03:00)" },
  { value: "03-05", label: "인시 (03:00~05:00)" },
  { value: "05-07", label: "묘시 (05:00~07:00)" },
  { value: "07-09", label: "진시 (07:00~09:00)" },
  { value: "09-11", label: "사시 (09:00~11:00)" },
  { value: "11-13", label: "오시 (11:00~13:00)" },
  { value: "13-15", label: "미시 (13:00~15:00)" },
  { value: "15-17", label: "신시 (15:00~17:00)" },
  { value: "17-19", label: "유시 (17:00~19:00)" },
  { value: "19-21", label: "술시 (19:00~21:00)" },
  { value: "21-23", label: "해시 (21:00~23:00)" },
] as const;

export const SITE_NAME = "Fortune Web";
