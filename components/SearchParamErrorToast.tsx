"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import Toast from "@/components/Toast";

type SearchParamErrorToastProps = {
  /** `?error=` 값별로 보여줄 메시지 */
  messages: Record<string, string>;
};

/** 다른 경로에서 실패해 `?error=코드`를 달고 넘어왔을 때 안내 토스트를 띄운다 */
export default function SearchParamErrorToast({
  messages,
}: SearchParamErrorToastProps) {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const close = useCallback(() => setDismissed(true), []);

  const code = searchParams.get("error");
  const message = code ? messages[code] : undefined;

  return (
    <Toast
      message={message && !dismissed ? message : null}
      onClose={close}
      duration={5000}
    />
  );
}
