import { Call, CallTag, CallTask } from "@/app/types/call";
import NewTaskDialog from "./calls/dialogs/NewTaskDialog";
import { useState } from "react";
import CallTags from "./calls/CallTags";
import CallTasks from "./calls/CallTasks";

export default function MainApp({ call, tags, updateCall }: { call: Call, tags: CallTag[], updateCall: (call: Call) => void}) {
    const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

    const updateTask = (task: CallTask) => {
        const updatedCall = {
            ...call,
            tasks: call.tasks.map((t: CallTask) => t.id === task.id ? task : t)
        }
        updateCall(updatedCall);
    }

    const handleAddTask = (newTask: Omit<CallTask, 'id' | 'createdAt' | 'updatedAt'>) => {
        const task: CallTask = {
            ...newTask,
            id: call.tasks.length + 1,
            status: 'open',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updatedCall = {
            ...call,
            tasks: [...call.tasks, task]
        };
        updateCall(updatedCall);
    };

    const handleTagsChange = (newTags: CallTag[]) => {
        const updatedCall: Call = {
            ...call,
            tags: newTags,
            updatedAt: new Date()
        };
        updateCall(updatedCall);
    };

    if (!call || !tags) {
        return (
            <div className="col-span-4 h-full w-full bg-stone-200 p-4 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    } else {
        return (
            <div className="col-span-4 h-full w-full p-10 bg-zinc-100 rounded-lg flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="text-5xl font-bold">{call.name}</div>
                    <img src="logo.svg" alt="logo" className="w-6 h-6" />
                </div>
                <div className="bg-stone-100 p-4 rounded-lg">
                    <CallTags 
                        selectedTags={call.tags} 
                        tags={tags} 
                        onTagsChange={handleTagsChange}
                    />
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl">Tasks</div>
                    <button 
                        onClick={() => setIsNewTaskDialogOpen(true)}
                        className="bg-violet-600 text-white p-2 rounded-md hover:bg-violet-700"
                    >
                        New Task
                    </button>
                </div>
                <div className="flex flex-col gap-2 rounded-lg">
                    {call.tasks.map((task: CallTask) => (
                        <CallTasks key={task.id} callTask={task} updateCallTask={updateTask} />
                    ))}
                </div>

                <NewTaskDialog
                    isOpen={isNewTaskDialogOpen}
                    onClose={() => setIsNewTaskDialogOpen(false)}
                    onAdd={handleAddTask}
                />
            </div>
        );
    }
}
  