import { Router, Request, Response } from 'express';
import { TagService } from '../services/tagService';

const router = Router();

// GET /api/tags
router.get('/', async (_, res: Response) => {
    try {
        const tags = await TagService.getAllTags();
        return res.json(tags);
    } catch (error) {
        console.error('Error in GET /api/tags:', error);
        return res.status(500).json({ error: 'Failed to fetch tags' });
    }
});

// PUT /api/tags/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { name, color } = req.body;
        if (!name && !color) {
            return res.status(400).json({ error: 'At least one field (name or color) is required' });
        }
        const updatedTag = await TagService.updateTag(req.params.id, { name, color });
        
        if (!updatedTag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        
        return res.json(updatedTag);
    } catch (error) {
        console.error('Error in PUT /api/tags/:id:', error);
        return res.status(500).json({ error: 'Failed to update tag' });
    }
});

// POST /api/tags
router.post('/', async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ error: 'Both id and name are required' });
        }
        const newTag = await TagService.createTag({ id, name });
        return res.status(201).json(newTag);
    } catch (error) {
        console.error('Error in POST /api/tags:', error);
        return res.status(500).json({ error: 'Failed to create tag' });
    }
});

export const tagsRouter = router; 