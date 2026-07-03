/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Check, MessageSquare, AlertCircle, 
  Info, Sparkles, CheckCircle2, User, Phone, ClipboardList, PenTool 
} from 'lucide-react';
import { AdoptablePet, AdoptionRequest } from '../types';

interface AdoptionCenterProps {
  pets: AdoptablePet[];
  setPets: React.Dispatch<React.SetStateAction<AdoptablePet[]>>;
  requests: AdoptionRequest[];
  setRequests: React.Dispatch<React.SetStateAction<AdoptionRequest[]>>;
  searchQuery: string;
}

export default function AdoptionCenter({
  pets,
  setPets,
  requests,
  setRequests,
  searchQuery,
}: AdoptionCenterProps) {
  const [activeCity, setActiveCity] = useState<string>('全国');
  const [selectedPet, setSelectedPet] = useState<AdoptablePet | null>(null);
  const [actionType, setActionType] = useState<'adopt' | 'inquire' | null>(null);

  // Form input state
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('有丰富经验');
  const [notesInput, setNotesInput] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const cities = ['全国', '北京', '上海', '广州', '重庆', '沈阳'];

  // Toggle favorite
  const toggleFavorite = (petId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [petId]: !prev[petId] }));
  };

  // Open Form Modal
  const handleOpenForm = (pet: AdoptablePet, type: 'adopt' | 'inquire') => {
    setSelectedPet(pet);
    setActionType(type);
    setNameInput('');
    setPhoneInput('');
    setNotesInput('');
    setFormSuccess(false);
  };

  // Submit Adoption Request
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPet || !actionType) return;

    const newRequest: AdoptionRequest = {
      id: `req-${Date.now()}`,
      petId: selectedPet.id,
      petName: selectedPet.name,
      petImage: selectedPet.image,
      applicantName: nameInput,
      applicantPhone: phoneInput,
      experience: experienceInput,
      notes: notesInput || (actionType === 'adopt' ? '十分渴望领养该萌宠，自愿遵守领养协议。' : '咨询萌宠的健康和日常生活习惯。'),
      submittedAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };

    // Update global requests
    setRequests(prev => [newRequest, ...prev]);

    // Update pet status to requested in parent state
    setPets(prev => prev.map(p => {
      if (p.id === selectedPet.id) {
        return { ...p, status: 'requested' };
      }
      return p;
    }));

    // Trigger simulated "Approved" change for interactive fun
    const requestId = newRequest.id;
    setTimeout(() => {
      setRequests(prev => prev.map(r => {
        if (r.id === requestId) {
          return { ...r, status: 'approved' };
        }
        return r;
      }));
    }, 6000);

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setSelectedPet(null);
      setActionType(null);
    }, 2000);
  };

  // Filtering pets
  const filteredPets = pets.filter(pet => {
    const matchesCity = activeCity === '全国' || pet.city === activeCity;
    const matchesSearch = searchQuery
      ? pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.city.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCity && matchesSearch;
  });

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-8" id="adoption">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary/10 pb-5 gap-4">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">ADOPTION CENTER</span>
          <h2 className="text-2xl font-black text-text-charcoal flex items-center gap-2">
            <Heart size={24} className="text-primary fill-primary/20" />
            领养中心
          </h2>
          <p className="text-xs text-secondary/80 font-medium max-w-xl">
            用领养代替购买，我们为您筛选了已经完成临床体检与行为评估的高素质流浪萌宠，寻找温馨的一生归宿。
          </p>
        </div>

        {/* City Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCity === city
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white/50 text-secondary border border-white/40 hover:bg-white hover:text-text-charcoal'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Pets */}
      {filteredPets.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/50 flex flex-col items-center gap-3">
          <span className="text-3xl">🐶</span>
          <p className="text-xs font-bold text-secondary">该城市目前没有待领养的毛孩子，或者没有找到匹配的筛选条件</p>
          <button 
            onClick={() => { setActiveCity('全国'); }}
            className="text-xs text-primary font-bold hover:underline"
          >
            查看全国宠物
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPets.map((pet) => {
            const isFav = favorites[pet.id];
            return (
              <motion.div
                key={pet.id}
                layoutId={`pet-card-${pet.id}`}
                className="rounded-3xl overflow-hidden glass-card border border-white/50 shadow-md hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
              >
                {/* Photo Top 70% */}
                <div className="w-full h-48 relative overflow-hidden group">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Top tags */}
                  <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-text-charcoal font-bold text-[9px] px-2.5 py-1 rounded-full shadow-sm">
                    📍 {pet.city}
                  </span>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(pet.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:scale-110 active:scale-95 transition-all duration-300"
                  >
                    <Heart 
                      size={14} 
                      className={`transition-colors ${
                        isFav ? 'text-red-500 fill-red-500 animate-pulse' : 'text-secondary/80'
                      }`} 
                    />
                  </button>

                  {/* Vaccine info and tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-primary/90 text-white font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                      {pet.tag}
                    </span>
                  </div>
                </div>

                {/* Content Info Bottom 30% */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-secondary/60 leading-none">{pet.breed}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        pet.status === 'requested' ? 'bg-primary-light/40 text-primary animate-pulse' :
                        pet.status === 'adopted' ? 'bg-secondary-fixed text-secondary' : 'bg-success-mint/10 text-success-mint'
                      }`}>
                        {pet.status === 'requested' ? '初审中' :
                         pet.status === 'adopted' ? '已领养' : '待领养'}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-text-charcoal mt-1 text-left">{pet.name}</h3>

                    <div className="flex items-center gap-3 text-[10px] text-secondary font-semibold font-mono mt-2">
                      <span>年龄：{pet.age}</span>
                      <span>性别：{pet.gender}</span>
                    </div>

                    <p className="text-[10px] text-secondary/80 font-medium leading-relaxed mt-2 text-left line-clamp-2">
                      {pet.temperament}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleOpenForm(pet, 'inquire')}
                      disabled={pet.status === 'adopted'}
                      className="flex-1 py-2 text-[10px] font-bold text-text-charcoal bg-white hover:bg-surface border border-primary/15 rounded-full shadow-sm hover:scale-102 transition-all disabled:opacity-50"
                    >
                      咨询详情
                    </button>
                    <button
                      onClick={() => handleOpenForm(pet, 'adopt')}
                      disabled={pet.status === 'adopted' || pet.status === 'requested'}
                      className={`flex-1 py-2 text-[10px] font-extrabold text-white rounded-full shadow-md transition-all ${
                        pet.status === 'requested'
                          ? 'bg-primary/40 cursor-default shadow-none'
                          : 'bg-primary hover:bg-primary-dark hover:scale-102 shadow-primary/10'
                      }`}
                    >
                      {pet.status === 'requested' ? '申请中' : '申请领养'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Applications tracking panel */}
      {requests.length > 0 && (
        <div className="mt-8 p-6 rounded-3xl bg-white/70 border border-white/50 flex flex-col gap-4 text-left" id="adoption-requests-panel">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-secondary/80 flex items-center gap-2">
            <ClipboardList size={16} className="text-primary" />
            我的领养申请单追踪 (实时同步)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-white border border-primary/5 flex gap-4 relative overflow-hidden shadow-sm"
              >
                {/* Pet small Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/80">
                  <img src={req.petImage} alt={req.petName} className="w-full h-full object-cover" />
                </div>

                {/* Info and status */}
                <div className="flex flex-col justify-between overflow-hidden">
                  <div>
                    <h4 className="text-xs font-black text-text-charcoal">
                      申请领养 {req.petName}
                    </h4>
                    <span className="text-[9px] font-mono font-semibold text-secondary/50 mt-0.5 block">
                      提交时间：{req.submittedAt}
                    </span>
                  </div>

                  {/* Interactive Status Indicator */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-1 text-[9px] font-extrabold text-amber-500 animate-pulse">
                        <AlertCircle size={10} />
                        <span>初审中 (专家库智能评审)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[9px] font-extrabold text-success-mint">
                        <CheckCircle2 size={10} className="fill-success-mint text-white" />
                        <span>恭喜！初审通过 (请注意接听来电)</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Form Modal */}
      <AnimatePresence>
        {selectedPet && actionType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedPet(null); setActionType(null); }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md glass-card rounded-[28px] p-8 overflow-hidden border border-white/60 z-10 text-left"
            >
              {/* Pet Quick Info Banner */}
              <div className="flex gap-4 p-4 rounded-2xl bg-primary-light/10 border border-primary-light/20 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/80 shadow-sm">
                  <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-bold text-secondary">{selectedPet.breed} • {selectedPet.city}</span>
                  <h4 className="text-base font-black text-text-charcoal mt-0.5">{selectedPet.name}</h4>
                </div>
                <span className="ml-auto px-2.5 py-1 bg-primary text-white text-[9px] font-bold rounded-full h-fit">
                  {actionType === 'adopt' ? '领养申请' : '详情咨询'}
                </span>
              </div>

              {formSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-success-mint/10 text-success-mint flex items-center justify-center shadow-inner animate-bounce">
                    <Check size={28} className="stroke-[3]" />
                  </div>
                  <span className="font-bold text-text-charcoal text-base">申请单提交成功！</span>
                  <p className="text-xs text-secondary/60 leading-relaxed max-w-xs">
                    正在连线宠大王后台专家库，申请将在 5 秒后实时同步初审反馈。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">
                      您的姓名 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="请输入姓名"
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container/50 border border-white/30 text-xs focus:outline-none"
                      />
                      <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">
                      联系手机号码 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        pattern="^1[3-9]\d{9}$"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="请输入11位中国手机号"
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container/50 border border-white/30 text-xs focus:outline-none font-mono"
                      />
                      <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">养宠经验</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['有丰富经验', '新手家长'].map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setExperienceInput(exp)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            experienceInput === exp
                              ? 'bg-primary text-white border-transparent'
                              : 'bg-white/60 text-secondary border-white/40'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">
                      备注说明 / 期望咨询的重点
                    </label>
                    <textarea
                      rows={2}
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder={actionType === 'adopt' ? '请简单描述您家的条件和对毛孩子的规划...' : '例如：是否绝育、驱虫计划、疫苗接种详情等...'}
                      className="w-full p-3 rounded-xl bg-surface-container/50 border border-white/30 text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedPet(null); setActionType(null); }}
                      className="flex-1 py-2.5 rounded-full bg-white/40 hover:bg-white/60 text-text-charcoal font-bold text-xs border border-white/40 transition-colors"
                    >
                      返回
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/10 transition-transform hover:scale-102"
                    >
                      提交线上初审
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
