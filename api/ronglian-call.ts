import { createHash } from 'crypto';

// 容联云 API 凭证
const ACCOUNT_SID = '2c94811c9dfd83b1019e40fdf6720d44';
const AUTH_TOKEN = 'cc76a424299347fb9d83d053c8a80b31';
const APP_ID = '2c94811c9dfd83b1019e40fdf6f90d4b';
const REST_URL = 'https://app.cloopen.com:8883';

interface CallRequest {
  phoneNumber: string;
  displayNumber?: string;
}

export default async function handler(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    const body: CallRequest = await req.json();
    const { phoneNumber, displayNumber = '170988886666' } = body;

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing phoneNumber' }),
        { status: 400, headers }
      );
    }

    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    const sig = createHash('md5')
      .update(ACCOUNT_SID + AUTH_TOKEN + timestamp)
      .digest('hex')
      .toLowerCase();

    const auth = Buffer.from(`${ACCOUNT_SID}:${timestamp}`).toString('base64');

    const url = `${REST_URL}/2013-12-26/Accounts/${ACCOUNT_SID}/Calls/callByConf?sig=${sig}`;

    const requestBody = JSON.stringify({
      appId: APP_ID,
      caller: phoneNumber,
      callee: phoneNumber,
      callerNumber: displayNumber,
      useMobile: '1',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: auth,
        Accept: 'application/json',
      },
      body: requestBody,
    });

    const data = await response.json();
    const statusCode = data.statusCode || '';

    if (statusCode === '000000') {
      return new Response(
        JSON.stringify({
          success: true,
          message: '呼叫成功',
          callSid: data.data?.callSid || '',
        }),
        { status: 200, headers }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: data.statusMsg || '呼叫失败',
        }),
        { status: 200, headers }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || '服务器内部错误',
      }),
      { status: 500, headers }
    );
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
