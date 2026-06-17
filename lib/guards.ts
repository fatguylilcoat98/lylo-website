import type { Memory, VisibilityScope } from './types';

/** Private Vault overrides any other sharing setting. */
export function resolveVisibility(
  requested: VisibilityScope,
  isVaultChoice: boolean
): VisibilityScope {
  if (isVaultChoice || !requested) return 'private';
  return requested;
}

/**
 * Can this memory be included in Story Mode?
 * Private memories require the requesting user to be the owner.
 */
export function canIncludeInStoryMode(
  memory: Memory,
  requestingUserId: string
): boolean {
  if (memory.visibility === 'private') {
    return memory.owner_id === requestingUserId;
  }
  return true;
}

/**
 * Filter memories for Story Mode. Returns grounded set + whether generation is possible.
 * minMemories defaults to 1 — Story Mode refuses with zero grounded memories.
 */
export function filterForStoryMode(
  memories: Memory[],
  requestingUserId: string,
  minMemories = 1
): { grounded: Memory[]; excluded: number; canGenerate: boolean } {
  const grounded = memories.filter(m => canIncludeInStoryMode(m, requestingUserId));
  return {
    grounded,
    excluded: memories.length - grounded.length,
    canGenerate: grounded.length >= minMemories,
  };
}

/** Private vault memories must NEVER generate notifications. */
export function canTriggerNotification(memory: Memory): boolean {
  return memory.visibility !== 'private';
}

/** Filter a memory list to only those safe to reference in a notification. */
export function filterForNotification(memories: Memory[]): Memory[] {
  return memories.filter(canTriggerNotification);
}

/**
 * Top-level governance check before any sharing, Story Mode, notification, or chain action.
 * Returns { allowed, reason } for clear error surfacing.
 */
export function governanceCheck(params: {
  memory: Memory;
  action: 'share' | 'story_mode' | 'notify' | 'chain';
  requestingUserId: string;
  ownerUserId: string;
}): { allowed: boolean; reason?: string } {
  const { memory, action, requestingUserId, ownerUserId } = params;

  if (memory.visibility === 'private' && requestingUserId !== ownerUserId) {
    return {
      allowed: false,
      reason: 'Private Vault memories are only accessible to their owner.',
    };
  }

  if (action === 'notify' && memory.visibility === 'private') {
    return {
      allowed: false,
      reason: 'Private Vault memories cannot generate notifications.',
    };
  }

  if (
    action === 'story_mode' &&
    memory.visibility === 'private' &&
    requestingUserId !== ownerUserId
  ) {
    return {
      allowed: false,
      reason:
        'This memory is in the Private Vault and cannot appear in Story Mode for others.',
    };
  }

  return { allowed: true };
}
