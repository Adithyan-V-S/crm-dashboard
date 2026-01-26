import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '5');
        const skip = (page - 1) * limit;

        const leads = await Lead.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Lead.countDocuments();

        return NextResponse.json({
            leads,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Basic validation
        const { saleName, amount, stage, nextActivityDate } = body;
        if (!saleName || !amount || !stage || !nextActivityDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const lead = await Lead.create(body);
        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}
