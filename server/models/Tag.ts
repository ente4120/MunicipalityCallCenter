import mongoose, { Schema } from 'mongoose';
import { CallTag } from '../types';

const TagSchema = new Schema<CallTag>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model<CallTag>('Tag', TagSchema); 