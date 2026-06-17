import type { Memory, LegacyPerson, StoryModeResult, MemoryDraft } from './types';
import { filterForStoryMode } from './guards';

/**
 * API base URL — configurable via environment variable.
 * Dev: http://localhost:5000
 * Production: https://lylo.thegoodneighborguard.com (or same-origin if hosted together)
 */
export const API_BASE =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_LYLO_API_URL) ||
  'https://lylo.thegoodneighborguard.com';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(err.error || 'API error', res.status);
  }
  return res.json() as Promise<T>;
}

// ── Memory ───────────────────────────────────────────────────────────────────

export async function saveMemory(draft: MemoryDraft): Promise<{ id: string; stored: boolean }> {
  return apiFetch('/api/memory/confirm', {
    method: 'POST',
    body: JSON.stringify({
      content:    draft.content,
      visibility: draft.visibility,
      categories: draft.categories,
    }),
  });
}

// ── People ────────────────────────────────────────────────────────────────────

export async function listPeople(): Promise<LegacyPerson[]> {
  const data = await apiFetch<{ people: LegacyPerson[] }>('/api/legacy/people');
  return data.people || [];
}

export async function getPersonDetail(
  personId: string
): Promise<{ profile: LegacyPerson; memories: Memory[] }> {
  return apiFetch(`/api/legacy/people/${personId}`);
}

// ── Story Mode ────────────────────────────────────────────────────────────────

/**
 * Get Story Mode narrative for a person.
 * Client-side grounding guard runs before the API call.
 * If no grounded memories exist, returns a safe refusal — never fabricates.
 */
export async function getPersonStory(
  personId: string,
  requestingUserId: string,
  availableMemories: Memory[]
): Promise<StoryModeResult> {
  const { canGenerate } = filterForStoryMode(availableMemories, requestingUserId);

  if (!canGenerate) {
    return {
      person: {
        id: personId, display_name: '', confirmed: false,
        memory_count: 0, recipe_count: 0, direct_message_count: 0,
      },
      narrative: "I don't have enough preserved memories to tell that story yet.",
      source_memory_ids: [],
      gaps_noted: ['No accessible memories have been preserved for this person yet.'],
      confidence_note: 'Requires at least one preserved, accessible memory.',
      memory_count: 0,
      generated_at: new Date().toISOString(),
      grounded: false,
    };
  }

  const result = await apiFetch<Omit<StoryModeResult, 'grounded'>>(`/api/legacy/people/${personId}/story`);
  return { ...result, grounded: true };
}

// ── Reports ───────────────────────────────────────────────────────────────────

export async function getThinkingOfYouReport(days: 7 | 30 = 7) {
  return apiFetch(`/api/legacy/reports/thinking-of-you?days=${days}`);
}

// ── Session ───────────────────────────────────────────────────────────────────

export async function checkSession(): Promise<{ userId: string; userName: string } | null> {
  try {
    const data = await apiFetch<{ userId: string; userName: string }>('/api/_debug/identity');
    return data;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await apiFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof ApiError ? err.message : 'Login failed' };
  }
}

export async function logout(): Promise<void> {
  await apiFetch('/api/logout', { method: 'POST' }).catch(() => {});
}
