const axios = require('axios');

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

exports.createLiveInput = async () => {
  const res = await axios.post(
    `${CLOUDFLARE_API}/accounts/${ACCOUNT_ID}/stream/live_inputs`,
    {
      meta: { name: 'MKA Live Stream' },
      recording: { mode: 'off' },
    },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const input = res.data.result;

  return {
    streamId: input.uid,
    rtmpUrl: input.rtmps?.url || input.rtmp?.url,
    streamKey: input.rtmps?.streamKey || input.rtmp?.streamKey,
    playbackUrl: `https://customer-${ACCOUNT_ID}.cloudflarestream.com/${input.uid}/manifest/video.m3u8`,
  };
};
