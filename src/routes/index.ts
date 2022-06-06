import express from 'express';

const router = express.Router();

// Root/Health Check

router.get('/', (req, res) => {
  res.sendStatus(200);
});

export default router;
