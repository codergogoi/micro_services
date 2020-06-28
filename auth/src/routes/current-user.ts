import express from 'express';
import { currentUser, requireAuth } from 'codergogoi-common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  console.log(`Current User request ${req}`);

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
