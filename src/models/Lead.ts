import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    saleName: string;
    status: 'Open' | 'Lost' | 'Sold' | 'Stalled';
    saleDate: Date;
    amount: number;
    stage: string;
    nextActivityDate: Date;
}

const LeadSchema: Schema = new Schema({
    saleName: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Lost', 'Sold', 'Stalled'], default: 'Open' },
    saleDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true, min: 0 },
    stage: { type: String, required: true, trim: true, minlength: 3 },
    nextActivityDate: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
