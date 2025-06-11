import TagModel from '../models/Tag';
import CallModel from '../models/Call';
import { CallTag } from '../types';

const DEFAULT_TAGS = [
    { id: 1, name: "Emergency", color: "orange", tasks: [] },
    { id: 2, name: "Fire Department", color: "red", tasks: [] },
    { id: 3, name: "Gas", color: "blue", tasks: [] }
] as const;

export class TagService {
    static async initializeDefaultTags(): Promise<void> {
        try {
            const count = await TagModel.countDocuments();
            if (count === 0) {
                await TagModel.insertMany(DEFAULT_TAGS);
                console.log('Default tags initialized');
            }
        } catch (error) {
            console.error('Error initializing default tags:', error);
            throw new Error('Failed to initialize default tags');
        }
    }

    static async getAllTags(): Promise<CallTag[]> {
        try {
            await this.initializeDefaultTags();
            return await TagModel.find();
        } catch (error) {
            console.error('Error fetching tags:', error);
            throw new Error('Failed to fetch tags');
        }
    }

    static async updateTag(id: string, data: { name?: string; color?: string }): Promise<CallTag | null> {
        try {
            const existingTag = await TagModel.findOne({ id: id });
            if (!existingTag) {
                return null;
            }

            // If name is being updated, update all calls that use this tag
            if (data.name && data.name !== existingTag.name) {
                await CallModel.updateMany(
                    { 'tags.id': id },
                    { $set: { 'tags.$.name': data.name } }
                );
            }

            return await TagModel.findByIdAndUpdate(
                existingTag._id,
                data,
            );
        } catch (error) {
            console.error('Error updating tag:', error);
            throw new Error('Failed to update tag');
        }
    }

    static async createTag(data: { id: number, name: string;}): Promise<CallTag> {
        try {
            const newTag = new TagModel({
                id: data.id,
                name: data.name,
            });
            return await newTag.save();
        } catch (error) {
            console.error('Error creating tag:', error);
            throw new Error('Failed to create tag');
        }
    }
} 