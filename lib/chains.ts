import type { Memory, MemoryChainLink, ChainLinkType } from './types';

const CHAIN_STORE_KEY = 'lylo_chain_links';

/** Create a new chain link between two memories. */
export function createChainLink(params: {
  parentMemoryId: string;
  childMemoryId: string;
  linkType: ChainLinkType;
  createdBy: string;
  note?: string;
}): MemoryChainLink {
  return {
    id:                `link_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    parent_memory_id:  params.parentMemoryId,
    child_memory_id:   params.childMemoryId,
    link_type:         params.linkType,
    created_by:        params.createdBy,
    created_at:        new Date().toISOString(),
    note:              params.note,
  };
}

/** Human-readable label for a chain link type. */
export function getChainLinkLabel(type: ChainLinkType): string {
  const labels: Record<ChainLinkType, string> = {
    response:              'Response',
    continuation:          'Continued this story',
    correction:            'Added a correction',
    photo_added:           'Added a photo',
    recipe_added:          'Added a recipe',
    alternate_perspective: 'Another perspective',
  };
  return labels[type];
}

/**
 * Resolve the full chain for a root memory — parent + all descendants in chronological order.
 * Accepts a Map of all memories for O(1) lookup.
 */
export function resolveChain(rootMemory: Memory, allMemories: Map<string, Memory>): Memory[] {
  const chain: Memory[] = [rootMemory];
  const visited = new Set<string>([rootMemory.id]);

  function walk(memoryId: string): void {
    const mem = allMemories.get(memoryId);
    if (!mem?.chain_links) return;
    for (const link of mem.chain_links) {
      if (!visited.has(link.child_memory_id)) {
        visited.add(link.child_memory_id);
        const child = allMemories.get(link.child_memory_id);
        if (child) {
          chain.push(child);
          walk(child.id);
        }
      }
    }
  }

  walk(rootMemory.id);
  return chain.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
}

/** How many distinct people contributed to a memory chain. */
export function countChainContributors(chain: Memory[]): number {
  return new Set(chain.map(m => m.owner_id)).size;
}

/** Persist a chain link to localStorage (scaffold for backend). */
export function persistChainLink(link: MemoryChainLink): void {
  if (typeof window === 'undefined') return;
  try {
    const existing: MemoryChainLink[] = JSON.parse(localStorage.getItem(CHAIN_STORE_KEY) || '[]');
    existing.push(link);
    localStorage.setItem(CHAIN_STORE_KEY, JSON.stringify(existing));
  } catch { /* storage unavailable */ }
}

/** Load chain links for a memory from localStorage. */
export function loadChainLinks(memoryId: string): MemoryChainLink[] {
  if (typeof window === 'undefined') return [];
  try {
    const all: MemoryChainLink[] = JSON.parse(localStorage.getItem(CHAIN_STORE_KEY) || '[]');
    return all.filter(l => l.parent_memory_id === memoryId || l.child_memory_id === memoryId);
  } catch {
    return [];
  }
}
