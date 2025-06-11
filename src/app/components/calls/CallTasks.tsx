import { Task } from "@/types/tasks";
import CallStatus from "./CallStatus";

export default function CallTask({ task, updateTask }: { task: Task, updateTask: (task: Task) => void}) {
    return (
        <div className="flex flex-row justify-between items-center gap-2 border-2 border-stone-100 bg-violet-400 hover:bg-violet-600 p-8 rounded-lg">
            <span>{task.name}</span>
            <CallStatus 
                    currentStatus={task.status} 
                    onStatusChange={(newStatus) => {
                        task.status = newStatus;
                        updateTask(task);
                    }} 
                />
        </div>
    );
}
  