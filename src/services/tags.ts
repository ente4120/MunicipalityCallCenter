import { CallTag } from "@/app/types/call";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getTagsAPI = async (): Promise<CallTag[]> => {
    try {
        const response = await fetch(`${API_URL}/tags`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
};

export const getTagByIdAPI = async (id: string): Promise<CallTag> => {
    try {
        const response = await fetch(`${API_URL}/tags/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch tag');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tag:', error);
        throw error;
    }
};

export const updateTagAPI = async (tag: CallTag): Promise<CallTag> => {
    try {
        const response = await fetch(`${API_URL}/tags/${tag.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update tag');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating tag:', error);
        throw error;
    }
};

export const createTagAPI = async (tag: Omit<CallTag, 'id'>): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/tags`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create tag');
        }
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
};

export const deleteTagAPI = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/tags/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete tag');
        }
    } catch (error) {
        console.error('Error deleting tag:', error);
        throw error;
    }
}; 