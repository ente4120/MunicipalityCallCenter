import { Call } from "@/app/types/call";
import { useState } from "react";
import NewCallDialog from "./calls/dialogs/NewCallDialog";
import { createCallAPI } from "@/services/calls";

export default function Sidebar({ calls, setSelectedCall, updateCallsList }: { calls: Call[], setSelectedCall: (call: Call) => void, updateCallsList: () => void }) {
  const [isNewCallDialogOpen, setIsNewCallDialogOpen] = useState(false);

  const handleAddCall = async (newCall: Omit<Call, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'tags'>) => {
    const call: Call = {
      ...newCall,
      id: calls.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: [],
      tags: []
    };
    setSelectedCall(call);
    await createCallAPI(call);
    updateCallsList();
  };

  return (
    <div className="flex flex-col h-full w-full p-4 gap-8">
      <div className="flex flex-col justify-center items-center mb-7 gap-4">
        <img src="/logo.svg" alt="logo" className="w-30 h-30" />
        <span className="text-2xl font-bold">Municipal Call Center</span>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>Calls</span>
        <button 
          onClick={() => setIsNewCallDialogOpen(true)}
          className="bg-violet-600 text-white p-2 rounded-md hover:bg-violet-700"
        >
          New Call
        </button>
      </div>
      {calls.map((call) => (
        <div key={call.id} onClick={() => setSelectedCall(call)} className="text-center text-white cursor-pointer bg-violet-400 p-2 rounded-md hover:bg-violet-900">
          <span>{call.name}</span>
        </div>
      ))}

      <NewCallDialog
        isOpen={isNewCallDialogOpen}
        onClose={() => setIsNewCallDialogOpen(false)}
        onAdd={handleAddCall}
      />
    </div>
  );
}
