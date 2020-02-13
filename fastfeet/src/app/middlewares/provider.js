export default async (req, res, next) => {
  const { provider } = req;

  if (!provider) {
    return res.status(403).json({ error: 'You doest not have permission.' });
  }

  return next();
};
