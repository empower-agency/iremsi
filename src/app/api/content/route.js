import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'service-content.json');

// Yardımcı fonksiyon: Veri dosyasını oku
function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Veri okuma hatası:', error);
    }
    return {};
}

// Yardımcı fonksiyon: Veri dosyasına yaz
function writeData(data) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Veri yazma hatası:', error);
        return false;
    }
}

// Auth kontrolü
async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session');
}

// GET: Hizmet içeriğini oku
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 });
    }

    const data = readData();
    const content = data[slug] || '';

    return NextResponse.json({ content });
}

// POST: Hizmet içeriğini kaydet
export async function POST(request) {
    // Auth kontrolü
    const session = await checkAuth();
    if (!session) {
        return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    try {
        const { slug, content } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: 'Slug gerekli' }, { status: 400 });
        }

        const data = readData();
        data[slug] = content;

        if (writeData(data)) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Kaydetme hatası' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
