// /(beforeLogin)/_component/LoginModal.tsx
"use client";

// import style from '@/app/(beforeLogin)/_component/login.module.css';
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const result = await signIn("credentials", {
            username: email,
            password: password,
            redirect: true,
            callbackUrl: "/",
        });
    }

    const onClickClose = () => {
        router.back();
    };

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={onClickClose}
                >
                    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                            <path
                                d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </button>

                {/* 타이틀 */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인하세요.</h2>

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                아이디
                            </label>
                            <input
                                id="id"
                                type="text"
                                value={email}
                                onChange={onChangeId}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="이메일을 입력하세요"
                                autoComplete="off"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="비밀번호를 입력하세요"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md text-white font-semibold 
                                ${email && password ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
                            `}
                            disabled={!email || !password}
                        >
                            로그인하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}