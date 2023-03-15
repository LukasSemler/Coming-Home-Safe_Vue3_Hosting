import rateLimiter from 'express-rate-limit';

export default rateLimiter({
  max: 5,
  windowMS: 5 * 1000,
  message: 'You made too many requests. Try later!',
  standardHeaders: true,
});
