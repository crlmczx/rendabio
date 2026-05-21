/**
 * 容联云 API 前端代理调用
 * 通过 Vercel Serverless Function 代理，避免暴露 API Key
 */

const API_BASE = 'https://rendacj.com';

export interface CallResult {
  success: boolean;
  message: string;
  callSid?: string;
}

export async function makeCall(phoneNumber: string): Promise<CallResult> {
  try {
    const response = await fetch(`${API_BASE}/api/ronglian-call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        displayNumber: '170988886666',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: `请求失败 (${response.status}): ${errorText}`,
      };
    }

    const result: CallResult = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `网络错误: ${error.message || '未知错误'}`,
    };
  }
}
