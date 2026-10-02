export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  badge: string;
  description: string;
  contextWindow: string;
  speed: string;
  isDefault?: boolean;
}

export const AVAILABLE_MODELS: AIModelOption[] = [
  {
    id: "openai/gpt-oss-120b",
    name: "OpenAI GPT-OSS 120B",
    provider: "OpenAI",
    badge: "Recommended • Flagship",
    description: "Deep analytical substance, varied human editorial cadence, elite SEO strategy",
    contextWindow: "131k",
    speed: "~6s",
    isDefault: true,
  },
  {
    id: "openai/gpt-oss-20b",
    name: "OpenAI GPT-OSS 20B",
    provider: "OpenAI",
    badge: "Ultra-Fast",
    description: "Sub-3s generation speed, punchy conversion structure, agile technical guides",
    contextWindow: "131k",
    speed: "~2.5s",
  },
  {
    id: "groq/compound-mini",
    name: "Groq Compound Mini",
    provider: "Groq",
    badge: "Agentic Reasoning",
    description: "Strict structural and link compliance, balanced long-form framework",
    contextWindow: "131k",
    speed: "~10s",
  },
];

export const DEFAULT_MODEL_ID = "openai/gpt-oss-120b";

export function getValidModel(modelId?: string): string {
  if (!modelId) return DEFAULT_MODEL_ID;
  const match = AVAILABLE_MODELS.find((m) => m.id === modelId);
  return match ? match.id : DEFAULT_MODEL_ID;
}
