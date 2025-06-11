import { useState } from 'react';
import { Call } from '@/app/types/call';

interface NewCallDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (call: Omit<Call, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'tags'>) => void;
}

export default function NewCallDialog({ isOpen, onClose, onAdd }: NewCallDialogProps) {
    const [callName, setCallName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (callName) {
            onAdd({
                name: callName,
            });
            setCallName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New Call</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="callName" className="block text-sm font-medium text-gray-700 mb-2">
                            Call Name
                        </label>
                        <input
                            type="text"
                            id="callName"
                            value={callName}
                            onChange={(e) => setCallName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="Enter call name"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700"
                        >
                            Add Call
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 