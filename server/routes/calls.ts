import { Router, Request, Response } from 'express';
import { CallService } from '../services/callService';

const router = Router();

// GET /api/calls
router.get('/', async (_, res: Response) => {
    try {
        const calls = await CallService.getAllCalls();
        return res.json(calls);
    } catch (error) {
        console.error('Error in GET /api/calls:', error);
        return res.status(500).json({ error: 'Failed to fetch calls' });
    }
});

// POST /api/calls
router.post('/', async (req: Request, res: Response) => {
    try {
        const { call } = req.body;
        if (!call) {
            return res.status(400).json({ error: 'Object call is required' });
        }
        const newCall = await CallService.createCall(call);
        return res.status(201).json(newCall);
    } catch (error) {
        console.error('Error in POST /api/calls:', error);
        return res.status(500).json({ error: 'Failed to create call' });
    }
});

// PUT /api/calls/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { call } = req.body;
        if (!call) {
            return res.status(400).json({ error: 'Object call is required' });
        }
        const updatedCall = await CallService.updateCall(req.params.id, call);
        
        if (!updatedCall) {
            return res.status(404).json({ error: 'Call not found' });
        }
        
        return res.json(updatedCall);
    } catch (error) {
        console.error('Error in PUT /api/calls/:id:', error);
        return res.status(500).json({ error: 'Failed to update call' });
    }
});

export const callsRouter = router; 