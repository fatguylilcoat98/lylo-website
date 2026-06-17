import type { LegacyNotification, Memory, NotificationType, NotificationAction } from './types';
import { canTriggerNotification } from './guards';

const QUEUE_KEY = 'lylo_notification_queue';

/**
 * Build a notification from a memory.
 * Returns null if the memory fails the privacy guard.
 * AI suggestions must not auto-finalize: the caller always decides whether to queue.
 */
export function buildNotification(params: {
  memory: Memory;
  recipientId: string;
  senderId: string;
  type: NotificationType;
  personId?: string;
}): LegacyNotification | null {
  // Hard gate: private memories NEVER generate notifications
  if (!canTriggerNotification(params.memory)) return null;

  const messages: Record<NotificationType, string> = {
    new_story_about_you:       'Someone who loves you shared a new story about you.',
    recipe_connected_to_you:   'A family recipe connected to you was just preserved.',
    thinking_of_you:           'Someone in your family was thinking about you today.',
    story_mode_ready:          'Your story is ready to read.',
    chain_response_added:      'Someone added to a memory you are part of.',
  };

  const actions: NotificationAction[] = [
    { label: 'Call',                    type: 'call' },
    { label: 'Message',                 type: 'message' },
    { label: 'React',                   type: 'react' },
    { label: 'Record your own memory',  type: 'record' },
  ];

  return {
    id:                  `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    recipient_id:        params.recipientId,
    sender_id:           params.senderId,
    type:                params.type,
    memory_id:           params.memory.id,
    person_id:           params.personId,
    message:             messages[params.type],
    created_at:          new Date().toISOString(),
    delivered:           false,
    visibility_cleared:  true,
    actions,
  };
}

/** Queue a notification in localStorage. Refuses if visibility_cleared is false. */
export function queueNotification(notification: LegacyNotification): void {
  if (typeof window === 'undefined') return;
  if (!notification.visibility_cleared) return;
  try {
    const existing = getPendingNotifications();
    existing.push(notification);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
  } catch { /* storage full or unavailable */ }
}

/** Get all pending (undelivered) notifications from localStorage. */
export function getPendingNotifications(): LegacyNotification[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const all: LegacyNotification[] = JSON.parse(raw);
    return all.filter(n => !n.delivered);
  } catch {
    return [];
  }
}

/** Mark a notification as delivered. */
export function markDelivered(notificationId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all: LegacyNotification[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    const updated = all.map(n =>
      n.id === notificationId ? { ...n, delivered: true } : n
    );
    localStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
}
