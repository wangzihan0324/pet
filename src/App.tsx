/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MainColumns from './components/MainColumns';
import Encyclopedia from './components/Encyclopedia';
import AdoptionCenter from './components/AdoptionCenter';
import Footer from './components/Footer';
import BreedDetailModal from './components/BreedDetailModal';

import { 
  COMMUNITY_UPDATES, 
  LATEST_NEWS, 
  HOT_QUESTIONS, 
  ADOPTABLE_PETS 
} from './data';
import { Breed, Post, News, QAndA, AdoptablePet, AdoptionRequest } from './types';

export default function App() {
  // Navigation & filtering states
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Shared state managers
  const [posts, setPosts] = useState<Post[]>(COMMUNITY_UPDATES);
  const [news, setNews] = useState<News[]>(LATEST_NEWS);
  const [questions, setQuestions] = useState<QAndA[]>(HOT_QUESTIONS);
  const [pets, setPets] = useState<AdoptablePet[]>(ADOPTABLE_PETS);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);

  // Selected breed for detail popovers
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  // Count active adoptions and posts to show beautiful notification badges in the header
  const pendingAdoptionsCount = requests.filter(r => r.status === 'pending').length;
  const approvedAdoptionsCount = requests.filter(r => r.status === 'approved').length;
  const totalAdoptionsCount = requests.length;

  // Filter posts or elements based on the global header search input
  const filteredPostsBySearch = posts.filter(post => 
    searchQuery 
      ? post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleSelectBreedFromTop = (breed: Breed) => {
    setSelectedBreed(breed);
  };

  const handleGoToAdoptionFromModal = () => {
    setSelectedBreed(null);
    setActiveSection('adoption');
    setTimeout(() => {
      const el = document.getElementById('adoption');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col font-sans antialiased text-text-charcoal relative">
      
      {/* Dynamic Luminous Floating glow circles in background */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-primary-light/5 filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[5%] w-96 h-96 rounded-full bg-accent-mint/5 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/3 filter blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        adoptionCount={totalAdoptionsCount}
        myPostsCount={posts.filter(p => p.author.includes('我')).length}
      />

      {/* Main Content Arena */}
      <main className="flex-1 w-full pb-16 flex flex-col">
        
        {/* Top Hero and Categories */}
        <Hero
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSelectBreed={handleSelectBreedFromTop}
        />

        {/* Dynamic split section: Left (Featured News), Middle (Community), Right (Announcements & Widgets) */}
        <MainColumns
          news={news}
          setNews={setNews}
          posts={filteredPostsBySearch}
          setPosts={setPosts}
          questions={questions}
          setQuestions={setQuestions}
        />

        {/* Pet Encyclopedia Section */}
        <div className="w-full bg-white/35 border-y border-white/40 my-12 py-4">
          <Encyclopedia
            onSelectBreed={handleSelectBreedFromTop}
            searchQuery={searchQuery}
          />
        </div>

        {/* Adoption Center */}
        <AdoptionCenter
          pets={pets}
          setPets={setPets}
          requests={requests}
          setRequests={setRequests}
          searchQuery={searchQuery}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Scientific Breed Dossier Detail modal */}
      <BreedDetailModal
        breed={selectedBreed}
        onClose={() => setSelectedBreed(null)}
        onGoToAdoption={handleGoToAdoptionFromModal}
      />

    </div>
  );
}
