
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pingSearchEngines } from '@/lib/ping';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

function getPosts() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch { return []; }
}

function savePosts(posts) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET(request, { params }) {
    const { slug } = await params;
    const posts = getPosts();
    const post = posts.find(p => p.id === slug || p.slug === slug); // Support ID or Slug lookup

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(request, { params }) {
    const { slug } = await params; // Here 'slug' is actually used as ID in edit page usually, but let's support ID lookup
    const body = await request.json();
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === slug);

    if (index === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const oldStatus = posts[index].status;

    // Update fields
    posts[index] = {
        ...posts[index],
        ...body,
        updatedAt: new Date().toISOString()
    };

    savePosts(posts);

    // Ping if status changed to published OR content updated while published
    if ((oldStatus !== 'published' && posts[index].status === 'published') ||
        (posts[index].status === 'published')) {
        await pingSearchEngines(posts[index].slug);
    }

    return NextResponse.json(posts[index]);
}

export async function DELETE(request, { params }) {
    const { slug } = await params;
    let posts = getPosts();
    const filteredPosts = posts.filter(p => p.id !== slug);

    if (posts.length === filteredPosts.length) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    savePosts(filteredPosts);
    return NextResponse.json({ success: true });
}
