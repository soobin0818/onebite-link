"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import Toast from "@/components/Toast";

/** 만료됐거나 잘못된 재설정 링크로 들어왔을 때(?error=invalid_link) 안내 토스트를 띄운다 */
export default function InvalidLinkToast() {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const close = useCallback(() => setDismissed(true), []);

  const invalid = searchParams.get("error") === "invalid_link";

  return (
    <Toast
      message={
        invalid && !dismissed
          ? "재설정 링크가 만료됐거나 올바르지 않아요. 링크를 다시 요청해 주세요."
          : null
      }
      onClose={close}
      duration={5000}
    />
  );
}
