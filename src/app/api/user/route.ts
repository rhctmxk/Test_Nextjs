import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt' // 암호화

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password,  10) // 변경
        },
    })

    // user 객체에서 password 값은 제외
    const { password, ...result } = user
    return new Response(JSON.stringify(result))
}