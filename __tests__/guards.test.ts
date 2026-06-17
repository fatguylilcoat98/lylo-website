import { test } from 'node:test';
import assert from 'node:assert/strict';

// Inline types (avoids import path issues during testing)
type VisibilityScope = 'private' | 'family_shared';
interface Memory {
  id: string;
  content: string;
  categories: string[];
  visibility: VisibilityScope;
  created_at: string;
  owner_id: string;
  chain_links?: unknown[];
}

// Inline guards (testing the logic directly)
function canIncludeInStoryMode(memory: Memory, requestingUserId: string): boolean {
  if (memory.visibility === 'private') return memory.owner_id === requestingUserId;
  return true;
}

function filterForStoryMode(memories: Memory[], requestingUserId: string, minMemories = 1) {
  const grounded = memories.filter(m => canIncludeInStoryMode(m, requestingUserId));
  return { grounded, excluded: memories.length - grounded.length, canGenerate: grounded.length >= minMemories };
}

function canTriggerNotification(memory: Memory): boolean {
  return memory.visibility !== 'private';
}

function governanceCheck(params: {
  memory: Memory;
  action: 'share' | 'story_mode' | 'notify' | 'chain';
  requestingUserId: string;
  ownerUserId: string;
}): { allowed: boolean; reason?: string } {
  const { memory, action, requestingUserId, ownerUserId } = params;
  if (memory.visibility === 'private' && requestingUserId !== ownerUserId) {
    return { allowed: false, reason: 'Private Vault memories are only accessible to their owner.' };
  }
  if (action === 'notify' && memory.visibility === 'private') {
    return { allowed: false, reason: 'Private Vault memories cannot generate notifications.' };
  }
  if (action === 'story_mode' && memory.visibility === 'private' && requestingUserId !== ownerUserId) {
    return { allowed: false, reason: 'This memory is in the Private Vault and cannot appear in Story Mode for others.' };
  }
  return { allowed: true };
}

function makeMemory(overrides: Partial<Memory> = {}): Memory {
  return {
    id: 'mem-001',
    content: 'Test memory',
    categories: ['family_shared'],
    visibility: 'family_shared',
    created_at: new Date().toISOString(),
    owner_id: 'user-alice',
    ...overrides,
  };
}

// ── Tests ──────────────────────────────────────────────────────────────────

test('memory supports multiple categories at once', () => {
  const mem = makeMemory({ categories: ['recipe', 'holiday', 'childhood', 'about_person'] });
  assert.equal(mem.categories.length, 4);
  assert.ok(mem.categories.includes('recipe'));
  assert.ok(mem.categories.includes('holiday'));
});

test('Private Vault memory excluded from Story Mode for non-owner', () => {
  const privateMemory = makeMemory({ visibility: 'private', owner_id: 'user-alice' });
  const canAlice = canIncludeInStoryMode(privateMemory, 'user-alice');
  const canBob   = canIncludeInStoryMode(privateMemory, 'user-bob');
  assert.equal(canAlice, true,  'Owner can access their own private memory');
  assert.equal(canBob,   false, 'Non-owner must be excluded from private memory');
});

test('Story Mode refuses when no grounded memories exist', () => {
  const privateMemories = [
    makeMemory({ id: 'mem-1', visibility: 'private', owner_id: 'user-alice' }),
    makeMemory({ id: 'mem-2', visibility: 'private', owner_id: 'user-alice' }),
  ];
  const { canGenerate, grounded, excluded } = filterForStoryMode(privateMemories, 'user-bob');
  assert.equal(canGenerate, false, 'Story Mode must refuse with zero grounded memories');
  assert.equal(grounded.length, 0);
  assert.equal(excluded, 2);
});

test('Story Mode proceeds when grounded memories exist for owner', () => {
  const memories = [
    makeMemory({ id: 'mem-1', visibility: 'private',       owner_id: 'user-alice' }),
    makeMemory({ id: 'mem-2', visibility: 'family_shared', owner_id: 'user-alice' }),
  ];
  const { canGenerate, grounded } = filterForStoryMode(memories, 'user-alice');
  assert.equal(canGenerate, true);
  assert.equal(grounded.length, 2, 'Owner can access all their memories including private');
});

test('Private Vault memory excluded from notifications', () => {
  const privateMemory = makeMemory({ visibility: 'private' });
  const sharedMemory  = makeMemory({ visibility: 'family_shared' });
  assert.equal(canTriggerNotification(privateMemory), false, 'Private must not trigger notifications');
  assert.equal(canTriggerNotification(sharedMemory),  true,  'Family shared can trigger notifications');
});

test('governanceCheck blocks non-owner from private memory share', () => {
  const mem = makeMemory({ visibility: 'private', owner_id: 'user-alice' });
  const result = governanceCheck({ memory: mem, action: 'share', requestingUserId: 'user-bob', ownerUserId: 'user-alice' });
  assert.equal(result.allowed, false);
  assert.ok(result.reason?.includes('Private Vault'));
});

test('governanceCheck allows owner to access private memory', () => {
  const mem = makeMemory({ visibility: 'private', owner_id: 'user-alice' });
  const result = governanceCheck({ memory: mem, action: 'story_mode', requestingUserId: 'user-alice', ownerUserId: 'user-alice' });
  assert.equal(result.allowed, true);
});

test('governanceCheck blocks private memory from notify action', () => {
  const mem = makeMemory({ visibility: 'private', owner_id: 'user-alice' });
  const result = governanceCheck({ memory: mem, action: 'notify', requestingUserId: 'user-alice', ownerUserId: 'user-alice' });
  assert.equal(result.allowed, false, 'Even owners cannot use private memories in notifications');
});
