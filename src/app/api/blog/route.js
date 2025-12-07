
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET() {
    return NextResponse.json(getPosts());
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Validation
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
        }

        const posts = getPosts();

        // Check for duplicate slug
        // logic for editing vs creating might be needed here if PUT is separate. 
        // But this is POST (create new). Check duplicate.
        if (posts.find(p => p.slug === body.slug)) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
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
            status: body.status || 'draft', // draft | published
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        posts.unshift(newPost);
        savePosts(posts);

        // Ping search engines if published immediately
        if (newPost.status === 'published') {
            await pingSearchEngines(newPost.slug);
        }

        return NextResponse.json(newPost);

    } catch (error) {
        console.error('Blog API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
