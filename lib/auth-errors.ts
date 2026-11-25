import type { AuthError } from "@supabase/supabase-js";

// Supabase Auth 오류 코드를 사용자에게 보여줄 한국어 메시지로 바꾼다
const MESSAGES: Record<string, string> = {
  // 로그인
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않아요.",
  email_not_confirmed: "이메일 인증이 완료되지 않았어요. 메일함을 확인해 주세요.",
  user_banned: "이용이 제한된 계정이에요.",
  // 회원가입
  user_already_exists: "이미 가입된 이메일이에요.",
  email_exists: "이미 가입된 이메일이에요.",
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  signup_disabled: "현재 회원가입을 할 수 없어요.",
  email_provider_disabled: "현재 이메일로 회원가입을 할 수 없어요.",
  over_email_send_rate_limit:
    "인증 메일 요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  // 비밀번호 재설정
  same_password: "새 비밀번호가 기존 비밀번호와 같아요. 다른 비밀번호를 입력해 주세요.",
  session_not_found:
    "재설정 링크가 만료됐어요. 비밀번호 찾기를 다시 진행해 주세요.",
  // 공통
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
};

/** 오류 코드에 맞는 한국어 메시지를 돌려주고, 모르는 코드면 fallback을 쓴다 */
export function toKoreanAuthError(error: AuthError, fallback: string): string {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  return fallback;
}
