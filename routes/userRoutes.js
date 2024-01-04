import express from 'express';
import { 
  test,
  register,
  confirm
} from '../controllers/userController.js';

const router = express.Router(); 

// Public Routes
router.get('/test', test);
router.post('/', register);
router.get('/confirm/:token', confirm);

export default router;
