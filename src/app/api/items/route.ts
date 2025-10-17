import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple in-memory store.
// In a real application, you would use a database.
let items: { id: number; name: string }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];
let nextId = 3;

// GET all items
export async function GET() {
    return NextResponse.json(items);
}

// POST a new item
export async function POST(req: NextRequest) {
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newItem = { id: nextId++, name };
    items.push(newItem);

    return NextResponse.json(newItem, { status: 201 });
}
