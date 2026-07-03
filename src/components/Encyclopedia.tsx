/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, X, Heart, Shield, Clock, Award } from 'lucide-react';
import { Breed } from '../types';
import { ENCYCLOPEDIA_BREEDS } from '../data';

interface EncyclopediaProps {
  onSelectBreed: (breed: Breed) => void;
  searchQuery: string;
}

export default function Encyclopedia({
  onSelectBreed,
  searchQuery,
}: EncyclopediaProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat' | 'other'>('all');

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'dog', label: '狗狗百科' },
    { id: 'cat', label: '猫咪百科' },
    { id: 'other', label: '小宠百科' }
  ];

  // Filtering logic
  const filteredBreeds = ENCYCLOPEDIA_BREEDS.filter(breed => {
    // Category filter
    const matchesCategory = 
      activeFilter === 'all' || 
      (activeFilter === 'other' && breed.category !== 'dog' && breed.category !== 'cat') ||
      breed.category === activeFilter;
    
    // Search query filter
    const matchesSearch = searchQuery 
      ? breed.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        breed.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-8" id="encyclopedia">
      
      {/* Header info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary/10 pb-5 gap-4">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">ENCYCLOPEDIA</span>
          <h2 className="text-2xl font-black text-text-charcoal flex items-center gap-2">
            <BookOpen size={24} className="text-primary" />
            宠物百科科学档案
          </h2>
          <p className="text-xs text-secondary/80 font-medium max-w-xl">
            提供经过资深兽医及遗传学家审核的全面、严谨的伴侣动物性情、原产地、预期寿命及健康养护知识库。
          </p>
        </div>

        {/* Local Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                activeFilter === tab.id
                  ? 'bg-primary text-white border-transparent shadow-md'
                  : 'bg-white/50 text-secondary border-white/40 hover:bg-white hover:text-text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Encyclopedia Circular Cards */}
      {filteredBreeds.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/50 flex flex-col items-center gap-3">
          <span className="text-3xl">🔍</span>
          <p className="text-xs font-bold text-secondary">没有找到匹配该检索词的宠物品种档案</p>
          <button 
            onClick={() => setActiveFilter('all')}
            className="text-xs text-primary font-bold hover:underline"
          >
            重置分类
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 justify-items-center">
          {filteredBreeds.map((breed, index) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
              onClick={() => onSelectBreed(breed)}
              className="flex flex-col items-center gap-2.5 group cursor-pointer"
            >
              {/* Image Circle Container */}
              <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-white to-primary/20 group-hover:to-primary/50 group-hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden border border-white relative">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              {/* Label Info */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-text-charcoal group-hover:text-primary transition-colors text-center">
                  {breed.name}
                </span>
                <span className="text-[9px] font-semibold text-secondary/50 font-mono mt-0.5 scale-90">
                  {breed.code}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </section>
  );
}
