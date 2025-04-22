// http://localhost:3000/api/auth/signin 주소 이동 시, 기본 로그인폼 이동
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        // ID, PW 로그인 방식
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jaehan' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

                if (user) {
                    return user
                } else {
                    return null

                }
            },
        }),
    ],
})

export { handler as GET, handler as POST }