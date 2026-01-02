const axios = require('axios');

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';

async function createLiveInput() {
  const res = await axios.post(
    `${CLOUDFLARE_API}/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      meta: { name: 'App Live Stream' },
      recording: { mode: 'off' },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.data.success) {
    throw new Error('Cloudflare live input creation failed');
  }

  const input = res.data.result;

  return {
    streamId: input.uid,
    rtmpUrl: input.rtmps.url,
    streamKey: input.rtmps.streamKey,
    playbackUrl: `https://videodelivery.net/${input.uid}/manifest/video.m3u8`,
  };
}

module.exports = { createLiveInput };
