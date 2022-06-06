import express from 'express';

const router = express.Router({ mergeParams: true });

router.use(express.json());
router.use((req, res, next) => {
  // TODO: any logging/auth etc

  console.info(`${req.method}: ${req.url}`);
  
  next();
});

export default router;
