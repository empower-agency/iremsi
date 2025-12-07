
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { pingSearchEngines } from '@/lib/ping';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Helper to read posts
function getPosts() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        console.error('Error reading blog posts:', e);
        return [];
    }
}

// Helper to save posts
function savePosts(posts) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('File Write Error:', error);
        // Throw simple error to be caught by API handler
        throw new Error('Dosya sistemine yazılamadı. Vercel/Production ortamında yerel dosyaya kayıt yapılamaz. Veritabanı gereklidir.');
    }
}

export async function GET() {
    return NextResponse.json(getPosts());
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Validation
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: 'Başlık ve URL (slug) zorunludur.' }, { status: 400 });
        }

        const posts = getPosts();

        // Check for duplicate slug
        if (posts.find(p => p.slug === body.slug)) {
            return NextResponse.json({ error: 'Bu URL (slug) zaten kullanılıyor. Lütfen başlığı değiştirin.' }, { status: 400 });
        }

        const newPost = {
            id: uuidv4(),
            title: body.title,
            slug: body.slug,
            content: body.content || '',
            excerpt: body.excerpt || '',
            featuredImage: body.featuredImage || null,
            seo: {
                title: body.seo?.title || body.title,
                description: body.seo?.description || '',
                keywords: body.seo?.keywords || ''
            },
            status: body.status || 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Try to save
        posts.unshift(newPost);
        savePosts(posts);

        // Ping search engines if published immediately
        if (newPost.status === 'published') {
            // Non-blocking ping
            pingSearchEngines(newPost.slug).catch(err => console.error('Ping Error:', err));
        }

        return NextResponse.json(newPost);

    } catch (error) {
        console.error('Blog API Error:', error);
        // Return friendly error message
        return NextResponse.json(
            { error: error.message || 'Sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}
