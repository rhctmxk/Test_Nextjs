// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: '이메일', type: 'text', placeholder: '이메일 주소를 입력해 주세요.' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                })
                const user = await res.json()
                console.log('$$$user: ', user)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }

            },
        }),
        // 카카오 프로바이더
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!
        }),
        // 네이버 프로바이더
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!
        })
    ],
    callbacks:{
        // token 정보와 user 정보를 하나의 object로 return
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            console.log('$$$ token: ', token)
            session.user = token as any;
            console.log('$$$ session: ', session)
            return session;
        },
    },
    // pages:{
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // }
})

export { handler as GET, handler as POST }