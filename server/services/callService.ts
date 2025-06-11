import CallModel from '../models/Call';
import { Call } from '../types';

export class CallService {
    static async getAllCalls(): Promise<Call[]> {
        try {
            return await CallModel.find();
        } catch (error) {
            console.error('Error fetching calls:', error);
            throw new Error('Failed to fetch calls');
        }
    }

    static async createCall(data: Call): Promise<Call> {
        try {
            const newCall = new CallModel({
                id: data.id,
                name: data.name,
                tags: [],
                tasks: []
            });
            return await newCall.save();
        } catch (error) {
            console.error('Error creating call:', error);
            throw new Error('Failed to create call');
        }
    }

    static async updateCall(id: string, data: Partial<Call>): Promise<Call | null> {
        try {
            const existingCall = await CallModel.findOne({ id: id });
            if (!existingCall) {
                return null;
            }
            return await CallModel.findByIdAndUpdate(
                existingCall._id,
                data
            )
        } catch (error) {
            console.error('Error updating call:', error);
            throw new Error('Failed to update call');
        }
    }
} 