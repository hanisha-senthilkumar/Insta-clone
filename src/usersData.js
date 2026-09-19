import fallbackData from '../db/db.json';

// Comprehensive registry of users and profiles
export const KNOWN_USERS = {
  hanisha_0510: {
    id: 'user_me',
    username: 'hanisha_0510',
    fullName: 'Hanisha SenthilKumar',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Designing memories ✨ | Travel & Tech ☕📸\n📍 San Francisco, CA',
    followers: 1420,
    following: 385,
    postsCount: 12,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ]
  },
  travel_boy: {
    id: 'sug_1',
    username: 'travel_boy',
    fullName: 'Aryan Sharma',
    profilePic: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by spider_adventures + 3 more',
    bio: 'Chasing horizons ⛰️ | Backpacker & Storyteller 🎒🗺️\nCatch flights, not feelings ✈️',
    followers: 4820,
    following: 290,
    postsCount: 24,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&auto=format&fit=crop&q=80'
    ]
  },
  travel_queen: {
    id: 'sug_2',
    username: 'travel_queen',
    fullName: 'Elena Rostova',
    profilePic: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by travel_girl',
    bio: 'Wanderer at heart 🌍 | Luxury & solo travel ✈️🥂\nLiving life in postcards 📮',
    followers: 12500,
    following: 430,
    postsCount: 48,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80'
    ]
  },
  pixel_designer: {
    id: 'sug_3',
    username: 'pixel_designer',
    fullName: 'Liam Smith',
    profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Suggested for you',
    bio: 'UI/UX & 3D motion designer 👾 Crafting digital experiences & interfaces 🎨',
    followers: 5120,
    following: 390,
    postsCount: 31,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80'
    ]
  },
  wanderlust_diaries: {
    id: 'sug_4',
    username: 'wanderlust_diaries',
    fullName: 'Maya Lin',
    profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    subtitle: 'New to Instagram',
    bio: 'Solo female travels | 42 countries and counting 🗺️✈️ Sharing raw unfiltered moments.',
    followers: 3890,
    following: 260,
    postsCount: 19,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  tech_insider: {
    id: 'sug_5',
    username: 'tech_insider',
    fullName: 'David Miller',
    profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by chef_nivin + 1 more',
    bio: 'Future tech, AI & silicon trends 🚀 Reviews, leaks & hardware breakdowns.',
    followers: 11400,
    following: 480,
    postsCount: 65,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  spider_adventures: {
    id: 'story_1',
    username: 'spider_adventures',
    fullName: 'Peter Parker',
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by travel_boy',
    bio: 'Urban climbing, trails & extreme expeditions 🧗‍♂️⚡ Finding thrills in high places.',
    followers: 8940,
    following: 512,
    postsCount: 42,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80'
    ]
  },
  travel_girl: {
    id: 'story_2',
    username: 'travel_girl',
    fullName: 'Aria Montgomery',
    profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by hanisha_0510',
    bio: 'Life is short, travel often 🌸🌴 Vanlife & camping 🚐 Road trips across continents.',
    followers: 9840,
    following: 310,
    postsCount: 38,
    isVerified: true,
    isFollowing: true,
    photos: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ]
  },
  chef_nivin: {
    id: 'story_3',
    username: 'chef_nivin',
    fullName: 'Nivin Kapoor',
    profilePic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by hanisha_0510',
    bio: 'Michelin trained chef 👨‍🍳🍝 Culinary magic & secret recipes | Food is love.',
    followers: 15300,
    following: 620,
    postsCount: 88,
    isVerified: true,
    isFollowing: true,
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'
    ]
  },
  sophia_art: {
    id: 'story_4',
    username: 'sophia_art',
    fullName: 'Sophia Laurent',
    profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Followed by spider_adventures',
    bio: 'Visual artist & oil painter 🎨 Framing beauty in chaos. Commissions open 💌',
    followers: 6730,
    following: 195,
    postsCount: 52,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  nature_lens: {
    id: 'story_5',
    username: 'nature_lens',
    fullName: 'Oliver Stone',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Suggested for you',
    bio: 'Wildlife & Landscape Photographer 🌲📷 Capturing the wild pulse of our planet.',
    followers: 22100,
    following: 340,
    postsCount: 74,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  tokyo_vibes: {
    id: 'post_4_user',
    username: 'tokyo_vibes',
    fullName: 'Kenji Sato',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Tokyo photography',
    bio: 'Tokyo cityscapes & street photography 🏮🌧️ Neon dreams & rainy alleys #CyberCity',
    followers: 18400,
    following: 280,
    postsCount: 59,
    isVerified: true,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80'
    ]
  },
  golden_retriever_sam: {
    id: 'post_6_user',
    username: 'golden_retriever_sam',
    fullName: 'Sam The Golden',
    profilePic: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Pet & Animals',
    bio: 'Professional ball fetcher 🎾 100% good boy 🐾 Daily tail wags & treats.',
    followers: 34200,
    following: 80,
    postsCount: 92,
    isVerified: true,
    isFollowing: true,
    photos: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&auto=format&fit=crop&q=80'
    ]
  },
  coffee_culture: {
    id: 'post_7_user',
    username: 'coffee_culture',
    fullName: 'Coffee Culture Co.',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Coffee & Cafe Guide',
    bio: 'Artisanal roasts, brewing guides & cafe aesthetics ☕🤎 Sip quality, live slow.',
    followers: 16800,
    following: 320,
    postsCount: 63,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    ]
  },
  fitness_freak: {
    id: 'story_6',
    username: 'fitness_freak',
    fullName: 'Marcus Vance',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Health & Fitness',
    bio: 'Fitness coach & athlete 🏋️‍♂️ Health, wellness & dedication. No excuses.',
    followers: 7420,
    following: 410,
    postsCount: 45,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  urban_architect: {
    id: 'story_7',
    username: 'urban_architect',
    fullName: 'Studio Urban',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Architecture & Design',
    bio: 'Modern architecture, minimal spaces & structural elegance 🏙️📐',
    followers: 8300,
    following: 210,
    postsCount: 36,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    ]
  }
};

// Popular hashtags extracted from posts
export const KNOWN_HASHTAGS = [
  { tag: '#wanderlust', count: '142K posts' },
  { tag: '#sunsetvibes', count: '89K posts' },
  { tag: '#Tokyo', count: '3.4M posts' },
  { tag: '#adventure', count: '512K posts' },
  { tag: '#cheflife', count: '67K posts' },
  { tag: '#CyberCity', count: '28K posts' },
  { tag: '#puppylove', count: '920K posts' },
  { tag: '#explore', count: '1.2M posts' }
];

/**
 * Search users by query string.
 * Always guarantees helpful results for any username/ID typed by the user!
 */
export function searchUsersAndTags(query) {
  if (!query || !query.trim()) {
    return { users: [], hashtags: [] };
  }

  const clean = query.trim().toLowerCase().replace(/^@/, '');
  const isTagQuery = query.trim().startsWith('#');

  // Find matching users
  const userList = Object.values(KNOWN_USERS);
  const matchedUsers = userList.filter((u) => {
    return (
      u.username.toLowerCase().includes(clean) ||
      (u.fullName && u.fullName.toLowerCase().includes(clean)) ||
      (u.bio && u.bio.toLowerCase().includes(clean))
    );
  });

  // If no exact username match exists, generate a dynamic account for the user's ID
  // so any searched ID works seamlessly!
  const hasExact = matchedUsers.some((u) => u.username.toLowerCase() === clean);
  if (!hasExact && clean.length > 0 && !isTagQuery) {
    const dynamicUser = {
      id: `dyn_${clean}`,
      username: clean,
      fullName: clean.charAt(0).toUpperCase() + clean.slice(1).replace(/_/g, ' '),
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      subtitle: 'Instagram user',
      bio: `Hello! Welcome to @${clean}'s profile ✨`,
      followers: 128,
      following: 95,
      postsCount: 3,
      isVerified: false,
      isFollowing: false,
      isDynamic: true,
      photos: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
      ]
    };
    matchedUsers.push(dynamicUser);
  }

  // Find matching hashtags
  const tagClean = clean.replace(/^#/, '');
  const matchedTags = KNOWN_HASHTAGS.filter((h) =>
    h.tag.toLowerCase().includes(tagClean)
  );

  return {
    users: matchedUsers,
    hashtags: matchedTags
  };
}

/**
 * Get profile data for a specific username
 */
export function getUserProfile(username) {
  if (!username) return null;
  const clean = username.toLowerCase().replace(/^@/, '');
  if (KNOWN_USERS[clean]) {
    return KNOWN_USERS[clean];
  }
  // If not in known users, construct profile
  return {
    id: `user_${clean}`,
    username: clean,
    fullName: clean.charAt(0).toUpperCase() + clean.slice(1).replace(/_/g, ' '),
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: `Hey there! Welcome to @${clean}'s Instagram profile 📸`,
    followers: 350,
    following: 120,
    postsCount: 3,
    isVerified: false,
    isFollowing: false,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ]
  };
}
