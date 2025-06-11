"use client";

import Sidebar from "@components/Sidebar";
import MainApp from "@components/MainApp";
import { Call, CallTag } from "@app/types/call";
import { useEffect, useState } from "react";
import { getCallsAPI, updateCallAPI } from "@services/calls";
import { getTagsAPI } from "@services/tags";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [tags, setTags] = useState<CallTag[]>([]);
 
  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const [callsData, tagsData] = await Promise.all([
        getCallsAPI(),
        getTagsAPI()
      ]);

      if (callsData) {
        setSelectedCall(callsData[0]);
        setCalls(callsData);
      }

      if (tagsData) {
        setTags(tagsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const updateCall = async (call: Call) => {
    setSelectedCall(call);
    setCalls(calls.map((c: Call) => c.id === call.id ? call : c));
    await updateCallAPI(call);
    await updateCallsList();
  }

  const updateCallsList = async () => {
    const updatedCalls = await getCallsAPI();
    setCalls(updatedCalls);
  }

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-4 p-4 h-screen">
      <Sidebar calls={calls} setSelectedCall={setSelectedCall} updateCallsList={updateCallsList} />
      {selectedCall && <MainApp call={selectedCall} tags={tags} updateCall={updateCall} />}
    </div>
  );
}
