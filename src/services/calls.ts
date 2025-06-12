import { Call } from "@app/types/call";

const API_URL = process.env.API_URL || 'http://localhost:3001/api';

export async function getCallsAPI(): Promise<Call[]> {
    const response = await fetch(`${API_URL}/calls`);
    return response.json();
}

export async function createCallAPI(call: Call): Promise<Call> {
    const response = await fetch(`${API_URL}/calls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ call }),
    });
    return response.json();
}

export async function updateCallAPI(call: Call): Promise<Call> {
    const response = await fetch(`${API_URL}/calls/${call.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ call }),
    });

    if (!response.ok) {
        throw new Error('Failed to update call status');
    }

    return response.json();
}