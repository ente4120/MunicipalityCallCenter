'use client';

import { useState, useEffect } from 'react';
import { getTagsAPI, createTagAPI, updateTagAPI } from '@/services/tags';
import { CallTag } from '@/app/types/call';

export default function AdminPage() {
    const [tags, setTags] = useState<CallTag[]>([]);
    const [newTag, setNewTag] = useState<CallTag>({ id: 0, name: '' });
    const [editingTag, setEditingTag] = useState<CallTag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const data = await getTagsAPI();
            setTags(data);
            setError(null);
            console.log('length', data.length);
            setNewTag({ id: data.length + 1, name: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTag.name) return;

        try {
            await createTagAPI(newTag);
            await  fetchTags();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add tag');
        }
    };

    const handleUpdateTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTag) return;

        try {
            const updatedTag = await updateTagAPI(editingTag);
            
            setTags(tags.map(tag => 
                tag.id === updatedTag.id ? updatedTag : tag
            ));
            setEditingTag(null);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update tag');
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Tag Management</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Add New Tag Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Tag</h2>
                <form onSubmit={handleAddTag} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={newTag.name}
                            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Tag
                    </button>
                </form>
            </div>

            {/* Tags List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Existing Tags</h2>
                <div className="space-y-4">
                    {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center justify-between p-4 border rounded-lg">
                            {editingTag?.id === tag.id ? (
                                <form onSubmit={handleUpdateTag} className="flex-1 flex items-center space-x-4">
                                    <input
                                        type="text"
                                        value={editingTag.name}
                                        onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingTag(null)}
                                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-lg">{tag.name}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setEditingTag(tag)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
