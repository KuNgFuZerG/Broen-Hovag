import { create } from 'zustand';
import {
  TabType,
  RsvpStatus,
  EntityTag,
  EntityFilter,
  EventItem,
  AnnouncementItem,
  PrayerRequest,
  IdeaItem,
  PodcastEpisode,
  GroupItem,
  ChatChannel,
  UserProfile,
  UserRole,
  StandardUserRole,
  ServiceRotaItem,
  ContentCategory,
  DiakoniRequestItem
} from '../types';
import {
  INITIAL_USER,
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_PRAYERS,
  INITIAL_IDEAS,
  INITIAL_PODCASTS,
  INITIAL_GROUPS,
  INITIAL_CHANNELS,
  INITIAL_SERVICE_ROTAS,
  INITIAL_DIAKONI_REQUESTS
} from '../data/mockData';
import { RoleManager } from '../utils/roleManager';

interface AppState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  activeEntityFilter: EntityFilter;
  setActiveEntityFilter: (filter: EntityFilter) => void;

  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateUserPreferences: (updates: Partial<UserProfile['preferences']>) => void;
  toggleCategoryInterest: (category: ContentCategory) => void;
  toggleEntityFollow: (entity: EntityTag) => void;

  // RoleManager module
  setUserRole: (role: UserRole) => void;
  getUserRole: () => StandardUserRole;
  canPublishAnnouncement: (entity?: EntityTag) => boolean;
  canCreateGroup: () => boolean;
  canManageDiakoni: () => boolean;
  canManageRotas: () => boolean;
  hasRole: (required: StandardUserRole | StandardUserRole[]) => boolean;

  events: EventItem[];
  setRsvp: (eventId: string, status: RsvpStatus) => void;

  serviceRotas: ServiceRotaItem[];
  claimShift: (rotaId: string, shiftId: string) => void;
  takeOverSwapShift: (rotaId: string, shiftId: string) => void;
  requestSwapShift: (rotaId: string, shiftId: string) => void;
  releaseShift: (rotaId: string, shiftId: string) => void;

  diakoniRequests: DiakoniRequestItem[];
  addDiakoniRequest: (request: Omit<DiakoniRequestItem, 'id' | 'createdAt' | 'status'>) => void;

  announcements: AnnouncementItem[];
  addAnnouncement: (announcement: Omit<AnnouncementItem, 'id' | 'createdAt' | 'timeAgo'>) => void;
  markAnnouncementRead: (id: string) => void;
  markAllAnnouncementsRead: () => void;

  prayers: PrayerRequest[];
  addPrayer: (prayer: { title: string; content: string; isAnonymous: boolean }) => void;
  togglePrayFor: (id: string) => void;

  ideas: IdeaItem[];
  addIdea: (idea: { title: string; description: string; category: string }) => void;
  toggleVoteIdea: (id: string) => void;

  podcasts: PodcastEpisode[];

  groups: GroupItem[];
  toggleGroupJoin: (id: string) => void;

  channels: ChatChannel[];
  selectedChannelId: string;
  setSelectedChannelId: (id: string) => void;
  sendMessage: (channelId: string, text: string) => void;

  // Modals & UI overlays
  isNewAnnouncementModalOpen: boolean;
  setNewAnnouncementModalOpen: (open: boolean) => void;

  selectedEventModal: EventItem | null;
  setSelectedEventModal: (event: EventItem | null) => void;

  activeExploreModal: 'bonn' | 'diakoni' | 'podkast' | 'gi' | 'tjenester' | 'ide' | 'trosopplaering' | null;
  setActiveExploreModal: (modal: 'bonn' | 'diakoni' | 'podkast' | 'gi' | 'tjenester' | 'ide' | 'trosopplaering' | null) => void;

  isNotificationsModalOpen: boolean;
  setNotificationsModalOpen: (open: boolean) => void;

  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  // Preview container state
  deviceFrame: 'iphone' | 'android' | 'fullscreen';
  setDeviceFrame: (frame: 'iphone' | 'android' | 'fullscreen') => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'hjem',
  setActiveTab: (tab) => set({ activeTab: tab }),

  activeEntityFilter: 'alle',
  setActiveEntityFilter: (filter) => set({ activeEntityFilter: filter }),

  user: INITIAL_USER,
  updateUserProfile: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),

  updateUserPreferences: (updates) =>
    set((state) => ({
      user: {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...updates
        }
      }
    })),

  toggleCategoryInterest: (category) =>
    set((state) => {
      const current = state.user.preferences.followedCategories[category] ?? true;
      return {
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            followedCategories: {
              ...state.user.preferences.followedCategories,
              [category]: !current
            }
          }
        }
      };
    }),

  toggleEntityFollow: (entity) =>
    set((state) => {
      const current = state.user.preferences.followedEntities[entity] ?? true;
      return {
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            followedEntities: {
              ...state.user.preferences.followedEntities,
              [entity]: !current
            }
          }
        }
      };
    }),

  // RoleManager implementations
  setUserRole: (role) =>
    set((state) => {
      const normalized = RoleManager.normalizeRole(role);
      let autoTitle = state.user.roleTitle;
      if (normalized === 'ADMIN') autoTitle = 'Sokneprest / Menighetsleder (Full publiseringsrett)';
      else if (normalized === 'LEADER') autoTitle = 'Gruppeleder / Diakon (Avdelingsansvar)';
      else if (normalized === 'VOLUNTEER') autoTitle = 'Frivillig medarbeider (Tjenester)';
      else autoTitle = 'Menighetsmedlem (Standardleser)';

      return {
        user: {
          ...state.user,
          role,
          roleTitle: autoTitle
        }
      };
    }),

  getUserRole: () => RoleManager.normalizeRole(get().user.role),

  canPublishAnnouncement: (entity) =>
    RoleManager.canPublishAnnouncements(get().user, entity),

  canCreateGroup: () =>
    RoleManager.canCreateGroups(get().user),

  canManageDiakoni: () =>
    RoleManager.canManageDiakoni(get().user),

  canManageRotas: () =>
    RoleManager.canManageServiceRotas(get().user),

  hasRole: (required) =>
    RoleManager.hasRequiredRole(get().user, required),

  events: INITIAL_EVENTS,
  setRsvp: (eventId, status) => {
    const currentRsvps = get().user.rsvps;
    const oldStatus = currentRsvps[eventId];

    set((state) => {
      const newRsvps = { ...state.user.rsvps, [eventId]: status };
      const updatedEvents = state.events.map((evt) => {
        if (evt.id === eventId) {
          let countDiff = 0;
          if (oldStatus !== 'Ja' && status === 'Ja') countDiff = 1;
          if (oldStatus === 'Ja' && status !== 'Ja') countDiff = -1;
          return { ...evt, attendeesCount: Math.max(0, evt.attendeesCount + countDiff) };
        }
        return evt;
      });

      return {
        user: { ...state.user, rsvps: newRsvps },
        events: updatedEvents,
        selectedEventModal: state.selectedEventModal?.id === eventId
          ? {
              ...state.selectedEventModal,
              attendeesCount: Math.max(
                0,
                state.selectedEventModal.attendeesCount + (oldStatus !== 'Ja' && status === 'Ja' ? 1 : oldStatus === 'Ja' && status !== 'Ja' ? -1 : 0)
              )
            }
          : state.selectedEventModal
      };
    });
  },

  serviceRotas: INITIAL_SERVICE_ROTAS,
  claimShift: (rotaId, shiftId) => {
    const userName = get().user.name;
    const userAvatar = userName.charAt(0);

    set((state) => ({
      serviceRotas: state.serviceRotas.map((rota) => {
        if (rota.id !== rotaId) return rota;
        return {
          ...rota,
          shifts: rota.shifts.map((s) => {
            if (s.id !== shiftId) return s;
            return {
              ...s,
              assignedToName: userName,
              assignedToAvatar: userAvatar,
              isCurrentUser: true,
              swapRequested: false
            };
          })
        };
      })
    }));
  },

  takeOverSwapShift: (rotaId, shiftId) => {
    const userName = get().user.name;
    const userAvatar = userName.charAt(0);

    set((state) => ({
      serviceRotas: state.serviceRotas.map((rota) => {
        if (rota.id !== rotaId) return rota;
        return {
          ...rota,
          shifts: rota.shifts.map((s) => {
            if (s.id !== shiftId) return s;
            return {
              ...s,
              assignedToName: userName,
              assignedToAvatar: userAvatar,
              isCurrentUser: true,
              swapRequested: false
            };
          })
        };
      })
    }));
  },

  requestSwapShift: (rotaId, shiftId) => {
    set((state) => ({
      serviceRotas: state.serviceRotas.map((rota) => {
        if (rota.id !== rotaId) return rota;
        return {
          ...rota,
          shifts: rota.shifts.map((s) => {
            if (s.id !== shiftId) return s;
            return {
              ...s,
              swapRequested: !s.swapRequested
            };
          })
        };
      })
    }));
  },

  releaseShift: (rotaId, shiftId) => {
    set((state) => ({
      serviceRotas: state.serviceRotas.map((rota) => {
        if (rota.id !== rotaId) return rota;
        return {
          ...rota,
          shifts: rota.shifts.map((s) => {
            if (s.id !== shiftId) return s;
            return {
              ...s,
              assignedToName: null,
              assignedToAvatar: undefined,
              isCurrentUser: false,
              swapRequested: false
            };
          })
        };
      })
    }));
  },

  diakoniRequests: INITIAL_DIAKONI_REQUESTS,
  addDiakoniRequest: (request) => {
    const newReq: DiakoniRequestItem = {
      ...request,
      id: `dia-${Date.now()}`,
      createdAt: 'Akkurat nå',
      status: 'mottatt'
    };
    set((state) => ({
      diakoniRequests: [newReq, ...state.diakoniRequests]
    }));
  },

  announcements: INITIAL_ANNOUNCEMENTS,
  addAnnouncement: (data) => {
    const currentFilter = get().activeEntityFilter;
    const defaultTag: EntityTag = currentFilter === 'alle' ? 'kirke' : currentFilter;
    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: data.title,
      entityTag: data.entityTag || defaultTag,
      content: data.content,
      authorName: data.authorName || get().user.name,
      authorRole: data.authorRole || get().user.role || 'Prest',
      timeAgo: 'Akkurat nå',
      createdAt: new Date().toISOString(),
      isUnread: true
    };
    set((state) => ({
      announcements: [newAnn, ...state.announcements]
    }));
  },

  markAnnouncementRead: (id) => {
    set((state) => ({
      announcements: state.announcements.map((ann) =>
        ann.id === id ? { ...ann, isUnread: false } : ann
      )
    }));
  },

  markAllAnnouncementsRead: () => {
    set((state) => ({
      announcements: state.announcements.map((ann) => ({ ...ann, isUnread: false }))
    }));
  },

  prayers: INITIAL_PRAYERS,
  addPrayer: ({ title, content, isAnonymous }) => {
    const newP: PrayerRequest = {
      id: `p-${Date.now()}`,
      title,
      content,
      author: isAnonymous ? 'Anonym' : get().user.name,
      isAnonymous,
      prayersCount: 1,
      hasPrayed: true,
      timeAgo: 'Akkurat nå'
    };
    set((state) => ({ prayers: [newP, ...state.prayers] }));
  },

  togglePrayFor: (id) => {
    set((state) => ({
      prayers: state.prayers.map((p) => {
        if (p.id === id) {
          const hasPrayed = !p.hasPrayed;
          return {
            ...p,
            hasPrayed,
            prayersCount: hasPrayed ? p.prayersCount + 1 : p.prayersCount - 1
          };
        }
        return p;
      })
    }));
  },

  ideas: INITIAL_IDEAS,
  addIdea: ({ title, description, category }) => {
    const newI: IdeaItem = {
      id: `i-${Date.now()}`,
      title,
      description,
      category,
      author: get().user.name,
      votesCount: 1,
      hasVoted: true,
      timeAgo: 'Akkurat nå'
    };
    set((state) => ({ ideas: [newI, ...state.ideas] }));
  },

  toggleVoteIdea: (id) => {
    set((state) => ({
      ideas: state.ideas.map((i) => {
        if (i.id === id) {
          const hasVoted = !i.hasVoted;
          return {
            ...i,
            hasVoted,
            votesCount: hasVoted ? i.votesCount + 1 : i.votesCount - 1
          };
        }
        return i;
      })
    }));
  },

  podcasts: INITIAL_PODCASTS,

  groups: INITIAL_GROUPS,
  toggleGroupJoin: (id) => {
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id === id) {
          const isJoined = !g.isJoined;
          return {
            ...g,
            isJoined,
            memberCount: isJoined ? g.memberCount + 1 : g.memberCount - 1
          };
        }
        return g;
      })
    }));
  },

  channels: INITIAL_CHANNELS,
  selectedChannelId: 'ch-1',
  setSelectedChannelId: (id) => set({ selectedChannelId: id }),
  sendMessage: (channelId, text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: get().user.name,
      senderAvatar: get().user.name.charAt(0),
      senderRole: get().user.role,
      text: text.trim(),
      timestamp: timeString,
      isMe: true
    };

    set((state) => ({
      channels: state.channels.map((ch) => {
        if (ch.id === channelId) {
          return {
            ...ch,
            lastMessage: text.trim(),
            lastMessageTime: timeString,
            messages: [...ch.messages, newMsg]
          };
        }
        return ch;
      })
    }));
  },

  // UI Overlays
  isNewAnnouncementModalOpen: false,
  setNewAnnouncementModalOpen: (open) => set({ isNewAnnouncementModalOpen: open }),

  selectedEventModal: null,
  setSelectedEventModal: (event) => set({ selectedEventModal: event }),

  activeExploreModal: null,
  setActiveExploreModal: (modal) => set({ activeExploreModal: modal }),

  isNotificationsModalOpen: false,
  setNotificationsModalOpen: (open) => set({ isNotificationsModalOpen: open }),

  isDrawerOpen: false,
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),

  deviceFrame: 'iphone',
  setDeviceFrame: (frame) => set({ deviceFrame: frame })
}));
