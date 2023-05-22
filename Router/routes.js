import express from 'express';
import rateLimiter from '../Middleware/rateLimiter.js';
import routeCache from "route-cache"
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
router.post('/sendNewPassword', rateLimiter, asyncHandler(sendNewPassword));
router.post('/sendCodeRegister', rateLimiter, asyncHandler(sendCodeUser));
router.post('/register', rateLimiter, asyncHandler(register));
router.post('/login', rateLimiter, routeCache.cacheSeconds(20),asyncHandler(login));

router.post('/sendPosition', asyncHandler(sendPosition));

router.delete('/deleteAccount/:id', rateLimiter, asyncHandler(deleteAccount));

router.patch('/changePassword/:id', rateLimiter, asyncHandler(changePassword));
router.patch('/patchUser/:id', asyncHandler(patchUser));
router.patch('/changeRole/:id', rateLimiter, asyncHandler(changeRole));

router.get('/getMitarbeiter', rateLimiter,routeCache.cacheSeconds(20), asyncHandler(getMitarbeiter));

router.get('/*', routeCache.cacheSeconds(20),(req, res) => res.redirect('/'));

export default router;
