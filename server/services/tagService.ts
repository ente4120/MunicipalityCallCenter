import TagModel from '../models/Tag';
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
            const existingTag = await TagModel.findById(id);
            if (!existingTag) {
                return null;
            }

            return await TagModel.findByIdAndUpdate(
                id,
                data,
                { 
                    new: true, 
                    runValidators: true,
                    context: 'query'
                }
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