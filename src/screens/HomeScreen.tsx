import React from 'react';
import { Header } from '../components/Header';
import { HeroEventCard } from '../components/HeroEventCard';
import { UpcomingEventsList } from '../components/UpcomingEventsList';
import { ExploreGrid } from '../components/ExploreGrid';
import { AnnouncementsFeed } from '../components/AnnouncementsFeed';

export const HomeScreen: React.FC = () => {
  return (
    <div className="bg-[#f4f5f8] min-h-full pb-10">
      <Header />
      <HeroEventCard />
      <UpcomingEventsList />
      <ExploreGrid />
      <AnnouncementsFeed />
    </div>
  );
};
