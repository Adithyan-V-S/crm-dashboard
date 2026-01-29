import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}
