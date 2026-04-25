import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const MODEL_ANALYSIS = process.env.MODEL_ANALYSIS || 'claude-sonnet-4-6'
export const MODEL_CHAT = process.env.MODEL_CHAT || 'claude-haiku-4-5'
