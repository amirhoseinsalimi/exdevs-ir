import * as express from 'express';

import authenticate from '../../middleware/authenticate';

import MessageRepository from '../../repository/MessageRepository';
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const messages = await MessageRepository.find();

    res.status(200).json(messages);
  } catch {
    res.status(500).render('500');
  }
});

router.get('/:id', authenticate, async (req, res) => {
  const { id: messageId } = req.params;

  if (!Number(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    const message = await MessageRepository.findOne({
      where: {
        id: Number(messageId)
      }
    });

    res.status(200).json(message);
  } catch {
    res.status(500).render('500');
  }
});

router.post('/', async (req, res) => {
  try {
    await MessageRepository.save(req.body);

    res.status(200);
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { id: messageId } = req.params;

  if (!/^\d+$/.test(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    await MessageRepository.update(Number(messageId), { isRead: true });

    res.status(204).end();
  } catch {
    res.status(500).render('500');
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id: messageId } = req.params;

  if (!/^\d+$/.test(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    await MessageRepository.delete(Number(messageId));

    res.status(204).end();
  } catch {
    res.status(500).render('500');
  }
});

export default router;
