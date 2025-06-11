import { CallTag } from "@/app/types/call";
import { useState } from "react";

interface CallTagsProps {
    selectedTags: CallTag[];
    tags: CallTag[];
    onTagsChange?: (tags: CallTag[]) => void;
}

export default function CallTags({ selectedTags, tags, onTagsChange }: CallTagsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAddTag = (tag: CallTag) => {
        if (!onTagsChange) return;
        if (!selectedTags.some(t => t.id === tag.id)) {
            onTagsChange([...selectedTags, tag]);
        }
        setIsOpen(false);
    };

    const handleRemoveTag = (tagToRemove: CallTag) => {
        if (!onTagsChange) return;
        onTagsChange(selectedTags.filter(tag => tag.id !== tagToRemove.id));
    };

    const availableTags = tags.filter(tag => !selectedTags.some(t => t.id === tag.id));

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 flex-wrap">
                {selectedTags.map((tag) => (
                    <div 
                        key={tag.id} 
                        className="bg-violet-400 text-white px-3 py-1 rounded-md flex items-center gap-2"
                    >
                        <span>{tag.name}</span>
                        {onTagsChange && (
                            <button 
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-violet-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
                {onTagsChange && availableTags.length > 0 && (
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Tag</span>
                        </button>
                        {isOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                    {availableTags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            onClick={() => handleAddTag(tag)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}