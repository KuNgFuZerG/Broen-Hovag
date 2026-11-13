import React, { useState } from 'react';
import { MessageSquare, Search, ArrowLeft, Send, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityFilterBar } from '../components/EntityFilterBar';

export const MessagesScreen: React.FC = () => {
  const { channels, selectedChannelId, setSelectedChannelId, sendMessage, activeEntityFilter } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  // Expand mock conversations list
  const mockConversations = [
    {
      id: 'ch-1',
      title: 'Hovedkanalen (Høvåg Menighet)',
      entityTag: 'kirke',
      avatarText: 'HM',
      avatarBg: 'bg-orange-600 text-white',
      lastMessage: 'Gleder meg til søndagens gudstjeneste!',
      timestamp: '15 min',
      unreadBadge: 3
    },
    {
      id: 'ch-2',
      title: 'Frivillige & Medhjelpere',
      entityTag: 'bedehus',
      avatarText: 'FM',
      avatarBg: 'bg-amber-700 text-white',
      lastMessage: 'Vaktlisten for august er klar.',
      timestamp: '2t',
      unreadBadge: 1
    },
    {
      id: 'ch-3',
      title: 'PUSH Ungdomsledere',
      entityTag: 'push',
      avatarText: 'PU',
      avatarBg: 'bg-purple-600 text-white',
      lastMessage: 'Neste leirmøte er tirsdag kl 19:00.',
      timestamp: '1d',
      unreadBadge: 0
    },
    {
      id: 'ch-4',
      title: 'Odd Anders Nilsen (Sogneprest)',
      entityTag: 'kirke',
      avatarText: 'ON',
      avatarBg: 'bg-blue-600 text-white',
      lastMessage: 'Takk for god hjelp med tekstradingen.',
      timestamp: '2d',
      unreadBadge: 0
    }
  ];

  // Entity filter
  const entityFiltered =
    activeEntityFilter === 'alle'
      ? mockConversations
      : mockConversations.filter((c) => c.entityTag === activeEntityFilter);

  // Search filter
  const filteredConversations = entityFiltered.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChannel = channels.find((ch) => ch.id === activeChatId) || channels[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChannel) return;
    sendMessage(selectedChannel.id, inputText);
    setInputText('');
  };

  // If in active chat detail view
  if (activeChatId && selectedChannel) {
    return (
      <div className="bg-[#f4f5f8] min-h-full pb-28 pt-4 px-5 flex flex-col h-full space-y-3">
        {/* Back navigation header */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-200/90 shadow-2xs">
          <button
            onClick={() => setActiveChatId(null)}
            aria-label="Tilbake til meldingsliste"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-black text-gray-900 truncate"># {selectedChannel.name}</h2>
            <p className="text-[11px] text-gray-600 font-semibold truncate">{selectedChannel.description}</p>
          </div>
        </div>

        {/* Active Chat Container */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[400px]">
          {/* Chat Messages */}
          <div className="p-4 space-y-3.5 overflow-y-auto flex-1 max-h-[400px]">
            {selectedChannel.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full text-white font-black text-xs flex items-center justify-center shrink-0 ${
                    msg.isMe ? 'bg-orange-600' : 'bg-gray-800'
                  }`}
                >
                  {msg.senderAvatar}
                </div>

                <div
                  className={`max-w-[78%] p-3.5 rounded-2xl text-xs space-y-1 ${
                    msg.isMe
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-gray-100 text-gray-900 rounded-tl-none border border-gray-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-90 font-extrabold">
                    <span>{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed font-normal">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Send form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200/80 bg-gray-50 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Skriv en melding i #${selectedChannel.name}...`}
              aria-label="Skriv melding"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 min-h-[44px] rounded-2xl bg-white border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <button
              type="submit"
              aria-label="Send melding"
              className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-2xl bg-orange-600 hover:bg-orange-700 text-white transition-all cursor-pointer active:scale-95 shadow-md shadow-orange-950/15"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Primary Conversations List View
  return (
    <div className="bg-[#f4f5f8] min-h-full pb-28 pt-4 px-5 space-y-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase">
            HØVÅG MENIGHET
          </p>
          <h1 role="heading" aria-level={1} className="text-2xl font-black text-gray-900 tracking-tight">
            Meldinger & Samtaler
          </h1>
        </div>
        <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-700">
          <MessageSquare className="w-5 h-5" />
        </div>
      </div>

      {/* Multi-Entity Filter Bar */}
      <EntityFilterBar />

      {/* Top Search Bar (Søk i meldinger) */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Søk i meldinger..."
          aria-label="Søk i meldinger"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 min-h-[44px] rounded-2xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
        />
      </div>

      {/* Conversations List Rows */}
      <div className="space-y-2.5">
        <h2 role="heading" aria-level={2} className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
          SAMTALER ({filteredConversations.length})
        </h2>

        {filteredConversations.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-gray-600 text-xs font-medium">
            Ingen samtaler matchet søket ditt.
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              role="button"
              tabIndex={0}
              aria-label={`Samtale: ${conv.title}, sist melding: ${conv.lastMessage}, ${conv.timestamp} siden`}
              onClick={() => {
                setSelectedChannelId(conv.id);
                setActiveChatId(conv.id);
              }}
              className="bg-white p-4 min-h-[44px] rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3.5"
            >
              {/* Avatar + Title & Preview */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div
                  className={`w-12 h-12 rounded-2xl ${conv.avatarBg} font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {conv.avatarText}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight truncate">
                      {conv.title}
                    </h3>
                    <span className="text-[11px] font-bold text-gray-700 shrink-0">
                      {conv.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-700 font-medium truncate leading-normal">
                      {conv.lastMessage}
                    </p>

                    {/* Orange unread notification badge */}
                    {conv.unreadBadge > 0 && (
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                        {conv.unreadBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

