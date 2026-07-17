import { Character, Place, CalendarEvent } from './types';

// Let's import the banner image
import bannerImg from './assets/images/simkung_banner_1784123381700.jpg';

export const SIMKUNG_BANNER_IMAGE = bannerImg;

export const characters: Character[] = [
  {
    id: "kanghan",
    name: "권강한",
    age: 18,
    gender: "남자",
    classInfo: "청월고등학교 2학년 3반",
    specialty: "유도선수",
    height: 195,
    hair: "흑발",
    eyes: "갈안",
    uniqueFeatures: [
      "날카로운 송곳니"
    ],
    clothing: {
      school: [
        "청월 고등학교 하복",
        "검은색 반팔 티셔츠",
        "오래된 운동화"
      ]
    },
    publicPersonality: [
      "승부욕이 매우 강함",
      "감정에 쉽게 휘둘림",
      "폐쇄적인 인간관계",
      "날카롭고 적대적이며 반항적인 태도"
    ],
    secretPersonality: [
      "의존적",
      "불안정 애착형"
    ],
    likes: {
      public: [
        "유도",
        "할머니"
      ],
      secret: []
    },
    dislikes: [
      "가난",
      "싸움",
      "정시후",
      "술과 담배"
    ],
    characteristics: [
      "학교 내 인기 있음",
      "매일 훈련에 매진하는 습관 있음",
      "예체능 특기생이자 촉망받는 유도 선수",
      "부상에 극도로 경계, 두려워하는 성향 있음"
    ],
    past: [
      {
        age: 7,
        title: "정시후와의 첫 만남",
        event: "정시후와 같은 반 친구 사이가 됨",
        isSecret: false
      },
      {
        age: 11,
        title: "유도 입문",
        event: "유도부 코치의 권유로 유도에 입문, 타고난 재능으로 각종 대회를 휩쓸기 시작함.",
        isSecret: false
      },
      {
        age: 14,
        title: "청월중학교 입학",
        event: "정시후와 함께 청월 중학교에 입학함.",
        isSecret: false
      },
      {
        age: 8,
        title: "부모님의 이혼",
        event: "아버지의 가정폭력·음주로 인해 부모님이 이혼하심. 이후, 어머니가 자신을 할머니에게 맡기고 떠남",
        isSecret: false
      },
      {
        age: 16,
        title: "정시후와 관계 단절",
        event: "자신과 친하게 지냈던 정시후가 자신의 가정사를 학교 내 소문낸 사건 발생함. 싸움 이후 관계 단절됨.",
        isSecret: false
      }
    ],
    imagePath: "https://i.postimg.cc/G2nrg1gH/from-Pix-AI-2034149918937036432-1.png",
    themeColor: {
      primary: "from-blue-500 to-cyan-600",
      secondary: "text-blue-600",
      bg: "bg-blue-50/50 border-blue-100",
      accent: "bg-blue-600 hover:bg-blue-700"
    }
  },
  {
    id: "sihoo",
    name: "정시후",
    age: 18,
    gender: "남자",
    classInfo: "청월고등학교 3학년 2반",
    specialty: "학생회장",
    height: 187,
    hair: "갈발",
    eyes: "녹안",
    uniqueFeatures: [
      " 눈웃음",
      "귀 피어싱 흔적"
    ],
    clothing: {
      school: [
        " 청월고등학교 하복",
        "깨끗한 운동화"
      ]
    },
    publicPersonality: [
      "온화한",
      "예의있는",
      "리더십있는",
      "매력적인"
    ],
    secretPersonality: [
      "소유욕이 강한",
      "승부욕이 강한",
      "냉담하고 냉소적인"
    ],
    likes: {
      public: [
        "담배",
        "음악",
        "피어싱"
      ],
      secret: []
    },
    dislikes: [
      "공부",
      "부모님",
      "사회적 압박"
    ],
    characteristics: [
      "학교 내 인기 있음",
      "부모님의 사회적 지위가 높음",
      "음악적 재능이 뛰어나며, 운영하던 음악 SNS 계정 존재 (현재 휴면 상태)"
    ],
    past: [
      {
        age: 7,
        title: "권강한과의 첫 만남",
        event: "권강한과 같은 반 친구 사이가 됨",
        isSecret: false
      },
      {
        age: 8,
        title: "비밀 공유",
        event: "권강한의 가정사를 알게 됨.",
        isSecret: true
      },
      {
        age: 13,
        title: "꿈의 몰락",
        event: "음악을 하기 위해 예술 전문 중학교로 진학하고 싶었으나, 부모님의 반대에 굴복하여 청월 중학교에 진학서를 냄.",
        isSecret: false
      },
      {
        age: 14,
        title: "청월중학교 입학",
        event: "권강한와 함께 청월 중학교에 입학함.",
        isSecret: false
      },
      {
        age: 15,
        title: "열등감의 개화",
        event: "자신과 다르게 권강한이 각종 전국 유도 대회를 휩쓰는 모습에 거대하고 어두운 열등감과 시기심이 싹틈.",
        isSecret: true
      },
      {
        age: 16,
        title: "권강한과 관계 단절",
        event: "학부모 상담 날, 아무도 오지 않는 권강한의 가족에 호기심을 가진 주변 친구들에게 비밀을 폭로함. 싸움 이후 관계 단절됨.",
        isSecret: true
      }
    ],
    imagePath: "https://i.postimg.cc/c4kWy3kj/from-Pix-AI-2034149625405942310-1.png",
    themeColor: {
      primary: "from-pink-400 to-rose-500",
      secondary: "text-pink-600",
      bg: "bg-pink-50/50 border-pink-100",
      accent: "bg-pink-500 hover:bg-pink-600"
    }
  }
];

export const places: Place[] = [
  {
    id: "school",
    name: "청월고등학교 (靑月高等學校)",
    description: "서울에 위치한 유명 사립 고등학교",
    structure: [
      "본관 : 교실 | 교무실",
      "별관 : 과학실 | 미술실 | 동아리실 등",
      "별도 : 실외 운동장 | 실내 체육관 | 급식실"
    ],
    details: [
      "학원 내 신분 차별 존재",
      "초대 이사장의 건학 이념에 따른 장학 제도 운영"
    ]
  },
  {
    id: "judo",
    name: "청월고 유도 동아리부",
    description: "권강한 소속 유도 동아리",
    structure: [
      "대규모 훈련장",
      "웨이트 트레이닝 기구실",
      "선수 탈의실 및 개인 샤워실"
    ],
    details: [
      "운동부 특유의 군기 존재"
    ]
  },
  {
    id: "student_council",
    name: "청월고 학생회실",
    description: "정시후 소속 동아리",
    structure: [
      "학생회장 집무 책상",
      "회의용 대형 테이블",
      "여러 계획서가 담긴 캐비닛"
    ],
    details: [
      "매일 아침 선도부 활동 진행",
      "청월고 내 교사들의 신임을 얻어 막강한 권한과 통제력을 가짐"
    ]
  },
  {
    id: "kanghan_house",
    name: "달동네 권강한의 집",
    description: "권강한이 거주하는 달동네",
    structure: [
      "노후된 슬레이트 지붕",
      "오래된 열쇠를 쓰는 철제 대문",
      "마당 구석에 말라붙어 있는 화분"
    ],
    details: [
      "빈민촌",
      "치안이 극도로 낮고 노후화 된 곳",
      "몇 년전부터 재개발 소문이 돌고 있음"
    ]
  },
  {
    id: "sihoo_house",
    name: "고급 빌라촌 정시후의 집",
    description: "정시후가 거주하는 고급 빌라촌",
    structure: [
      "정갈하게 잔디가 깎인 드넓고 조용한 단독 2층 저택",
      "높은 대리석 담장과 무인 보안 시스템이 가동되는 웅장한 대문"
    ],
    details: [
      "부자 동네",
      "치안 수준 높음",
      "거리 청결 높음"
    ]
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    season: "spring",
    date: "3월 2일",
    title: "개학식 및 입학식"
  },
  {
    season: "spring",
    date: "3월 19일 ~ 23일",
    title: "동아리 홍보 주간"
  },
  {
    season: "spring",
    date: "4월 6일",
    title: "전학년 현장 체험 학습"
  },
  {
    season: "spring",
    date: "4월 23일 ~ 25일",
    title: "1학기 중간고사"
  },
  {
    season: "spring",
    date: "5월 17일",
    title: "청월고 체육대회"
  },
  {
    season: "spring",
    date: "5월 30일 ~ 6월 1일",
    title: "수련회"
  },
  {
    season: "summer",
    date: "6월 15일 ~ 17일",
    title: "전국 체육 대회"
  },
  {
    season: "summer",
    date: "7월 16일 ~ 18일",
    title: "1학기 기말고사"
  },
  {
    season: "summer",
    date: "7월 20일",
    "title": "여름 방학식"
  },
  {
    season: "summer",
    date: "7월 21일 ~ 8월 26일",
    title: "여름방학 (보충수업 및 합숙)"
  },
  {
    season: "summer",
    date: "8월 27일",
    title: "2학기 개학식"
  },
  {
    season: "autumn",
    date: "9월 10일 ~ 12일",
    title: "수학 여행"
  },
  {
    season: "autumn",
    date: "10월 8일 ~ 10일",
    title: "2학기 중간고사"
  },
  {
    season: "autumn",
    date: "10월 24일 ~ 26일",
    title: "학교 축제 (청월제)"
  },
  {
    season: "autumn",
    date: "10월 31일",
    title: "할로윈 축제"
  },
  {
    season: "winter",
    date: "11월 15일",
    title: "대학 수학 능력 시험 (수능)"
  },
  {
    season: "winter",
    date: "11월 16일 ~ 18일",
    title: "대통령기 전국 유도 대회"
  },
  {
    season: "winter",
    date: "12월 10일 ~ 12일",
    title: "2학기 기말고사"
  },
  {
    season: "winter",
    date: "12월 24일",
    title: "크리스마스 이브 축제"
  },
  {
    season: "winter",
    date: "12월 28일",
    title: "겨울 방학식 및 종업식"
  },
  {
    season: "winter",
    date: "12월 29일 ~ 1월 31일",
    title: "겨울방학 (보충수업 및 합숙)"
  },
  {
    season: "winter",
    date: "2월 1일 ~ 15일",
    title: "봄 등교"
  },
  {
    season: "winter",
    date: "2월 15일",
    title: "졸업식"
  }
];
