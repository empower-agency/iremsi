import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Sabit credentials
const ADMIN_USERNAME = 'irem';
const ADMIN_PASSWORD = 'Emreirem098';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Basit session token
            const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

            const response = NextResponse.json({ success: true });

            response.cookies.set('admin_session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 saat
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
}

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (session) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
}
