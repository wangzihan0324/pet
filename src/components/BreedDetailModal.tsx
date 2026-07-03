/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Shield, Clock, Award, Activity, Apple, Sparkles } from 'lucide-react';
import { Breed } from '../types';

interface BreedDetailModalProps {
  breed: Breed | null;
  onClose: () => void;
  onGoToAdoption: () => void;
}

export default function BreedDetailModal({
  breed,
  onClose,
  onGoToAdoption,
}: BreedDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'nutrition' | 'exercise' | 'grooming'>('nutrition');

  if (!breed) return null;

  const defaultDetails = {
    origin: breed.origin || '未知区域',
    lifespan: breed.lifespan || '10-14 年',
    temperament: breed.temperament || '活泼温顺、亲人友好',
    description: breed.description || '该品种具备极强的伴侣动物特质，深受全球爱宠人士喜爱。',
    nutrition: '建议日常采用中高蛋白质（大于28%）的无谷物狗粮/猫粮，配以少量的冻干和新鲜熟肉。幼犬/幼猫需补充钙片和卵磷脂促进骨骼毛发生长。',
    exercise: '日常需要中等强度的户外运动。小型宠1-2小时，大型犬建议保证每日2-3小时的活动量，避免长期关养产生心理应激和破坏行为。',
    grooming: '该品种日常护理较为方便。长毛宠需每日精细梳毛以防止毛结产生，并建议每2-3周进行洗眼洗耳护理，保持清洁干爽防止耳螨。'
  };

  const tabContents = [
    { id: 'nutrition', label: '营养膳食', icon: <Apple size={14} />, text: defaultDetails.nutrition },
    { id: 'exercise', label: '精力管理', icon: <Activity size={14} />, text: defaultDetails.exercise },
    { id: 'grooming', label: '毛发清洁', icon: <Sparkles size={14} />, text: defaultDetails.grooming }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
        ></motion.div>

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg glass-card rounded-[32px] overflow-hidden border border-white/60 z-10 shadow-2xl flex flex-col max-h-[90vh] text-left"
        >
          {/* Header Image Cover */}
          <div className="w-full h-52 relative overflow-hidden border-b border-white/40 shrink-0">
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 hover:scale-105 transition-all duration-300"
            >
              <X size={18} />
            </button>

            {/* Breed Name overlay */}
            <div className="absolute bottom-5 left-6 flex flex-col gap-1 items-start">
              <span className="text-[10px] bg-primary text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {breed.category === 'dog' ? '🐾 宠物狗' : breed.category === 'cat' ? '🐈 猫咪' : '🐹 奇特小宠'}
              </span>
              <h3 className="text-2xl font-black text-white flex items-center gap-2 mt-1 drop-shadow-md">
                {breed.name}
              </h3>
            </div>
          </div>

          {/* Details Content Container */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            {/* Vital Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-primary-light/10 border border-primary-light/20 flex flex-col items-center justify-center text-center">
                <Shield size={16} className="text-primary mb-1" />
                <span className="text-[9px] text-secondary font-bold font-mono">原产地</span>
                <span className="text-xs font-black text-text-charcoal mt-0.5 truncate max-w-full">{defaultDetails.origin}</span>
              </div>
              <div className="p-3 rounded-2xl bg-primary-light/10 border border-primary-light/20 flex flex-col items-center justify-center text-center">
                <Clock size={16} className="text-primary mb-1" />
                <span className="text-[9px] text-secondary font-bold font-mono">预期寿命</span>
                <span className="text-xs font-black text-text-charcoal mt-0.5 truncate max-w-full">{defaultDetails.lifespan}</span>
              </div>
              <div className="p-3 rounded-2xl bg-primary-light/10 border border-primary-light/20 flex flex-col items-center justify-center text-center">
                <Award size={16} className="text-primary mb-1" />
                <span className="text-[9px] text-secondary font-bold font-mono">档案编号</span>
                <span className="text-xs font-black text-text-charcoal mt-0.5 font-mono truncate max-w-full">{breed.code}</span>
              </div>
            </div>

            {/* Temperament */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">性情表征</span>
              <div className="px-4 py-2 bg-white/55 border border-white/40 rounded-xl text-xs font-bold text-text-charcoal flex flex-wrap gap-1.5">
                {defaultDetails.temperament.split('、').map((temp, i) => (
                  <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-md">
                    {temp}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">科学叙述</span>
              <p className="text-xs text-text-charcoal/80 font-medium leading-relaxed bg-white/40 p-4 rounded-xl border border-white/30 text-left">
                {defaultDetails.description}
              </p>
            </div>

            {/* Interactive Care Instruction Tabs */}
            <div className="flex flex-col gap-3 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">健康养护指南</span>
              <div className="flex items-center gap-2 border-b border-primary/5 pb-2">
                {tabContents.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => setActiveTab(tc.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 border ${
                      activeTab === tc.id
                        ? 'bg-primary text-white border-transparent'
                        : 'bg-white/45 text-secondary border-white/30 hover:bg-white/70'
                    }`}
                  >
                    {tc.icon}
                    <span>{tc.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-primary-light/5 border border-primary-light/10 text-xs text-secondary/90 leading-relaxed font-semibold">
                {tabContents.find(t => t.id === activeTab)?.text}
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="p-6 border-t border-primary/5 flex gap-3 shrink-0 bg-white/10">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-white/60 hover:bg-white text-text-charcoal font-bold text-xs border border-white/40 transition-colors"
            >
              关闭档案
            </button>
            <button
              onClick={onGoToAdoption}
              className="flex-1 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/10 transition-transform hover:scale-102 flex items-center justify-center gap-1"
            >
              <Heart size={14} className="fill-white" />
              <span>寻找领养同款</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
