/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Breed {
  id: string;
  name: string;
  category: string;
  image: string;
  code: string;
  description: string;
  origin?: string;
  temperament?: string;
  lifespan?: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  views: number;
  likes: number;
}

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  time: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  likedByMe?: boolean;
  commentList?: Array<{ author: string; content: string; time: string }>;
}

export interface QAndA {
  id: string;
  question: string;
  views: number;
  category: string;
  answer: string;
}

export interface AdoptablePet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: '雄性' | '雌性';
  image: string;
  status: 'available' | 'adopted' | 'requested';
  city: string;
  vaccines: string;
  temperament: string;
  tag: string;
}

export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  petImage: string;
  applicantName: string;
  applicantPhone: string;
  experience: string;
  notes: string;
  submittedAt: string;
  status: 'pending' | 'approved';
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  score: number;
}
