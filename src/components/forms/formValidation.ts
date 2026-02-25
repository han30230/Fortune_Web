import type { FortuneFormValues } from "@/types/fortune";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateString(str: string): boolean {
  if (!DATE_REGEX.test(str)) return false;
  const d = new Date(str);
  return !Number.isNaN(d.getTime());
}

function isNotFutureDate(str: string): boolean {
  const d = new Date(str);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return d.getTime() <= today.getTime();
}

export interface FormErrors {
  birthDate?: string;
  gender?: string;
}

export function validateFortuneForm(values: Partial<FortuneFormValues>): FormErrors {
  const errors: FormErrors = {};

  if (!values.gender?.trim()) {
    errors.gender = "성별을 선택해 주세요.";
  }

  if (!values.birthDate?.trim()) {
    errors.birthDate = "생년월일을 입력해 주세요.";
  } else if (!isValidDateString(values.birthDate)) {
    errors.birthDate = "올바른 날짜 형식(YYYY-MM-DD)으로 입력해 주세요.";
  } else if (!isNotFutureDate(values.birthDate)) {
    errors.birthDate = "미래 날짜는 선택할 수 없습니다.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
