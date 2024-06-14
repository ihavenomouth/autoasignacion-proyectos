import express from 'express';
const router = express.Router();

import loginController from '../controllers/LoginController.js';

router.route('/login')
  .post( loginController.postLogin )
;

export default router;