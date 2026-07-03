/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageSquare, Eye, Share2, Plus, CornerDownRight, 
  HelpCircle, ChevronDown, ChevronUp, Star, Award, MessageCircle, Send, Check,
  Calendar, ChevronRight, Volume2
} from 'lucide-react';
import { News, Post, QAndA, LeaderboardUser } from '../types';
import { LEADERBOARD, SIDEBAR_UPDATES } from '../data';

interface MainColumnsProps {
  news: News[];
  setNews: React.Dispatch<React.SetStateAction<News[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  questions: QAndA[];
  setQuestions: React.Dispatch<React.SetStateAction<QAndA[]>>;
}

export default function MainColumns({
  news,
  setNews,
  posts,
  setPosts,
  questions,
  setQuestions,
}: MainColumnsProps) {
  // News state
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  // Sidebar updates state
  const [selectedUpdate, setSelectedUpdate] = useState<typeof SIDEBAR_UPDATES[0] | null>(null);

  // New post form state
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400');

  // Comment input state per post
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Q&A expand state
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [answeringQuestion, setAnsweringQuestion] = useState(false);

  // Monthly Star voting state
  const [starVotes, setStarVotes] = useState(1288);
  const [votedForStar, setVotedForStar] = useState(false);

  // Handlers for News
  const handleLikeNews = (newsId: string) => {
    setNews(prev => prev.map(item => {
      if (item.id === newsId) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }));
    if (selectedNews && selectedNews.id === newsId) {
      setSelectedNews(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  // Handlers for Community Posts
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByMe;
        return { 
          ...post, 
          likedByMe: liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `p-new-${Date.now()}`,
      author: '宠主达人 (我)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      time: '刚刚',
      content: newPostContent,
      images: newPostImage ? [newPostImage] : [],
      likes: 0,
      comments: 0,
      commentList: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowNewPostForm(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const updatedComments = post.commentList || [];
        return {
          ...post,
          comments: post.comments + 1,
          commentList: [
            ...updatedComments,
            {
              author: '宠主达人 (我)',
              content: commentText,
              time: '刚刚'
            }
          ]
        };
      }
      return post;
    }));

    setCommentText('');
    setActiveCommentPostId(null);
  };

  // Handlers for Q&As
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setAnsweringQuestion(true);
    const questionText = newQuestionText;
    setNewQuestionText('');

    setTimeout(() => {
      const generatedAnswers = [
        "这是一个非常好的养宠问题！根据宠大王专家的经验，建议您平时多注意宠物的饮食温度和日常疫苗接种，如果是行为异常，则需要结合运动量来调整。",
        "感谢您的提问。针对这种情况，通常可以采用少食多餐的原则进行肠胃过渡，辅以适量的户外散步。如果持续未改善，建议带爱宠做一下血常规检测。",
        "您好，宠大王AI助理为您解答：这种情况在幼龄宠物中很常见，主要是环境应激导致的。可以通过提供保暖、静音环境，并在饮水中加入适量电解多维来进行调理。"
      ];
      const randomAnswer = generatedAnswers[Math.floor(Math.random() * generatedAnswers.length)];

      const newQA: QAndA = {
        id: `q-new-${Date.now()}`,
        question: questionText,
        views: 12,
        category: '用户咨询',
        answer: randomAnswer
      };

      setQuestions(prev => [newQA, ...prev]);
      setExpandedQuestionId(newQA.id);
      setAnsweringQuestion(false);
    }, 1500);
  };

  // Monthly star vote
  const handleVoteForStar = () => {
    if (votedForStar) return;
    setStarVotes(prev => prev + 1);
    setVotedForStar(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1280px] mx-auto px-6 py-6" id="community-section">
      
      {/* Column 1: 精选新闻 */}
      <div className="lg:col-span-3 flex flex-col gap-5" id="news-column">
        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
          <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
            <Star size={18} className="text-primary fill-primary/20" />
            精选新闻
          </h2>
          <span className="text-[10px] bg-primary-light/40 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            FEATURED
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {news.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group glass-card rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col border border-white/50"
            >
              {/* Image */}
              <div 
                onClick={() => setSelectedNews(item)}
                className="w-full h-44 overflow-hidden relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Pane */}
              <div className="p-5 flex flex-col gap-3">
                <h3 
                  onClick={() => setSelectedNews(item)}
                  className="text-sm font-bold text-text-charcoal leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-2"
                >
                  {item.title}
                </h3>
                <p className="text-xs text-secondary/80 font-medium leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Author & Metrics */}
                <div className="flex items-center justify-between pt-2 border-t border-primary/5 text-[10px] text-secondary font-semibold font-mono">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.authorAvatar}
                      alt={item.author}
                      className="w-5 h-5 rounded-full object-cover border border-primary/10"
                    />
                    <span className="text-text-charcoal font-bold">{item.author}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye size={12} className="text-secondary/60" />
                      {item.views}
                    </span>
                    <button 
                      onClick={() => handleLikeNews(item.id)}
                      className="flex items-center gap-1 hover:text-primary transition-colors group/like"
                    >
                      <Heart size={12} className="text-secondary/60 group-hover/like:text-primary group-hover/like:fill-primary" />
                      {item.likes}
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Column 2: 社区动态 */}
      <div className="lg:col-span-5 flex flex-col gap-5" id="posts-column">
        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
          <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
            <MessageSquare size={18} className="text-accent-mint" />
            社区动态
          </h2>
          <button
            onClick={() => setShowNewPostForm(prev => !prev)}
            className="flex items-center gap-1 text-[10px] font-extrabold text-white bg-accent-mint px-2.5 py-1 rounded-full shadow-sm hover:scale-105 transition-all"
          >
            <Plus size={12} />
            发布动态
          </button>
        </div>

        {/* New Post Form */}
        <AnimatePresence>
          {showNewPostForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddPost}
              className="p-5 rounded-3xl bg-white/90 border border-white/60 shadow-md flex flex-col gap-3 overflow-hidden"
            >
              <textarea
                required
                rows={3}
                placeholder="分享您与毛孩子的日常趣事或精美图片..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full p-3 rounded-2xl bg-surface/50 border border-white text-xs placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-charcoal font-medium resize-none"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary">配图 URL:</span>
                <input
                  type="text"
                  placeholder="可选，输入网络图片地址"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-surface/50 border border-white text-[10px] focus:outline-none"
                />
              </div>

              {newPostImage && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white relative group self-start">
                  <img src={newPostImage} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setNewPostImage('')}
                    className="absolute inset-0 bg-black/40 text-white text-[10px] flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    删除
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-4 py-1.5 rounded-full bg-white text-secondary font-bold text-xs border border-white/50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-accent-mint text-white font-extrabold text-xs shadow-md shadow-accent-mint/10"
                >
                  确认发表
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Posts List */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-5 rounded-3xl bg-white/70 border border-white/50 flex flex-col gap-4 shadow-sm"
            >
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover border border-primary/10"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-text-charcoal leading-none">{post.author}</span>
                    <span className="text-[9px] font-semibold text-secondary/60 font-mono mt-1">{post.time}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary-light/40">
                  达人动态
                </span>
              </div>

              {/* Text Content */}
              <p className="text-xs text-text-charcoal/90 font-medium leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Post Images Grid */}
              {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {post.images.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden h-36 border border-white/50">
                      <img src={img} alt="Post Attachment" className="w-full h-full object-cover hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              )}

              {/* Action bar */}
              <div className="flex items-center gap-4 border-t border-primary/5 pt-3 text-[10px] text-secondary font-semibold font-mono">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.likedByMe ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  <Heart size={14} className={post.likedByMe ? 'fill-primary text-primary' : ''} />
                  <span>{post.likes} 赞</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 hover:text-accent-mint transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>{post.comments} 回复</span>
                </button>

                <button className="flex items-center gap-1.5 ml-auto hover:text-text-charcoal transition-colors">
                  <Share2 size={12} />
                  <span>分享</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="flex flex-col gap-2 mt-1">
                {/* Existing comments list */}
                {post.commentList && post.commentList.length > 0 && (
                  <div className="flex flex-col gap-2 p-3 rounded-2xl bg-surface/50 border border-white/30">
                    {post.commentList.map((comm, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-[10px] text-secondary">
                        <CornerDownRight size={10} className="text-primary/40 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-extrabold text-text-charcoal">{comm.author}：</span>
                          <span className="font-medium text-text-charcoal/80">{comm.content}</span>
                          <span className="font-mono text-[9px] text-secondary/50 ml-1.5 font-normal">{comm.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply bar */}
                {activeCommentPostId === post.id && (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="写下您的精彩回复..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 px-3 py-2 rounded-xl bg-surface/40 border border-white/60 text-xs text-text-charcoal placeholder-secondary/50 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 rounded-xl bg-accent-mint text-white hover:scale-105 transition-transform"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Column 3: 最新动态 + 热门问答 + 每月之星 + 排行榜 */}
      <div className="lg:col-span-4 flex flex-col gap-8" id="qa-star-leaderboard-column">
        
        {/* Sub-section 0: 最新动态 */}
        <div className="flex flex-col gap-4" id="sidebar-updates-section">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
              <Volume2 size={18} className="text-primary animate-bounce" />
              最新动态
            </h2>
            <span className="text-xs text-primary font-bold hover:underline cursor-pointer">查看全部</span>
          </div>

          <div className="flex flex-col gap-4">
            {SIDEBAR_UPDATES.map((update, idx) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedUpdate(update)}
                className="p-4 rounded-2xl bg-white/70 hover:bg-white border border-white/50 cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex gap-4 group"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/60">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-between overflow-hidden">
                  <h3 className="text-xs font-bold text-text-charcoal leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-secondary font-semibold font-mono mt-1">
                    <Calendar size={10} />
                    <span>{update.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative prompt card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-primary-light/20 to-primary/10 border border-white/40 flex flex-col items-start gap-2 relative overflow-hidden shadow-inner">
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary leading-none">宠医专栏</span>
            <h4 className="text-xs font-black text-text-charcoal leading-snug">
              2026年夏季猫狗防暑指南已更新
            </h4>
            <p className="text-[10px] text-secondary/80 font-medium">
              特邀宠大王首席执业兽医师为您量身定制的宠物防暑指南。
            </p>
            <button 
              onClick={() => setSelectedUpdate({
                id: 'guide-summer',
                title: '2026年夏季猫狗防暑指南与中暑急救',
                date: '2026-07-03',
                image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=200',
                summary: '夏季来临气温升高，宠物极易发生热射病或脱水。首要原则是避免在上午10点至下午4点带爱宠进行剧烈户外运动，随时提供充足凉爽的饮用水。若发现狗狗张口剧烈喘气、口吐白沫、步态不稳，应立即用湿毛巾包裹头部和腹部物理降温，并紧急送往合作医院。'
              })}
              className="mt-1 text-[10px] font-bold text-primary flex items-center hover:translate-x-1 transition-transform"
            >
              免费阅读 <ChevronRight size={12} />
            </button>
          </div>
        </div>
        
        {/* Sub-section 1: 热门问答 */}
        <div className="flex flex-col gap-4" id="popular-qna-block">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
              <HelpCircle size={18} className="text-primary" />
              热门问答
            </h2>
            <span className="text-[10px] bg-primary-light/40 text-primary px-2 py-0.5 rounded-full font-bold">
              Q&A
            </span>
          </div>

          {/* Ask dynamic Question */}
          <form onSubmit={handleAskQuestion} className="flex items-center gap-2 mb-1">
            <input
              type="text"
              required
              placeholder="在线提问，专家智能解答..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/75 border border-white/50 text-xs placeholder-secondary/50 text-text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="submit"
              disabled={answeringQuestion}
              className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shrink-0 flex items-center gap-1 shadow-md shadow-primary/10 disabled:opacity-50"
            >
              {answeringQuestion ? '思考中...' : '提问'}
            </button>
          </form>

          {/* Q&A Accordion */}
          <div className="flex flex-col gap-3">
            {questions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="w-full px-4 py-3 flex items-start justify-between gap-3 text-left hover:bg-white/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary-light text-primary mt-0.5">
                        {q.category}
                      </span>
                      <span className="text-xs font-bold text-text-charcoal leading-snug">
                        {q.question}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={14} className="text-secondary/60 shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown size={14} className="text-secondary/60 shrink-0 mt-0.5" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-primary/5 bg-white/60 p-4"
                      >
                        <p className="text-xs text-secondary/90 leading-relaxed font-medium pl-2 border-l-2 border-primary/30">
                          {q.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-section 2: 每月之星 */}
        <div className="flex flex-col gap-4" id="star-of-month-block">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
              <Award size={18} className="text-primary" />
              每月之星
            </h2>
            <span className="text-xs text-secondary/60 font-semibold font-mono">STAR OF THE MONTH</span>
          </div>

          <div className="rounded-3xl overflow-hidden glass-card p-5 border border-white/60 flex flex-col gap-4 relative shadow-lg">
            {/* Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-[9px] tracking-wider shadow-sm uppercase">
              🏆 2026 耀眼双星
            </div>

            {/* Photo */}
            <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-white/50 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400"
                alt="Puppy and kitten"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content info */}
            <div className="flex flex-col">
              <h3 className="text-sm font-black text-text-charcoal">金毛 & 狸花猫 治愈拍档</h3>
              <p className="text-xs text-secondary/80 font-medium leading-relaxed mt-1">
                社区高人气治愈宠物榜首组合，以其和谐的日常生活分享温暖了数十万宠友。
              </p>
            </div>

            {/* Vote Interactive */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex flex-col">
                <span className="text-[9px] text-secondary font-bold font-mono uppercase tracking-wider">当前得票数</span>
                <span className="text-sm font-black text-primary font-mono">{starVotes} 票</span>
              </div>
              <button
                onClick={handleVoteForStar}
                className={`px-5 py-2 rounded-full font-extrabold text-xs shadow-md transition-all duration-300 flex items-center gap-1.5 ${
                  votedForStar
                    ? 'bg-success-mint text-white cursor-default'
                    : 'bg-primary hover:bg-primary-dark text-white hover:scale-105 active:scale-95 shadow-primary/10'
                }`}
              >
                {votedForStar ? (
                  <>
                    <Check size={12} />
                    <span>投票成功</span>
                  </>
                ) : (
                  <>
                    <Heart size={12} className="fill-white" />
                    <span>投它一票</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-section 3: 达人排行榜 */}
        <div className="flex flex-col gap-4" id="leaderboard-block">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <h2 className="text-base font-extrabold text-text-charcoal flex items-center gap-2">
              <Award size={18} className="text-primary" />
              社区贡献榜
            </h2>
            <span className="text-[10px] bg-primary-light/40 text-primary px-2 py-0.5 rounded-full font-bold">
              RANKING
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {LEADERBOARD.map((user) => {
              // Custom rank visual style
              const isFirst = user.rank === 1;
              const isSecond = user.rank === 2;
              const isThird = user.rank === 3;

              return (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-white/30 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      isFirst ? 'bg-amber-400 text-white' :
                      isSecond ? 'bg-slate-300 text-text-charcoal' :
                      isThird ? 'bg-amber-600 text-white' : 'bg-surface text-secondary'
                    }`}>
                      {user.rank}
                    </div>

                    {/* Avatar */}
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover border border-white"
                      referrerPolicy="no-referrer"
                    />

                    {/* Name */}
                    <span className="text-xs font-bold text-text-charcoal">{user.username}</span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-secondary font-semibold font-mono uppercase tracking-wider leading-none">贡献值</span>
                    <span className="text-xs font-black text-primary font-mono mt-0.5">{user.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* News Reader Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg glass-card rounded-[28px] p-8 overflow-hidden border border-white/60 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="w-full h-56 rounded-2xl overflow-hidden mb-5 border border-white/50">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-secondary font-bold font-mono mb-3">
                <img src={selectedNews.authorAvatar} alt="Author" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-text-charcoal">{selectedNews.author}</span>
                <span>•</span>
                <span>{selectedNews.date}</span>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-primary-light/40 text-primary font-bold">
                  新闻资讯
                </span>
              </div>

              <h3 className="text-xl font-black text-text-charcoal leading-snug mb-4">
                {selectedNews.title}
              </h3>

              <div className="text-xs text-secondary/90 leading-relaxed font-medium bg-surface/50 p-5 rounded-2xl border border-white/40 mb-6">
                <p className="mb-4">
                  {selectedNews.summary}
                </p>
                <p className="mb-4">
                  随着2026年智能化高端养宠理念的全面铺开，宠大王宠物研究中心通过近半年的大样本多品种数据追踪，汇总形成了本篇科学指导性报告。
                </p>
                <p>
                  合理膳食搭配与高科技健康监测设备是守护毛孩子长期健康的重要基石。建议定期参与宠大王的社区问答及线下的草坪聚会，获得执业宠医最直接、最系统的支持。
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-primary/5 pt-4">
                <div className="flex items-center gap-4 text-xs font-bold text-secondary font-mono">
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {selectedNews.views}
                  </span>
                  <button 
                    onClick={() => handleLikeNews(selectedNews.id)}
                    className="flex items-center gap-1 text-primary"
                  >
                    <Heart size={14} className="fill-primary text-primary" /> {selectedNews.likes}
                  </button>
                </div>

                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/10 transition-colors"
                >
                  关闭阅读
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUpdate(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md glass-card rounded-[28px] p-8 overflow-hidden border border-white/60 z-10"
            >
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 border border-white/50">
                <img
                  src={selectedUpdate.image}
                  alt={selectedUpdate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-secondary font-bold font-mono mb-2">
                <Calendar size={12} className="text-primary" />
                <span>发布日期：{selectedUpdate.date}</span>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-primary-light/40 text-primary font-bold">
                  官方动态
                </span>
              </div>

              <h3 className="text-lg font-black text-text-charcoal leading-snug mb-3">
                {selectedUpdate.title}
              </h3>

              <div className="text-xs text-secondary/90 leading-relaxed font-medium bg-surface/50 p-4 rounded-xl border border-white/40 mb-6 max-h-48 overflow-y-auto">
                {selectedUpdate.summary}
              </div>

              <button
                onClick={() => setSelectedUpdate(null)}
                className="w-full py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/10 transition-colors"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
