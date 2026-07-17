export interface CharacterPast {
  age: number;
  title: string;
  event: string;
  isSecret: boolean;
}

export interface Character {
  id: 'kanghan' | 'sihoo';
  name: string;
  age: number;
  gender: string;
  classInfo: string;
  specialty: string;
  height: number;
  build?: string;
  hair: string;
  eyes: string;
  skin?: string;
  uniqueFeatures: string[];
  clothing: {
    school: string[];
    other?: string[];
  };
  publicPersonality: string[];
  secretPersonality: string[];
  likes: {
    public: string[];
    secret: string[];
  };
  dislikes: string[];
  characteristics: string[];
  past: CharacterPast[];
  imagePath: string;
  themeColor: {
    primary: string;
    secondary: string;
    bg: string;
    accent: string;
  };
}

export interface Place {
  id: string;
  name: string;
  description: string;
  subTitle?: string;
  structure?: string[];
  details: string[];
  imageDesc: string;
}

export interface CalendarEvent {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  date: string;
  title: string;
  description?: string;
}

export interface ConfessionRecord {
  id: string;
  senderNumber: string;
  receiverNumber: string;
  message: string;
  targetId: 'kanghan' | 'sihoo';
  timestamp: string;
}
