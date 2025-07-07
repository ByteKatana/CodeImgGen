import { API_CONFIG } from "./config.ts"
import type { CodeResponse } from "./types.ts"

export async function generateCode(code?: string, code_lang?: string, code_theme?: string): Promise<CodeResponse> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/api/code/python/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${token}`,
      },
      credentials: API_CONFIG.credentials,
      body: JSON.stringify({ code, code_lang, code_theme })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to generate code")
  }
}
