const express = require('express');
const router = express.Router();
const db = require('../firebase');

router.get('/', async (req, res) => {
  const snapshot = await db.collection('messages').orderBy('timestamp', 'desc').get();
  const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(messages);
});

router.post('/', async (req, res) => {
  const { username, message } = req.body;
  const data = { username, message, timestamp: new Date() };
  const docRef = await db.collection('messages').add(data);
  res.status(201).send({ id: docRef.id, ...data });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('messages').doc(id).update(req.body);
  res.send({ id, ...req.body });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('messages').doc(id).delete();
  res.status(204).send();
});

module.exports = router;