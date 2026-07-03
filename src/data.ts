/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Breed, News, Post, QAndA, AdoptablePet, LeaderboardUser } from './types';

export const CATEGORIES = [
  { id: 'all', label: '全部', icon: '🐾' },
  { id: 'dog', label: '宠物狗', icon: '🐕' },
  { id: 'cat', label: '猫咪', icon: '🐈' },
  { id: 'electronic', label: '电子', icon: '🤖' },
  { id: 'kitten', label: '幼猫', icon: '🍼' },
  { id: 'special', label: '特殊猫', icon: '🦁' },
  { id: 'bird', label: '奇特鸟', icon: '🦜' },
  { id: 'hamster', label: '仓鼠记', icon: '🐹' }
];

export const TOP_BREEDS: Breed[] = [
  {
    id: 'b1',
    name: '中华田园犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300',
    code: 's-N0o02',
    description: '中国本土的优质犬种，极其聪明、忠诚度高，抗病能力强，能非常好地适应各种环境。',
    origin: '中国本土',
    temperament: '忠诚、机警、聪明、温顺',
    lifespan: '12-15年'
  },
  {
    id: 'b2',
    name: '罗威纳',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&q=80&w=300',
    code: '2A0-k0601',
    description: '杰出的警卫犬和护卫犬，身体强壮、动作迅猛，对主人极其忠诚温和，充满自信。',
    origin: '德国',
    temperament: '沉稳、自信、勇敢、忠诚',
    lifespan: '9-11年'
  },
  {
    id: 'b3',
    name: '哈士奇',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=300',
    code: '200-40502',
    description: '西伯利亚雪橇犬，因活泼、友善而闻名，也是著名的表情包贡献者，活泼好动，热爱社交。',
    origin: '西伯利亚',
    temperament: '活泼、友善、温顺、调皮',
    lifespan: '12-15年'
  },
  {
    id: 'b4',
    name: '萨摩耶',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=300',
    code: '2A6-k0601',
    description: '以独特的“萨摩耶式微笑”而闻名。长有浓密白毛，温和、忠诚、适应性极强，喜欢和人互动。',
    origin: '西伯利亚',
    temperament: '温和、机警、开朗、忠诚',
    lifespan: '12-14年'
  },
  {
    id: 'b5',
    name: '比熊犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=300',
    code: '200-40002',
    description: '白色粉扑般的小型玩赏犬，性格温顺活泼，不掉毛，非常适合公寓饲养与家庭陪伴。',
    origin: '地中海地区',
    temperament: '活泼、顽皮、敏感、温和',
    lifespan: '12-15年'
  },
  {
    id: 'b6',
    name: '边境牧羊犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=300',
    code: '200-40003',
    description: '公认世界上智商最高的犬种，学习能力惊人，具备非凡的牧羊本能，需要大量的精力消耗。',
    origin: '苏格兰和英格兰边境',
    temperament: '极度聪明、精力充沛、忠诚、机警',
    lifespan: '12-16年'
  }
];

export const LATEST_NEWS: News[] = [
  {
    id: 'n1',
    title: '全毛手国大：家庭伴侣首选',
    summary: '如何评估一只宠物品质与家庭适应性？金毛、哈士奇等主流伴侣犬的性格深度解析，带你找到最合适的一员。',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
    author: '宠大王官方',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    date: '2026-06-28',
    views: 1250,
    likes: 88
  },
  {
    id: 'n2',
    title: '佳绩强强拼 养宠新势力工智力',
    summary: '2026年高端宠物智能硬件及电子宠物护理系统评测：看看全自动化喂食机、AI情绪监测如何改变我们的养宠生活。',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    author: '科技养宠迷',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    date: '2026-06-25',
    views: 940,
    likes: 42
  },
  {
    id: 'n3',
    title: '狗狗对人类有多深沉的爱？',
    summary: '科学家利用核磁共振脑部扫描证实：当狗狗听到主人的声音或闻到主人气味时，它们大脑的“奖赏中心”会被强烈激活。',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=600',
    author: '莫子茂',
    authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100',
    date: '2026-06-20',
    views: 1820,
    likes: 120
  }
];

export const COMMUNITY_UPDATES: Post[] = [
  {
    id: 'p1',
    author: '瑞的哈士奇',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    time: '3小时前',
    content: '我家萨摩耶和罗威纳竟然玩得如此融洽！果然脾气合不合和品种无关，它们天天在草坪上追着跑。今天给它们做了一顿高端三文鱼营养大餐，开心得直摇尾巴！🐾',
    images: [
      'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&q=80&w=400'
    ],
    likes: 58,
    comments: 29,
    commentList: [
      { author: '小宠达人', content: '好羡慕啊，我家两只整天打架 😭', time: '2小时前' },
      { author: '养犬达人', content: '三文鱼配方是什么呀，求教！', time: '1小时前' }
    ]
  },
  {
    id: 'p2',
    author: '猫咪阿波波',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    time: '5小时前',
    content: '今天把刚收养的小幼猫带去体检了，医生说它很健康！和家里的蓝猫第一次见面，虽然有点小哈气，但总体很顺利。大家看看它们像不像套娃？太治愈了 💖',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&q=80&w=400'
    ],
    likes: 112,
    comments: 45,
    commentList: [
      { author: '喵星人代表', content: '啊啊啊太萌了吧！抱走！', time: '4小时前' },
      { author: '铲屎官一号', content: '科学隔离还是要做好哦，祝猫猫健康！', time: '3小时前' }
    ]
  }
];

export const HOT_QUESTIONS: QAndA[] = [
  {
    id: 'q1',
    question: '幼猫拉稀吃什么药，有什么中药或温和调理推荐？',
    views: 1250,
    category: '猫咪',
    answer: '对于三个月内幼猫，拉稀首先要排除传染病（如猫瘟）。排除后，建议禁食4-6小时（不禁水），可使用益生菌（如妈咪爱或布拉迪酵母）调理肠胃。如果伴有炎症，需遵循兽医指导喂服少量蒙脱石散或消炎药。'
  },
  {
    id: 'q2',
    question: '杜宾犬耳朵怎么裁耳和绑耳才好看？',
    views: 945,
    category: '狗狗',
    answer: '裁耳一般在出生后8-12周进行，必须要找有丰富经验的专业兽医操作。术后缝合拆线后，最重要的步骤是长达数月的“绑耳”。使用透气胶带和轻质泡沫棒作支撑，每3-4天更换一次，保证直立度和美观度。'
  },
  {
    id: 'q3',
    question: '家里有猫怎么杀虫和灭蟑螂比较安全？',
    views: 1530,
    category: '安全',
    answer: '有猫家庭千万要避免使用含有“拟除虫菊酯”成分的喷雾。推荐使用对宠物安全无害的针剂蟑螂胶饵（如德国拜耳），将其点涂在猫咪绝对够不到的缝隙里。另外，可以使用硼酸棉球或物理粘捕板。'
  },
  {
    id: 'q4',
    question: '宠物狗流眼泪、有红褐色泪痕是什么原因？',
    views: 810,
    category: '狗狗',
    answer: '泪痕多由以下原因引起：1. 饮食油腻，盐分过高；2. 倒睫或眼部发炎，刺激泪腺；3. 鼻泪管堵塞。建议更换低盐无谷犬粮，每天用宠物洗眼液清理，严重倒睫需行小手术。'
  }
];

export const ENCYCLOPEDIA_BREEDS: Breed[] = [
  {
    id: 'e1',
    name: '中华田园犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200',
    code: '2D0-1004',
    description: '中国本土历史悠久的犬种，抗病能力极佳，性格忠诚警惕。'
  },
  {
    id: 'e2',
    name: '罗威纳',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&q=80&w=200',
    code: '2A0-k0601',
    description: '德国经典护卫犬，自信冷静，身体强壮威猛。'
  },
  {
    id: 'e3',
    name: '阿拉斯加',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=200',
    code: '3A6-H0902',
    description: '著名的极地雪橇犬，体型庞大，毛发浓密，性格极其憨厚。'
  },
  {
    id: 'e4',
    name: '金毛犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
    code: '1D8-R0903',
    description: '温顺友善的家庭宠物，“大暖男”，极为聪明容易训练。'
  },
  {
    id: 'e5',
    name: '萨摩耶犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=200',
    code: '2A6-k0603',
    description: '“微笑天使”，极佳的伴侣犬，长毛白净，性格温顺。'
  },
  {
    id: 'e6',
    name: '博美犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200',
    code: '240-P0002',
    description: '小巧可爱的德国狐狸犬，活泼机警，毛发蓬松。'
  },
  {
    id: 'e7',
    name: '边境牧羊犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=200',
    code: '200-40003',
    description: '公认智商第一的犬种，善于学习，服从度极高。'
  },
  {
    id: 'e8',
    name: '比熊犬',
    category: 'dog',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=200',
    code: '200-40002',
    description: '不掉毛的白色小棉花糖，性格温顺黏人，适合城市。'
  },
  {
    id: 'e9',
    name: '波斯猫',
    category: 'cat',
    image: 'https://images.unsplash.com/photo-1614859324967-bdf461fec769?auto=format&fit=crop&q=80&w=200',
    code: '3C0-M0021',
    description: '猫中贵族，长毛华丽，面部扁平，性格极其安静温顺。'
  },
  {
    id: 'e10',
    name: '英短蓝猫',
    category: 'cat',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200',
    code: '1A0-B0022',
    description: '身体圆润，毛发厚密，性格极其沉稳老实，非常黏人。'
  },
  {
    id: 'e11',
    name: '美短起司',
    category: 'cat',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=200',
    code: '1A0-A0331',
    description: '聪明活泼，花纹经典对称，体格健壮，适应力极强。'
  },
  {
    id: 'e12',
    name: '布偶猫',
    category: 'cat',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=200',
    code: '3C0-D0901',
    description: '像玩偶一样柔软温和的猫咪，深邃蓝眼，亲人如狗。'
  }
];

export const ADOPTABLE_PETS: AdoptablePet[] = [
  {
    id: 'a1',
    name: 'Crowd',
    breed: '中华田园犬',
    age: '1.5 岁',
    gender: '雄性',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '北京',
    vaccines: '已完成三针疫苗、已狂犬、已驱虫',
    temperament: '超级听话，看家本领一流，极度黏人，懂握手和坐下。',
    tag: '温顺懂事'
  },
  {
    id: 'a2',
    name: 'Kilor',
    breed: '罗威纳',
    age: '2 岁',
    gender: '雌性',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '上海',
    vaccines: '已完成疫苗、已驱虫、已绝育',
    temperament: '虽然体型威武但内心是个小公主，喜欢玩飞盘和撒娇。',
    tag: '勇敢警惕'
  },
  {
    id: 'a3',
    name: 'Grecd',
    breed: '小雪纳瑞',
    age: '8 个月',
    gender: '雄性',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '北京',
    vaccines: '已完成幼犬疫苗、未驱虫',
    temperament: '活泼开朗的小老头，精力十分旺盛，适合有耐心的主人。',
    tag: '活泼好动'
  },
  {
    id: 'a4',
    name: 'Greed',
    breed: '比格犬',
    age: '1 岁',
    gender: '雄性',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '广州',
    vaccines: '疫苗全、定期驱虫',
    temperament: '典型比格，嗅觉极强，声音宏亮，贪吃但极度亲近人类。',
    tag: '超级治愈'
  },
  {
    id: 'a5',
    name: 'Buddy',
    breed: '边境牧羊犬',
    age: '1 岁',
    gender: '雄性',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '上海',
    vaccines: '已完成三针、已绝育',
    temperament: '智商超高，会听指令配合拍照，精力旺盛需要充足的运动。',
    tag: '智商极高'
  },
  {
    id: 'a6',
    name: 'Mimi',
    breed: '英短银渐层',
    age: '6 个月',
    gender: '雌性',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '重庆',
    vaccines: '猫三联已齐、已驱虫',
    temperament: '非常安静乖巧，喜欢在阳光下睡觉，被抱时会咕噜咕噜。',
    tag: '安静粘人'
  },
  {
    id: 'a7',
    name: 'Hana',
    breed: '布偶猫',
    age: '1 岁',
    gender: '雌性',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=400',
    status: 'available',
    city: '沈阳',
    vaccines: '疫苗已打、未绝育',
    temperament: '大眼睛蓝眼小精灵，毛发如丝绸般，非常随和听话。',
    tag: '仙女颜值'
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, username: '帕拉王', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100', score: 30005 },
  { rank: 2, username: '阿大犬', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', score: 25028 },
  { rank: 3, username: '宠大亨', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', score: 20025 },
  { rank: 4, username: '奥特尖', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', score: 15028 }
];

export const SIDEBAR_UPDATES = [
  {
    id: 's1',
    title: '关于宠物医疗保险报销比例上调通知',
    date: '2026-07-02',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=200',
    summary: '自2026年7月起，合作定点医院的宠物医疗门诊报销比例由50%上调至70%。'
  },
  {
    id: 's2',
    title: '社区活动：周末百宠草坪运动会报名中',
    date: '2026-07-01',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=200',
    summary: '本周六下午2点在阳光森林公园举办草坪趣味运动会，欢迎携宠报名。'
  },
  {
    id: 's3',
    title: '杜宾犬怎么饲养？杜宾犬新手主人的避坑指南',
    date: '2026-06-30',
    image: 'https://images.unsplash.com/photo-1553736026-ff14d158d222?auto=format&fit=crop&q=80&w=200',
    summary: '杜宾犬属于工作犬，训练极其重要，日常肠胃呵护与能量配比指南。'
  }
];
