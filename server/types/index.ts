import { Document, Types } from 'mongoose';

export interface CallTag extends Document {
    name: string;
    color: string;
    tasks: CallTask[];
}

export interface CallTask {
    id: number;
    name: string;
    completed: boolean;
    status: 'open' | 'in-progress' | 'completed';
}

export interface Call extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Types.ObjectId[];
    tasks: CallTask[];
} 