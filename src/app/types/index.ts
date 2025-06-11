export interface Call {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tags: CallTag[];
    tasks: CallTask[];
}

export interface CallTag {
    id: string;
    name: string;
    tasks: CallTask[];
}

export interface CallTask {
    id: string;
    description: string;
    status: 'open' | 'in-progress'| 'completed';
    createdAt: Date;
    updatedAt: Date;
}