/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, User, Heart, MessageSquare, Bell, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  adoptionCount: number;
  myPostsCount: number;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
  adoptionCount,
  myPostsCount,
}: HeaderProps) {
  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'community', label: '社区' },
    { id: 'qna', label: '问答' },
    { id: 'encyclopedia', label: '百科' },
    { id: 'adoption', label: '领养' },
    { id: 'services', label: '服务' },
    { id: 'about', label: '关于' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/40 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="header-logo-container"
        >
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-xl font-bold font-mono">👑</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-xl tracking-tight text-text-charcoal flex items-center gap-1">
              宠大王 <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-mono font-medium">2026</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Premium Pet Portal</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative hidden md:block" id="header-search-container">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary">
            <Search size={18} className="stroke-[2.5]" />
          </div>
          <input
            type="text"
            placeholder="搜索百科、领养宠物、社区资讯..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-20 py-2.5 rounded-full bg-surface-container/50 text-text-charcoal text-sm font-medium border border-white/40 placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-xs text-secondary/60 hover:text-text-charcoal font-medium"
            >
              清除
            </button>
          )}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-white font-semibold text-xs rounded-full shadow-sm">
            搜索
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1" id="header-nav-container">
          {navItems.map((item) => {
            const isActive = activeSection === item.id || (item.id === 'home' && activeSection === '');
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  // Scroll to corresponding view if homepage
                  if (item.id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/10 scale-102'
                    : 'text-text-charcoal/80 hover:text-primary hover:bg-white/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Actions & Badges */}
        <div className="flex items-center gap-2 md:gap-3" id="header-actions-container">
          {/* My Adoptions Badge Button */}
          <button
            onClick={() => {
              setActiveSection('adoption');
              setTimeout(() => {
                const el = document.getElementById('adoption-requests-panel');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white border border-white/50 relative hover:scale-105 transition-all duration-300 group"
            title="领养记录"
          >
            <Heart size={18} className="text-primary group-hover:fill-primary transition-all duration-300" />
            {adoptionCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {adoptionCount}
              </span>
            )}
          </button>

          {/* My Posts Badge Button */}
          <button
            onClick={() => {
              setActiveSection('community');
              setTimeout(() => {
                const el = document.getElementById('community-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white border border-white/50 relative hover:scale-105 transition-all duration-300 group hidden sm:block"
            title="我的社区动态"
          >
            <MessageSquare size={18} className="text-accent-mint" />
            {myPostsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {myPostsCount}
              </span>
            )}
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/50">
            <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center overflow-hidden border border-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-xs font-bold text-text-charcoal leading-none">宠主达人</span>
              <span className="text-[9px] text-secondary font-medium mt-0.5">Lv.4 黄金会员</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
