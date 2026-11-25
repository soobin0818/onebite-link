"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type AuthStateSyncProps = {
  /** 서버가 이 화면을 그릴 때의 로그인 사용자 아이디 */
  userId: string;
};

/**
 * 로그인 계정이 바뀌면(다른 탭에서 로그아웃·다른 계정으로 로그인 등) 서버 데이터를 처음부터 다시 불러온다.
 * 새로 그려진 로더는 바뀐 사용자 아이디를 key로 Provider를 새로 만들어, 이전 계정의 데이터가 남지 않는다.
 * 로그아웃 상태가 되면 다시 불러오는 과정에서 proxy가 로그인 페이지로 보낸다.
 */
export default function AuthStateSync({ userId }: AuthStateSyncProps) {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = createClient().auth.onAuthStateChange((_event, session) => {
      const currentUserId = session?.user.id ?? null;
      if (currentUserId !== userId) router.refresh();
    });
    return () => subscription.unsubscribe();
  }, [userId, router]);

  return null;
}
