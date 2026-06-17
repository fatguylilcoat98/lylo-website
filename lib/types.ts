export type MemoryCategory =
  | 'private_vault'
  | 'family_shared'
  | 'about_person'
  | 'recipe'
  | 'tradition'
  | 'life_lesson'
  | 'funny_moment'
  | 'holiday'
  | 'childhood'
  | 'vacation'
  | 'place'
  | 'theme';

export type VisibilityScope = 'private' | 'family_shared';

export type ChainLinkType =
  | 'response'
  | 'continuation'
  | 'correction'
  | 'photo_added'
  | 'recipe_added'
  | 'alternate_perspective';

export type NotificationType =
  | 'new_story_about_you'
  | 'recipe_connected_to_you'
  | 'thinking_of_you'
  | 'story_mode_ready'
  | 'chain_response_added';

export type RecordingState = 'idle' | 'requesting' | 'recording' | 'stopped' | 'saving' | 'error';

export interface Memory {
  id: string;
  content: string;
  audio_url?: string;
  categories: MemoryCategory[];
  visibility: VisibilityScope;
  created_at: string;
  owner_id: string;
  people_mentioned?: string[];
  chain_links?: MemoryChainLink[];
}

export interface MemoryChainLink {
  id: string;
  parent_memory_id: string;
  child_memory_id: string;
  link_type: ChainLinkType;
  created_by: string;
  created_at: string;
  note?: string;
}

export interface LegacyPerson {
  id: string;
  display_name: string;
  relationship?: string;
  confirmed: boolean;
  memory_count: number;
  recipe_count: number;
  direct_message_count: number;
  last_mentioned_at?: string;
  total_mentions?: number;
}

export interface NotificationAction {
  label: string;
  type: 'call' | 'message' | 'react' | 'record';
  href?: string;
}

export interface LegacyNotification {
  id: string;
  recipient_id: string;
  sender_id: string;
  type: NotificationType;
  memory_id?: string;
  person_id?: string;
  message: string;
  created_at: string;
  delivered: boolean;
  visibility_cleared: boolean;
  actions: NotificationAction[];
}

export interface StoryModeResult {
  person: LegacyPerson;
  narrative: string;
  source_memory_ids: string[];
  gaps_noted: string[];
  confidence_note: string;
  memory_count: number;
  generated_at: string;
  grounded: boolean;
}

export interface MemoryDraft {
  content: string;
  audio_blob?: Blob;
  categories: MemoryCategory[];
  visibility: VisibilityScope;
  people_mentioned?: string[];
}

export const CATEGORY_LABELS: Record<MemoryCategory, string> = {
  private_vault:  'Private Vault',
  family_shared:  'Family',
  about_person:   'About Someone',
  recipe:         'Recipe',
  tradition:      'Tradition',
  life_lesson:    'Life Lesson',
  funny_moment:   'Funny Moment',
  holiday:        'Holiday',
  childhood:      'Childhood',
  vacation:       'Vacation',
  place:          'Place',
  theme:          'Theme',
};
