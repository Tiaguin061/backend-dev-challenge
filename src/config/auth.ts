export const auth = {
  secretKey: process.env.AUTH_PRIVATE_KEY || '*',
  expiresIn: '1d'
};
