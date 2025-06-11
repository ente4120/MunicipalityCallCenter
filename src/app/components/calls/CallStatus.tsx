import { useState } from 'react';

// TODO
type Status = 'open' | 'in-progress' | 'completed';

interface CallStatusProps {
    currentStatus: Status;
    onStatusChange: (status: Status) => void;
}

const statusDotColors = {
    'open': 'fill-yellow-500',
    'in-progress': 'fill-blue-500',
    'completed': 'fill-green-500',
};

const statusOptions: Status[] = ['open', 'in-progress', 'completed'];

export default function CallStatus({ currentStatus, onStatusChange }: CallStatusProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-md bg-stone-200 font-medium flex items-center gap-2`}
            >
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="6" className={statusDotColors[currentStatus]} />
                </svg>
                {currentStatus}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {statusOptions.map((status) => (
                            <button
                                key={status}
                                onClick={() => {
                                    onStatusChange(status);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2`}
                            >
                                <svg className="w-3 h-3" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="6" className={statusDotColors[status]} />
                                </svg>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 