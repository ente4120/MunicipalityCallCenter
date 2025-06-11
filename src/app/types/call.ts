export interface Call {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tags: CallTag[];
    tasks: CallTask[];
}

export interface CallTag {
    id: number;
    name: string;
}

export interface CallTask {
    id: number;
    name: string;
    status: 'open' | 'in-progress'| 'completed';
    createdAt: Date;
    updatedAt: Date;
}