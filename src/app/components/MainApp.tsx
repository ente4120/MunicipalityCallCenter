import { Call } from "@/types/calls";
import { CallTag } from "@/types/index";
import { Task } from "@/types/tasks";
import CallTask from "./calls/CallTasks";
import NewTaskDialog from "./calls/dialogs/NewTaskDialog";
import { useState } from "react";
import CallTags from "./calls/CallTags";

export default function MainApp({ call, tags, updateCall }: { call: Call, tags: CallTag[], updateCall: (call: Call) => void}) {
    const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

    const updateTask = (task: Task) => {
        const updatedCall = {
            ...call,
            tasks: call.tasks.map((t: Task) => t.id === task.id ? task : t)
        }
        updateCall(updatedCall);
    }

    const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        const task: Task = {
            ...newTask,
            id: call.tasks.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const updatedCall = {
            ...call,
            tasks: [...call.tasks, task]
        };
        updateCall(updatedCall);
    };

    const handleTagsChange = (newTags: CallTag[]) => {
        const updatedCall = {
            ...call,
            tags: newTags,
            updatedAt: new Date().toISOString()
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
                    {call.tasks.map((task: Task) => (
                        <CallTask key={task.id} task={task} updateTask={updateTask} />
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
  