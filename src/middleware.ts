import { withAuth } from "next-auth/middleware";

// withAuth를 사용해서, 특정 경로 보호
export default withAuth({
    pages: {
        signIn: '/auth/signin', // 로그인 안 했으면 이동시킬 페이지
    }
});

// 이 미들웨어가 적용될 경로 지정
export const config = {
    matcher: ['/admin/:path*'],  // '/admin' 이하 경로는 모두 로그인 필요
};