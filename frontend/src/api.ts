import { API_CONFIG } from "./config.ts"
import type { CodeResponse } from "./types.ts"

export async function generateCode(code?: string): Promise<CodeResponse> {
  try {
    console.log("baseUrl", API_CONFIG)
    const response = await fetch(`${API_CONFIG.baseUrl}/api/code/python/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${token}`,
      },
      credentials: API_CONFIG.credentials,
      body: JSON.stringify({ code })
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
