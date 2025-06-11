import mongoose, { Schema } from 'mongoose';
import { Call } from '../types';

const CallSchema = new Schema<Call>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    tasks: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        status: { type: String, required: true }
    }]
}, {
    timestamps: true
});

export default mongoose.model<Call>('Call', CallSchema); 