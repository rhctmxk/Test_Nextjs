// /app/(beforeLogin)/_component/Main.tsx

"use client"
import Image from "next/image";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Main() {
    const { data: session } = useSession();

    return (
        <div className="w-full bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Section: Logo */}
                <div className="flex justify-center">
                    <Image src="/images/nextauth.png" alt="logo" width={200} height={100}/>
                </div>

                {/* Right Section: Content */}
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">Next-Auth 로그인</h1>
                    <h2 className="text-lg text-gray-600">지금 가입하세요.</h2>

                    <Link
                        href="/signup"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                    >
                        계정 만들기
                    </Link>

                    {session?.user ? (
                        <div className="space-y-4">
                            <p className="text-gray-800 text-lg font-semibold">
                                {session.user.name}님 안녕하세요!
                            </p>
                            <button
                                onClick={() => signOut()}
                                className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
                            >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-700">이미 가입하셨나요?</p>
                            <button
                                onClick={() => signIn()}
                                className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
                            >
                                로그인하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}