import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  sendCodeUser,
  register,
  login,
  sendPosition,
  sendNewPassword,
  patchUser,
  deleteAccount,
  changePassword,
  getMitarbeiter,
  changeRole,
} from '../Controllers/kunde.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

//KundenRouten
router.post('/sendNewPassword', asyncHandler(sendNewPassword));
router.post('/sendCodeRegister', asyncHandler(sendCodeUser));
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.patch('/patchUser/:id', asyncHandler(patchUser));

router.post('/sendPosition', asyncHandler(sendPosition));

router.delete('/deleteAccount/:id', asyncHandler(deleteAccount));

router.patch('/changePassword/:id', asyncHandler(changePassword));

router.get('/getMitarbeiter', asyncHandler(getMitarbeiter));
router.patch('/changeRole/:id', asyncHandler(changeRole));

router.get('/*', (req, res) => res.redirect('/'));

export default router;
