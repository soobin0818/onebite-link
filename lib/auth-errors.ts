import type { AuthError } from "@supabase/supabase-js";

// Supabase Auth 오류 코드를 사용자에게 보여줄 한국어 메시지로 바꾼다
const MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일이에요.",
  email_exists: "이미 가입된 이메일이에요.",
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  signup_disabled: "현재 회원가입을 할 수 없어요.",
  email_provider_disabled: "현재 이메일로 회원가입을 할 수 없어요.",
  over_email_send_rate_limit:
    "인증 메일 요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
};

export function toKoreanAuthError(error: AuthError): string {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  return "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.";
}
