import React from 'react';
import { useAppStore } from './store/useAppStore';
import { MobileFrame } from './components/MobileFrame';
import { HomeScreen } from './screens/HomeScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { GrupperScreen } from './screens/GrupperScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { ProfileScreen } from './screens/ProfileScreen';

import { FAB } from './components/FAB';
import { BottomTabBar } from './components/BottomTabBar';

import { NewAnnouncementModal } from './components/modals/NewAnnouncementModal';
import { EventDetailModal } from './components/modals/EventDetailModal';
import { PrayerModal } from './components/modals/PrayerModal';
import { DiakoniModal } from './components/modals/DiakoniModal';
import { PodcastModal } from './components/modals/PodcastModal';
import { DonateModal } from './components/modals/DonateModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { ServiceRotaModal } from './components/modals/ServiceRotaModal';
import { TrosopplaeringModal } from './components/modals/TrosopplaeringModal';
import { AppDrawer } from './components/AppDrawer';

export default function App() {
  const { activeTab } = useAppStore();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'hjem':
        return <HomeScreen />;
      case 'kalender':
        return <CalendarScreen />;
      case 'grupper':
        return <GrupperScreen />;
      case 'meldinger':
        return <MessagesScreen />;
      case 'profil':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      <div className="relative flex flex-col h-full w-full overflow-hidden">
        {/* Main Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {renderActiveScreen()}
        </div>

        {/* Persistent Floating Action Button */}
        <FAB />

        {/* Persistent Navigation Bar */}
        <BottomTabBar />

        {/* Interactive Modals & Drawer */}
        <AppDrawer />
        <NewAnnouncementModal />
        <EventDetailModal />
        <PrayerModal />
        <DiakoniModal />
        <PodcastModal />
        <DonateModal />
        <NotificationsModal />
        <ServiceRotaModal />
        <TrosopplaeringModal />
      </div>
    </MobileFrame>
  );
}
