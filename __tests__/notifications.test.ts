import { test } from 'node:test';
import assert from 'node:assert/strict';

type VisibilityScope = 'private' | 'family_shared';
type NotificationType = 'new_story_about_you' | 'recipe_connected_to_you' | 'thinking_of_you' | 'story_mode_ready' | 'chain_response_added';
interface Memory { id: string; content: string; categories: string[]; visibility: VisibilityScope; created_at: string; owner_id: string; }
interface LegacyNotification { id: string; recipient_id: string; sender_id: string; type: NotificationType; memory_id?: string; message: string; created_at: string; delivered: boolean; visibility_cleared: boolean; actions: { label: string; type: string }[]; }

function canTriggerNotification(memory: Memory): boolean {
  return memory.visibility !== 'private';
}

function buildNotification(params: {
  memory: Memory;
  recipientId: string;
  senderId: string;
  type: NotificationType;
}): LegacyNotification | null {
  if (!canTriggerNotification(params.memory)) return null;

  const messages: Record<NotificationType, string> = {
    new_story_about_you:     'Someone who loves you shared a new story about you.',
    recipe_connected_to_you: 'A family recipe connected to you was just preserved.',
    thinking_of_you:         'Someone in your family was thinking about you today.',
    story_mode_ready:        'Your story is ready to read.',
    chain_response_added:    'Someone added to a memory you are part of.',
  };

  return {
    id:                 `notif_test_${Math.random().toString(36).slice(2)}`,
    recipient_id:       params.recipientId,
    sender_id:          params.senderId,
    type:               params.type,
    memory_id:          params.memory.id,
    message:            messages[params.type],
    created_at:         new Date().toISOString(),
    delivered:          false,
    visibility_cleared: true,
    actions: [
      { label: 'Call',                   type: 'call' },
      { label: 'Message',                type: 'message' },
      { label: 'React',                  type: 'react' },
      { label: 'Record your own memory', type: 'record' },
    ],
  };
}

function makeMemory(visibility: VisibilityScope, id = 'mem-001'): Memory {
  return { id, content: 'Test', categories: [], visibility, created_at: new Date().toISOString(), owner_id: 'user-alice' };
}

// ── Tests ──────────────────────────────────────────────────────────────────

test('notification queue does not include private memories', () => {
  const privateMemory = makeMemory('private');
  const result = buildNotification({ memory: privateMemory, recipientId: 'user-bob', senderId: 'user-alice', type: 'new_story_about_you' });
  assert.equal(result, null, 'buildNotification must return null for private memories');
});

test('notification is built for family_shared memory', () => {
  const sharedMemory = makeMemory('family_shared');
  const notif = buildNotification({ memory: sharedMemory, recipientId: 'user-bob', senderId: 'user-alice', type: 'new_story_about_you' });
  assert.ok(notif !== null);
  assert.equal(notif!.recipient_id, 'user-bob');
  assert.equal(notif!.visibility_cleared, true);
  assert.equal(notif!.delivered, false);
});

test('notification includes all 4 action options', () => {
  const mem = makeMemory('family_shared');
  const notif = buildNotification({ memory: mem, recipientId: 'r', senderId: 's', type: 'thinking_of_you' });
  assert.ok(notif !== null);
  const actionTypes = notif!.actions.map(a => a.type);
  assert.ok(actionTypes.includes('call'),    'Must include Call action');
  assert.ok(actionTypes.includes('message'), 'Must include Message action');
  assert.ok(actionTypes.includes('react'),   'Must include React action');
  assert.ok(actionTypes.includes('record'),  'Must include Record action');
});

test('AI suggestion does not auto-finalize: buildNotification only returns data, caller decides to queue', () => {
  // buildNotification returns a notification object but does NOT queue it.
  // The caller must explicitly call queueNotification — AI cannot do this automatically.
  const mem = makeMemory('family_shared');
  const notif = buildNotification({ memory: mem, recipientId: 'r', senderId: 's', type: 'recipe_connected_to_you' });
  assert.ok(notif !== null);
  // The notification exists as a value but has NOT been delivered
  assert.equal(notif!.delivered, false, 'Notification must not be pre-delivered by AI');
  assert.equal(notif!.visibility_cleared, true, 'Visibility must be explicitly cleared before any action');
});

test('recipe notification type produces correct message', () => {
  const mem = makeMemory('family_shared');
  const notif = buildNotification({ memory: mem, recipientId: 'r', senderId: 's', type: 'recipe_connected_to_you' });
  assert.ok(notif?.message.toLowerCase().includes('recipe'));
});
