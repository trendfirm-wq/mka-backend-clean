const { AccessToken } = require('livekit-server-sdk');

function createLiveKitToken({ room, userId, canPublish }) {
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: userId }
  );
console.log(
  'LIVEKIT ENV:',
  !!process.env.LIVEKIT_API_KEY,
  !!process.env.LIVEKIT_API_SECRET
);

  at.addGrant({
    room,
    roomJoin: true,
    canPublish,
    canSubscribe: true,
  });

  return at.toJwt();
}

module.exports = { createLiveKitToken };
