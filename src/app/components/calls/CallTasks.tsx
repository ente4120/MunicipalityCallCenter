import { CallTask } from "@/app/types/call";
import CallStatus from "./CallStatus";

export default function CallCallTask({ callTask, updateCallTask }: { callTask: CallTask, updateCallTask: (callTask: CallTask) => void}) {
    return (
        <div className="flex flex-row justify-between items-center gap-2 border-2 border-stone-100 bg-violet-400 hover:bg-violet-600 p-8 rounded-lg">
            <span>{callTask.name}</span>
            <CallStatus 
                    currentStatus={callTask.status} 
                    onStatusChange={(newStatus) => {
                        callTask.status = newStatus;
                        updateCallTask(callTask);
                    }} 
                />
        </div>
    );
}
  