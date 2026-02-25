"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FortuneFormProps, FortuneFormValues } from "@/types/fortune";
import { validateFortuneForm, hasErrors, type FormErrors } from "./formValidation";
import { GENDER_OPTIONS, BIRTH_TIME_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const RESULT_ANCHOR_ID = "result";

function getDefaultValues(searchParams: URLSearchParams): Partial<FortuneFormValues> {
  const birth = searchParams.get("birth") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const lunar = searchParams.get("lunar");
  const time = searchParams.get("time") ?? "unknown";
  return {
    name: "",
    gender: gender || undefined,
    birthDate: birth || "",
    isLunar: lunar === "1",
    birthTime: time || "unknown",
    birthPlace: "",
  };
}

function buildQueryString(values: FortuneFormValues): string {
  const params = new URLSearchParams();
  if (values.birthDate) params.set("birth", values.birthDate);
  if (values.gender) params.set("gender", values.gender);
  params.set("lunar", values.isLunar ? "1" : "0");
  if (values.birthTime && values.birthTime !== "unknown") {
    params.set("time", values.birthTime);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function FortuneForm({ serviceId, onSuccess }: FortuneFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [values, setValues] = useState<FortuneFormValues>({
    name: "",
    gender: "",
    birthDate: "",
    isLunar: false,
    birthTime: "unknown",
    birthPlace: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const updateFromUrl = useCallback(() => {
    const defaults = getDefaultValues(searchParams);
    setValues((prev) => ({
      ...prev,
      gender: defaults.gender ?? prev.gender,
      birthDate: defaults.birthDate ?? prev.birthDate,
      isLunar: defaults.isLunar ?? prev.isLunar,
      birthTime: (defaults.birthTime as FortuneFormValues["birthTime"]) ?? prev.birthTime,
    }));
  }, [searchParams]);

  useEffect(() => {
    updateFromUrl();
  }, [updateFromUrl]);

  function handleChange<K extends keyof FortuneFormValues>(
    key: K,
    value: FortuneFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ gender: true, birthDate: true });
    const errs = validateFortuneForm(values);
    setErrors(errs);
    if (hasErrors(errs)) return;

    const safeValues: FortuneFormValues = {
      ...values,
      gender: values.gender,
      birthDate: values.birthDate,
    };
    const qs = buildQueryString(safeValues);
    const path = `/${serviceId}${qs}`;
    router.replace(path);
    onSuccess?.(safeValues);
    document.getElementById(RESULT_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="운세 입력 폼">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fortune-name">이름 / 닉네임 (선택)</Label>
          <Input
            id="fortune-name"
            type="text"
            placeholder="예: 홍길동"
            value={values.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-describedby={undefined}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fortune-gender">
            성별 <span className="text-destructive" aria-hidden>*</span>
          </Label>
          <Select
            value={values.gender || ""}
            onValueChange={(v) => handleChange("gender", v)}
            required
            aria-required="true"
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? "gender-error" : undefined}
          >
            <SelectTrigger id="fortune-gender" onBlur={() => handleBlur("gender")}>
              <SelectValue placeholder="선택해 주세요" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p id="gender-error" className="text-sm text-destructive" role="alert">
              {errors.gender}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fortune-birth">
          생년월일 <span className="text-destructive" aria-hidden>*</span>
        </Label>
        <Input
          id="fortune-birth"
          type="date"
          value={values.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          onBlur={() => handleBlur("birthDate")}
          required
          aria-required="true"
          aria-invalid={!!errors.birthDate}
          aria-describedby={errors.birthDate ? "birth-error" : undefined}
        />
        {errors.birthDate && (
          <p id="birth-error" className="text-sm text-destructive" role="alert">
            {errors.birthDate}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="fortune-lunar" className="cursor-pointer">
          음력
        </Label>
        <Switch
          id="fortune-lunar"
          checked={values.isLunar}
          onCheckedChange={(v) => handleChange("isLunar", v)}
          aria-label="음력 여부"
        />
        <span className="text-sm text-muted-foreground">
          {values.isLunar ? "음력" : "양력"}
        </span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fortune-time">출생시간 (선택)</Label>
        <Select
          value={values.birthTime ?? "unknown"}
          onValueChange={(v) => handleChange("birthTime", v as FortuneFormValues["birthTime"])}
        >
          <SelectTrigger id="fortune-time">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BIRTH_TIME_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fortune-place">출생지 (선택)</Label>
        <Input
          id="fortune-place"
          type="text"
          placeholder="예: 서울특별시"
          value={values.birthPlace ?? ""}
          onChange={(e) => handleChange("birthPlace", e.target.value)}
          onBlur={() => handleBlur("birthPlace")}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" aria-label="입력한 내용으로 결과 보기">
        결과 보기
      </Button>
    </form>
  );
}
