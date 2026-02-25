export const logger = ((req, res, next) => {
  console.log(`Method: ${req.method} Request: ${req.url}`);
  next();
});
