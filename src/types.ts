export type TabType = 'hjem' | 'kalender' | 'grupper' | 'meldinger' | 'profil';

export type RsvpStatus = 'Ja' | 'Kanskje' | 'Nei' | null;

export type EntityTag = 'kirke' | 'bedehus' | 'push';
export type EntityFilter = 'alle' | EntityTag;

export type EventType = 'GUDSTJENESTE' | 'REGISTRATION_EVENT' | 'VOLUNTEER_SHIFT';

export interface EventItem {
  id: string;
  title: string;
  entityTag: EntityTag;
  eventType: EventType;
  requiresRSVP: boolean;
  canAddToCalendar: boolean;
  dayShort: string; // e.g. "SØN", "ONS", "FRE"
  dayNumber: string; // e.g. "15", "18", "20"
  time: string; // e.g. "kl. 11:00"
  location: string; // e.g. "Høvåg kirke"
  attendeesCount: number;
  categoryTag: ContentCategory;
  isHero?: boolean;
  isFeaturedByChurch?: boolean; // Editorially chosen by church staff/colleagues
  featuredReason?: string; // e.g. "Høsttakkefest & Storsamling"
  description?: string;
  speaker?: string;
  image?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  entityTag: EntityTag;
  content: string;
  authorName: string;
  authorRole: string; // e.g. "Prest", "Leder", "Ungdomsleder"
  authorAvatar?: string;
  timeAgo: string; // e.g. "2t siden", "1d siden"
  createdAt: string;
  isUnread?: boolean;
}

export interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  prayersCount: number;
  hasPrayed?: boolean;
  timeAgo: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  votesCount: number;
  hasVoted?: boolean;
  timeAgo: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  audioUrl?: string;
  description: string;
  coverImage?: string;
}

export interface GroupItem {
  id: string;
  name: string;
  entityTag: EntityTag;
  category: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  meetingTime: string;
  image: string;
}

export interface VolunteerShift {
  id: string;
  roleName: string;
  roleDescription?: string;
  assignedToName: string | null;
  assignedToAvatar?: string;
  isCurrentUser: boolean;
  swapRequested?: boolean;
}

export type DiakoniNeedCategory = 'samtale' | 'matpose' | 'ved' | 'besok' | 'skyss' | 'annet';

export interface TrosopplaeringStage {
  id: string;
  ageRange: string;
  title: string;
  responsible: string;
  scope: string; // e.g. "4 samlinger (8 timer)"
  goal: string;
  highlights: string[];
  location: string;
  iconName?: string;
  category: 'Småbarn' | 'Skolebarn' | 'Ungdom' | 'Konfirmant' | 'Leder';
}

export interface DiakoniRequestItem {
  id: string;
  category: DiakoniNeedCategory;
  categoryLabel: string;
  name: string;
  contact: string; // phone or email
  message?: string;
  isConfidential: boolean;
  createdAt: string;
  status: 'mottatt' | 'under_behandling' | 'utført';
}

export interface ServiceRotaItem {
  id: string;
  title: string;
  entityTag: EntityTag;
  dayShort: string;
  dayNumber: string;
  monthShort: string;
  time: string;
  location: string;
  shifts: VolunteerShift[];
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export type ContentCategory =
  | 'Gudstjeneste'
  | 'Ungdom'
  | 'Senior'
  | 'Familie'
  | 'Kultur'
  | 'Bønn'
  | 'Dugnad'
  | 'Misjon'
  | 'Konfirmant'
  | 'Trosopplæring';

export interface UserPreferences {
  followedEntities: {
    kirke: boolean;
    bedehus: boolean;
    push: boolean;
  };
  followedCategories: Record<ContentCategory, boolean>;
  hideSeniorContent?: boolean;
  hideYouthContent?: boolean;
}

export type UserRole =
  | 'USER'
  | 'VOLUNTEER'
  | 'LEADER'
  | 'ADMIN'
  | 'medlem'
  | 'frivillig'
  | 'gruppeleder'
  | 'diakon'
  | 'prest'
  | 'administrator';

export const USER_ROLES = {
  USER: 'USER',
  VOLUNTEER: 'VOLUNTEER',
  LEADER: 'LEADER',
  ADMIN: 'ADMIN'
} as const;

export type StandardUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserProfile {
  name: string;
  greeting: string;
  email: string;
  phone: string;
  role: UserRole;
  roleTitle?: string; // Human readable title, e.g. "Sokneprest", "Ungdomsleder (PUSH)", "Frivillig kirketjener", "Menighetsmedlem"
  avatar: string;
  managedGroups?: string[]; // IDs of groups managed if gruppeleder
  managedEntities?: EntityTag[]; // Specific entity mandates (e.g. 'push', 'bedehus', 'kirke')
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  rsvps: Record<string, RsvpStatus>;
  preferences: UserPreferences;
}
