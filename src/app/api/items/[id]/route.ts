import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple in-memory store.
// In a real application, you would use a database.
let items: { id: number; name: string }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// GET a single item by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const item = items.find((i) => i.id === id);

    if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
}

// PUT (update) an item by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const { name } = await req.json();
    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    items[index] = { ...items[index], name };

    return NextResponse.json(items[index]);
}

// DELETE an item by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const deletedItem = items[index];
    items = items.filter((i) => i.id !== id);

    return NextResponse.json(deletedItem);
}

// A helper function to reset the data (used for testing)
export function resetItems() {
    items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];
}
