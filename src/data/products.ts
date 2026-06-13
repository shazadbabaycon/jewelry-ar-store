export interface JewelryItem {
  id: string;
  name: string;
  category: 'earring' | 'crown' | 'ring' | 'necklace';
  price: number;
  description: string;
  image: string;
  arType: 'face' | 'hand';
  // AR positioning attributes
  anchorIndex?: number;
  scale?: string;
  position?: string;
  rotation?: string;
  color?: string; // Used to customize procedurally generated 3D items
}

export const products: JewelryItem[] = [
  {
    id: 'aura-empress-crown',
    name: 'AURA Empress Crown',
    category: 'crown',
    price: 18500,
    description: 'An exquisite tiara embellished with brilliant-cut diamonds and a central teardrop emerald, crafted in 18k yellow gold.',
    image: 'https://images.unsplash.com/photo-1543728770-11c5e5a7a1ee?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 10, // Forehead
    scale: '0.09 0.09 0.09',
    position: '0 0.5 -0.15',
    rotation: '-20 0 0',
    color: '#d4af37'
  },
  {
    id: 'starlight-tiara',
    name: 'Starlight Tiara',
    category: 'crown',
    price: 12400,
    description: 'A delicate crown designed with stars aligned in white platinum, sparkling with fine diamond pavé settings.',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 10, // Forehead
    scale: '0.08 0.08 0.08',
    position: '0 0.45 -0.2',
    rotation: '-15 0 0',
    color: '#e0e0e0'
  },
  {
    id: 'royal-pearl-cascades',
    name: 'Royal Pearl Cascades',
    category: 'earring',
    price: 3800,
    description: 'South Sea cultured pearls hanging from a cascade of baguette-cut diamonds on an 18k yellow gold post.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 234, // Left ear (Right ear targets 454)
    scale: '0.015 0.015 0.015',
    position: '0 0 0',
    color: '#fffdf5'
  },
  {
    id: 'golden-halo-hoops',
    name: 'Golden Halo Hoops',
    category: 'earring',
    price: 1800,
    description: 'Classic luxury hoop earrings textured with gold leaf facets, reflecting light with every movement.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 234,
    scale: '0.012 0.012 0.012',
    position: '0 0 0',
    color: '#d4af37'
  },
  {
    id: 'eternal-ruby-promise',
    name: 'Eternal Ruby Promise',
    category: 'ring',
    price: 4900,
    description: 'A deep crimson Burmese ruby center stone bordered by a halo of micro-pavé diamonds on a platinum band.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    arType: 'hand',
    color: '#e0115f'
  },
  {
    id: 'empress-emerald-ring',
    name: 'Empress Emerald Ring',
    category: 'ring',
    price: 7200,
    description: 'A striking emerald-cut Colombian emerald mounted on an 18k gold band accented by tapered diamond baguettes.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop',
    arType: 'hand',
    color: '#50c878'
  },
  {
    id: 'imperial-emerald-pendant',
    name: 'Imperial Emerald Pendant',
    category: 'necklace',
    price: 8500,
    description: 'A classic 18k gold chain featuring a hand-carved Colombian emerald pendant surrounded by tiny round diamonds.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 152, // Chin-neck tracking
    color: '#d4af37'
  },
  {
    id: 'gilded-sunburst-choker',
    name: 'Gilded Sunburst Choker',
    category: 'necklace',
    price: 4200,
    description: 'A stunning solid gold choker textured with sunburst rays that capture and scatter light.',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b1a8a8929c?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 152,
    color: '#d4af37'
  },
  {
    id: 'royal-sapphire-collar',
    name: 'Royal Sapphire Collar',
    category: 'necklace',
    price: 14000,
    description: 'A heavy gold link collar adorned with five marquise-cut Ceylon sapphires in a vintage setting.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 152,
    color: '#d4af37'
  },
  {
    id: 'classic-pearl-strand',
    name: 'Classic Pearl Strand',
    category: 'necklace',
    price: 3500,
    description: 'A timeless strand of perfectly matched cream-colored South Sea pearls with an 18k gold clasp.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 152,
    color: '#fffdf5'
  },
  {
    id: 'diamond-solitaire-drop',
    name: 'Diamond Solitaire Drop',
    category: 'necklace',
    price: 6800,
    description: 'A minimalist gold necklace with a single flawless 1.5-carat pear-cut diamond drop.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    arType: 'face',
    anchorIndex: 152,
    color: '#d4af37'
  }
];
