import { Router } from 'express';
const router = Router();

import {
  renderSignUpForm,
  renderSigninForm,
  logout,
  signin,
  signup,
} from '../controllers/users.controller.js';

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

export default router;
