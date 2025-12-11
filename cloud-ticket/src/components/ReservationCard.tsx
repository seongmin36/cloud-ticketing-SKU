"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ERROR_MESSAGES } from "@/mocks/event";
import { validateEmail, validateName } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import ReservationItem from "./ReservationItem";
import { ReservationFormValues, FormErrors } from "@/types";
import { useCreateReservation } from "@/app/hooks/useCreateReservation";

// 예약 카드 컴포넌트
export default function ReservationCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventParams = Number(searchParams.get("event_id"));

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [formValues, setFormValues] = useState<ReservationFormValues>({
    name: "",
    email: "",
  });

  // TanStack Query mutation 사용
  const createReservation = useCreateReservation();

  // event_id가 변경되면 로그 출력
  useEffect(() => {
    console.log("URL 파라미터:", {
      event_id: searchParams.get("event_id"),
      "최종 eventParams": eventParams,
    });
  }, [eventParams, searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateName(formValues.name)) {
      newErrors.name = ERROR_MESSAGES.nameRequired;
    }

    if (!formValues.email) {
      newErrors.email = ERROR_MESSAGES.emailRequired;
    } else if (!validateEmail(formValues.email)) {
      newErrors.email = ERROR_MESSAGES.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 예약 요청 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    if (!validateForm()) {
      return;
    }

    // TanStack Query mutation 실행
    createReservation.mutate(
      {
        event_id: eventParams,
        name: formValues.name,
        email: formValues.email,
      },
      {
        onSuccess: (data) => {
          const params = new URLSearchParams({
            name: formValues.name,
            email: formValues.email,
            event_id: String(eventParams),
            order_id: data.order_id,
          });

          router.push(`${ROUTES.WAITING}?${params.toString()}`);
        },
        onError: () => {
          setErrors({ submit: ERROR_MESSAGES.submitError });
        },
      }
    );
  };

  const handleInputChange =
    (field: keyof ReservationFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // 입력 시 해당 필드 에러 초기화
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  return (
    <div className="w-full max-w-[448px] bg-white rounded-[14px] border border-[#E5E5E5] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <ReservationItem
        eventId={eventParams}
        handleSubmit={handleSubmit}
        successMessage={successMessage}
        errors={errors}
        formValues={formValues}
        isSubmitting={createReservation.isPending}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
