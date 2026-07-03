/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, BookOpen, Clock, Heart, Award, Check } from 'lucide-react';
import { Breed } from '../types';
import { CATEGORIES, TOP_BREEDS } from '../data';

interface HeroProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSelectBreed: (breed: Breed) => void;
}

export default function Hero({
  selectedCategory,
  setSelectedCategory,
  onSelectBreed,
}: HeroProps) {
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customBreedName, setCustomBreedName] = useState('');
  const [customBreedCat, setCustomBreedCat] = useState('dog');
  const [submittedCustom, setSubmittedCustom] = useState(false);

  const handleAddCustomBreed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBreedName.trim()) return;
    setSubmittedCustom(true);
    setTimeout(() => {
      setSubmittedCustom(false);
      setShowAddCustom(false);
      setCustomBreedName('');
    }, 2000);
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-6 pt-8 pb-12 flex flex-col gap-10">
      
      {/* Category Pills */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none" id="categories-container">
        <div className="flex items-center gap-3 md:justify-center min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-102 border-transparent'
                    : 'bg-white/70 hover:bg-white text-text-charcoal border border-white/40 hover:scale-101'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Circular Breed Avatars Section */}
      <div className="flex flex-col gap-4" id="breed-avatars-section">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary/80 flex items-center gap-2">
            <Sparkles size={16} className="text-primary animate-pulse" />
            热门品种速览
          </h2>
          <span className="text-xs text-secondary/60 font-semibold font-mono">点击头像查看科普档案</span>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 justify-items-center">
          {TOP_BREEDS.map((breed, index) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => onSelectBreed(breed)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-primary-light via-white to-primary/40 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-primary/5">
                <div className="w-full h-full rounded-full overflow-hidden border border-white relative">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white scale-90 font-mono">
                  {index + 1}
                </span>
              </div>
              <span className="text-xs font-bold text-text-charcoal group-hover:text-primary transition-colors text-center truncate w-20">
                {breed.name}
              </span>
              <span className="text-[9px] font-semibold text-secondary/60 uppercase tracking-wider font-mono scale-90">
                {breed.code}
              </span>
            </motion.div>
          ))}

          {/* Add custom breed circle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            onClick={() => setShowAddCustom(true)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center bg-white/40 hover:bg-white hover:border-primary/60 hover:scale-105 transition-all duration-300">
              <Plus size={24} className="text-primary/60 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors text-center">
              定制详情
            </span>
            <span className="text-[9px] font-semibold text-secondary/40 font-mono scale-90">
              SUBMIT_REQ
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Hero Banner */}
      <div 
        className="w-full h-[320px] md:h-[380px] rounded-[32px] overflow-hidden relative glass-card shadow-2xl border border-white/60 flex flex-col md:flex-row items-center justify-between"
        id="main-hero-banner"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-light/10 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-mint/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        {/* Left Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col items-start gap-4 z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light/40 border border-primary-light text-primary font-bold text-xs uppercase tracking-widest rounded-full">
            <Sparkles size={12} />
            $116.00 / YEAR PREMIUM CODES
          </div>
          <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-text-charcoal leading-tight max-w-lg">
            您的爱宠世界，尊享升级：
            <span className="text-primary block mt-1">探索高端护理与和谐社区</span>
          </h1>
          <p className="text-sm md:text-base text-secondary/80 font-medium max-w-md">
            宠大王为您提供极致的宠物百科、社区交流、专家问答及安心领养服务。让爱宠在科技与温情的陪伴下快乐成长。
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => {
                const el = document.getElementById('adoption-center-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-primary text-white hover:bg-primary-dark font-extrabold text-sm rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300"
            >
              立即探索领养
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('community-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white hover:bg-surface-container/60 text-text-charcoal font-bold text-sm rounded-full border border-primary/20 hover:scale-105 transition-all duration-300"
            >
              加入社区
            </button>
          </div>
        </div>

        {/* Right Photo Area */}
        <div className="flex-1 h-full w-full md:w-1/2 relative overflow-hidden hidden md:block">
          {/* We frame it using organic squircle shapes or nice borders */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/30 z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
            alt="Golden Retriever and Persian Cat"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-[8000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Floater Glass Badges */}
          <div className="absolute top-8 right-8 glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-text-charcoal shadow-sm">
            <Award size={14} className="text-primary" />
            <span>智能生物护理体系</span>
          </div>
          <div className="absolute bottom-8 left-8 glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-text-charcoal shadow-sm">
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>5000+ 宠物已入驻</span>
          </div>
        </div>
      </div>

      {/* Add Custom Breed Request Modal */}
      <AnimatePresence>
        {showAddCustom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCustom(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-[28px] p-8 overflow-hidden border border-white/60 z-10"
            >
              <h3 className="text-xl font-extrabold text-text-charcoal mb-2 flex items-center gap-2">
                🐾 订制专属宠物档案
              </h3>
              <p className="text-xs text-secondary/80 mb-6 font-medium leading-relaxed">
                如果您需要某一个特定宠物品种的详细科学科普档案，请在这里提交请求。我们的宠大王生物专家团队将在24小时内上线该条目。
              </p>

              {submittedCustom ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-success-mint/10 text-success-mint flex items-center justify-center shadow-inner">
                    <Check size={28} className="stroke-[3]" />
                  </div>
                  <span className="font-bold text-text-charcoal text-base">提交成功！</span>
                  <p className="text-xs text-secondary/60">正在为您生成专属科普请求编号，并通知专家库...</p>
                </div>
              ) : (
                <form onSubmit={handleAddCustomBreed} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">品种名称 (例如: 萨摩耶、布偶猫)</label>
                    <input
                      type="text"
                      required
                      value={customBreedName}
                      onChange={(e) => setCustomBreedName(e.target.value)}
                      placeholder="请输入宠物品种中文全称"
                      className="w-full px-4 py-2.5 rounded-2xl bg-surface-container/50 border border-white/30 text-text-charcoal text-sm placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">分类</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'dog', label: '宠物狗' },
                        { id: 'cat', label: '猫咪' },
                        { id: 'other', label: '其它小宠' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCustomBreedCat(item.id)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                            customBreedCat === item.id
                              ? 'bg-primary text-white border-transparent'
                              : 'bg-white/60 text-secondary border-white/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddCustom(false)}
                      className="flex-1 py-3 rounded-full bg-white/40 hover:bg-white/60 text-text-charcoal font-bold text-xs border border-white/40 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/10 transition-transform hover:scale-102"
                    >
                      提交专家审核
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
