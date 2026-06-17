import { test } from 'node:test';
import assert from 'node:assert/strict';

type ChainLinkType = 'response' | 'continuation' | 'correction' | 'photo_added' | 'recipe_added' | 'alternate_perspective';
type VisibilityScope = 'private' | 'family_shared';
interface Memory { id: string; content: string; categories: string[]; visibility: VisibilityScope; created_at: string; owner_id: string; chain_links?: MemoryChainLink[]; }
interface MemoryChainLink { id: string; parent_memory_id: string; child_memory_id: string; link_type: ChainLinkType; created_by: string; created_at: string; note?: string; }

function createChainLink(params: { parentMemoryId: string; childMemoryId: string; linkType: ChainLinkType; createdBy: string; note?: string; }): MemoryChainLink {
  return {
    id: `link_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    parent_memory_id: params.parentMemoryId,
    child_memory_id: params.childMemoryId,
    link_type: params.linkType,
    created_by: params.createdBy,
    created_at: new Date().toISOString(),
    note: params.note,
  };
}

function resolveChain(rootMemory: Memory, allMemories: Map<string, Memory>): Memory[] {
  const chain: Memory[] = [rootMemory];
  const visited = new Set<string>([rootMemory.id]);
  function walk(memoryId: string): void {
    const mem = allMemories.get(memoryId);
    if (!mem?.chain_links) return;
    for (const link of mem.chain_links) {
      if (!visited.has(link.child_memory_id)) {
        visited.add(link.child_memory_id);
        const child = allMemories.get(link.child_memory_id);
        if (child) { chain.push(child); walk(child.id); }
      }
    }
  }
  walk(rootMemory.id);
  return chain.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

function countChainContributors(chain: Memory[]): number {
  return new Set(chain.map(m => m.owner_id)).size;
}

function makeMemory(id: string, ownerId: string, createdAt = new Date().toISOString(), chainLinks?: MemoryChainLink[]): Memory {
  return { id, content: `Memory ${id}`, categories: [], visibility: 'family_shared', created_at: createdAt, owner_id: ownerId, chain_links: chainLinks };
}

// ── Tests ──────────────────────────────────────────────────────────────────

test('createChainLink returns a valid link with required fields', () => {
  const link = createChainLink({ parentMemoryId: 'parent-1', childMemoryId: 'child-1', linkType: 'response', createdBy: 'user-bob' });
  assert.equal(link.parent_memory_id, 'parent-1');
  assert.equal(link.child_memory_id, 'child-1');
  assert.equal(link.link_type, 'response');
  assert.equal(link.created_by, 'user-bob');
  assert.ok(link.id.startsWith('link_'));
});

test('memory chain links work: parent → child → grandchild', () => {
  const grandchild = makeMemory('mem-3', 'user-carol', '2024-03-01T00:00:00.000Z');
  const child      = makeMemory('mem-2', 'user-bob',   '2024-02-01T00:00:00.000Z', [
    createChainLink({ parentMemoryId: 'mem-2', childMemoryId: 'mem-3', linkType: 'continuation', createdBy: 'user-carol' }),
  ]);
  const parent     = makeMemory('mem-1', 'user-alice', '2024-01-01T00:00:00.000Z', [
    createChainLink({ parentMemoryId: 'mem-1', childMemoryId: 'mem-2', linkType: 'response', createdBy: 'user-bob' }),
  ]);

  const allMemories = new Map([
    ['mem-1', parent],
    ['mem-2', child],
    ['mem-3', grandchild],
  ]);

  const chain = resolveChain(parent, allMemories);
  assert.equal(chain.length, 3, 'Chain must include parent, child, and grandchild');
  assert.equal(chain[0].id, 'mem-1', 'Chronological order: parent first');
  assert.equal(chain[1].id, 'mem-2');
  assert.equal(chain[2].id, 'mem-3', 'Grandchild last');
});

test('countChainContributors counts distinct contributors', () => {
  const chain: Memory[] = [
    makeMemory('mem-1', 'user-alice'),
    makeMemory('mem-2', 'user-bob'),
    makeMemory('mem-3', 'user-carol'),
    makeMemory('mem-4', 'user-bob'), // bob contributed twice
  ];
  const count = countChainContributors(chain);
  assert.equal(count, 3, 'Three distinct contributors (bob counted once)');
});

test('all ChainLinkType values are valid', () => {
  const allTypes: ChainLinkType[] = ['response', 'continuation', 'correction', 'photo_added', 'recipe_added', 'alternate_perspective'];
  for (const type of allTypes) {
    const link = createChainLink({ parentMemoryId: 'p', childMemoryId: 'c', linkType: type, createdBy: 'u' });
    assert.equal(link.link_type, type, `Link type "${type}" must be preserved`);
  }
});

test('person mention count: single memory referencing multiple people', () => {
  // Each memory can mention multiple people — no rigid folder model
  const memory = makeMemory('mem-1', 'user-alice');
  const enrichedMemory = { ...memory, people_mentioned: ['Emma', 'Steve', 'Grandma Rose'] };
  assert.equal(enrichedMemory.people_mentioned!.length, 3);
  assert.ok(enrichedMemory.people_mentioned!.includes('Emma'));
  assert.ok(enrichedMemory.people_mentioned!.includes('Grandma Rose'));
});

test('resolveChain returns only root when no chain links exist', () => {
  const root = makeMemory('mem-1', 'user-alice');
  const chain = resolveChain(root, new Map([['mem-1', root]]));
  assert.equal(chain.length, 1);
  assert.equal(chain[0].id, 'mem-1');
});
