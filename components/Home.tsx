import React, { useState } from 'react';
import Hero from './Hero';
import MidSection, { experts } from './MidSection';
import Dashboard from './Dashboard';
import HomeChatSection from './HomeChatSection';
import { NavLink } from '../types';

interface HomeProps {
  showChat: boolean;
  onNavigate: (tab: NavLink) => void;
}

const Home: React.FC<HomeProps> = ({ showChat, onNavigate }) => {
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);

  return (
    <>
      <Hero expert={selectedExpert} />
      <MidSection onSelect={setSelectedExpert} selectedId={selectedExpert.id} onNavigate={onNavigate} />
      <Dashboard />
      <HomeChatSection expert={selectedExpert} onSelect={setSelectedExpert} />
    </>
  );
};

export default Home;