"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // 세션 확인 중이면 아무것도 안함
        if (!session) {
            router.push("/auth/signin"); // 로그인 안 되어 있으면 /signin으로 이동
        }
    }, [session, status, router]);

    if (status === "loading" || !session) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">어드민 페이지</h1>
            <p>관리자만 접근 가능한 페이지입니다.</p>
        </div>
    )
}
