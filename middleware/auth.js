const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log('❌ No Authorization header');
      return res.status(401).json({ message: 'No token provided' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('❌ Invalid auth header format:', authHeader);
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];
    console.log('✅ Token received:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    // ✅ STANDARD SHAPE — THIS IS CRITICAL
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error('❌ AUTH VERIFY FAILED:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
