/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, Mail, Phone, MapPin, ExternalLink, ShieldCheck, 
  Sparkles, CheckCircle2 
} from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 2500);
  };

  return (
    <footer className="w-full bg-[#161d1f] text-[#ebf2f4] border-t border-white/5 py-16" id="about">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white text-lg font-bold">👑</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                宠大王 <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-mono font-medium">2026</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#a8b5b8] font-semibold">Premium Pet Portal</span>
            </div>
          </div>
          <p className="text-xs text-[#a8b5b8]/80 leading-relaxed font-medium">
            宠大王是针对次世代高端养宠家庭匠心定制的生物科技与温情护理相融合的生态服务平台。
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <ShieldCheck size={14} /> 国外内知名兽医协会推荐
            </span>
          </div>
        </div>

        {/* Column 2: 联系我们 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary">联系我们</h4>
          <ul className="flex flex-col gap-3 text-xs text-[#a8b5b8] font-medium">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-primary" />
              <span>400-888-2026</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-primary" />
              <span>support@chongdawang.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
              <span>北京市海淀区科技孵化园区 2026 宠大王大厦 B 座</span>
            </li>
          </ul>
        </div>

        {/* Column 3: 关于我们 / 快捷导航 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary">服务与研究</h4>
          <ul className="flex flex-col gap-3 text-xs text-[#a8b5b8] font-medium">
            <li className="hover:text-white cursor-pointer transition-colors flex items-center justify-between">
              <span>宠物医学科学实验室</span>
              <ExternalLink size={10} className="opacity-40" />
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center justify-between">
              <span>高端定制犬猫免疫配方</span>
              <ExternalLink size={10} className="opacity-40" />
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center justify-between">
              <span>纯种犬猫基因测序数据库</span>
              <ExternalLink size={10} className="opacity-40" />
            </li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center justify-between">
              <span>流浪动物无痛绝育(TNR)计划</span>
              <ExternalLink size={10} className="opacity-40" />
            </li>
          </ul>
        </div>

        {/* Column 4: 订阅服务 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary">科学育宠订阅</h4>
          <p className="text-xs text-[#a8b5b8]/80 leading-relaxed font-medium">
            获取宠大王兽医师团队每周推送的深度科普指南，并可获得专家问答优先特权。
          </p>
          
          <form onSubmit={handleSubscribe} className="flex gap-2 mt-2 w-full">
            {subscribed ? (
              <div className="flex items-center gap-1 text-xs text-primary font-bold animate-pulse py-2">
                <CheckCircle2 size={14} className="text-primary" />
                <span>订阅成功！每周准时送达您的收件箱</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="您的电子邮箱..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs placeholder-secondary/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark font-extrabold text-xs shrink-0"
                >
                  订阅
                </button>
              </>
            )}
          </form>
        </div>

      </div>

      {/* Deep Copyright section */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8b5b8]/50 font-medium">
        <span className="font-mono">
          © 2026 宠大王 Premium Pet Portal. 版权所有。
        </span>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer transition-colors">隐私政策</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition-colors">用户协议</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition-colors">增值电信业务许可证 2026-0815</span>
        </div>
      </div>
    </footer>
  );
}
