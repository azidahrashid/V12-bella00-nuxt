export type NavItem = {
  label: string
  to: string
  icon: string
  description?: string
  children?: NavItem[]
}

export type LobbyCard = {
  title: string
  label: string
  description: string
  to: string
  image: string
  badge?: string
}

export type PageContent = {
  slug: string
  path: string
  label: string
  eyebrow: string
  title: string
  description: string
  heroImage: string
  cards: LobbyCard[]
  notices: string[]
}

export const assetPrefix = '/assets/site/'

export const mainNavigation: NavItem[] = [
  {
    label: '라이브 스포츠',
    to: '/라이브',
    icon: '⚡',
    description: '실시간 인플레이 경기 화면'
  },
  {
    label: '프리매치',
    to: '/스포츠',
    icon: '🏟',
    description: '스포츠 사전 경기 목록',
    children: [
      {
        label: '스포츠 토너먼트',
        to: '/스포츠-토너먼트',
        icon: '🏆',
        description: '토너먼트 이벤트 페이지'
      }
    ]
  },
  {
    label: '라이브 카지노',
    to: '/라이브-카지노',
    icon: '♣',
    description: '라이브 딜러 카지노 로비'
  },
  {
    label: '슬롯',
    to: '/슬롯',
    icon: '◆',
    description: '슬롯 게임 썸네일 그리드',
    children: [
      {
        label: '카지노 토너먼트',
        to: '/카지노-토너먼트',
        icon: '★',
        description: '카지노 랭킹 이벤트'
      }
    ]
  },
  {
    label: '이벤트',
    to: '/이벤트',
    icon: '✦',
    description: '프로모션과 보너스 안내'
  },
  {
    label: '미니게임',
    to: '/미니게임',
    icon: '●',
    description: '하이로우, 페널티킥, 파워볼',
    children: [
      { label: '빅 하이로우', to: '/빅-하이로우', icon: '▲', description: 'Big High Low lobby' },
      { label: '페널티킥', to: '/페널티킥', icon: '⚽', description: 'Penalty Kick lobby' },
      { label: '블라스트', to: '/블라스트', icon: '✹', description: 'Blast lobby' },
      { label: '파워볼', to: '/파워볼', icon: '◎', description: 'Powerball lobby' }
    ]
  },
  {
    label: '더보기',
    to: '/더보기',
    icon: '☰',
    description: '추가 메뉴',
    children: [
      { label: 'E-스포츠', to: '/e-스포츠', icon: '⌁', description: 'E-sports markets' },
      { label: '가상 스포츠', to: '/가상-스포츠', icon: '◈', description: 'Virtual sports lobby' },
      { label: '베팅규정', to: '/베팅규정', icon: '☑', description: 'Rules and guide' }
    ]
  }
]

export const utilityNavigation: NavItem[] = [
  { label: '고객센터', to: '/고객센터', icon: '☎', description: 'Support page' },
  { label: '메뉴', to: '/메뉴', icon: '☰', description: 'Full menu page' }
]

export const flatNavigation: NavItem[] = [
  ...mainNavigation,
  ...mainNavigation.flatMap((item) => item.children || []),
  ...utilityNavigation
]

export const heroSlides = [
  {
    badge: 'BEST BETTING SITE',
    title: 'BELLABET',
    subtitle: '벨라벳 스포츠 · 카지노 프론트엔드',
    body: '검정 배경, 네온 그린 브랜딩, 상단 메뉴, 로비 카드, 이벤트 배너를 Nuxt 컴포넌트로 재구성했습니다.',
    image: '/assets/site/hero-neon.svg'
  },
  {
    badge: 'EVENT',
    title: 'WELCOME BONUS',
    subtitle: '프로모션 배너 영역',
    body: '원본의 이벤트 중심 랜딩 구조를 반영한 배너입니다. 실제 베팅/결제/인증 기능은 연결하지 않았습니다.',
    image: '/assets/site/promo-banner.svg'
  }
]

export const lobbyCards: LobbyCard[] = [
  {
    title: '라이브 스포츠',
    label: 'LIVE SPORTS',
    description: '실시간 경기 상태와 배당 보드를 표현하는 프론트엔드 전용 화면입니다.',
    to: '/라이브',
    image: '/assets/site/cards/live-sports.svg',
    badge: 'LIVE'
  },
  {
    title: '프리매치',
    label: 'PREMATCH',
    description: '경기 전 목록, 리그 필터, 종목 버튼을 확인할 수 있습니다.',
    to: '/스포츠',
    image: '/assets/site/cards/prematch.svg'
  },
  {
    title: '라이브 카지노',
    label: 'LIVE CASINO',
    description: '바카라, 룰렛, 블랙잭 로비 레이아웃을 재현했습니다.',
    to: '/라이브-카지노',
    image: '/assets/site/cards/live-casino.svg',
    badge: 'HOT'
  },
  {
    title: '슬롯',
    label: 'SLOT',
    description: '원본 슬롯 페이지처럼 큰 썸네일 그리드로 이동합니다.',
    to: '/슬롯',
    image: '/assets/site/cards/slot.svg'
  },
  {
    title: '미니게임',
    label: 'MINI GAME',
    description: '빅 하이로우, 페널티킥, 블라스트, 파워볼 메뉴를 제공합니다.',
    to: '/미니게임',
    image: '/assets/site/cards/mini-game.svg'
  },
  {
    title: '이벤트',
    label: 'PROMOTION',
    description: '신규, 캐시백, 토너먼트 이벤트 카드가 작동합니다.',
    to: '/이벤트',
    image: '/assets/site/cards/event.svg',
    badge: 'EVENT'
  }
]

export const slotGames: LobbyCard[] = [
  { title: 'Mega Fortune', label: 'SLOT', description: '인기 슬롯 썸네일 카드', to: '/슬롯?game=mega-fortune', image: '/assets/site/cards/slot.svg', badge: 'POPULAR' },
  { title: 'Lucky Clover', label: 'SLOT', description: '그린 테마 슬롯 카드', to: '/슬롯?game=lucky-clover', image: '/assets/site/cards/event.svg' },
  { title: 'Red Baron', label: 'MINI', description: '미니게임 스타일 카드', to: '/파워볼', image: '/assets/site/cards/mini-game.svg' },
  { title: 'Color Hunt', label: 'CASUAL', description: '캐주얼 게임 카드', to: '/블라스트', image: '/assets/site/cards/esports.svg' },
  { title: 'Power Ball', label: 'MINI', description: '파워볼 로비 이동', to: '/파워볼', image: '/assets/site/cards/mini-game.svg' },
  { title: 'Live Roulette', label: 'CASINO', description: '라이브 카지노 연결 카드', to: '/라이브-카지노', image: '/assets/site/cards/live-casino.svg' }
]

export const pages: PageContent[] = [
  {
    slug: '라이브',
    path: '/라이브',
    label: '라이브 스포츠',
    eyebrow: 'LIVE SPORTS',
    title: '라이브 스포츠',
    description: '실시간 스포츠 경기 목록과 인플레이 보드를 보여주는 페이지입니다.',
    heroImage: '/assets/site/cards/live-sports.svg',
    cards: [lobbyCards[0], lobbyCards[1], { title: '경기결과', label: 'RESULT', description: '경기 결과 페이지 이동', to: '/경기결과', image: '/assets/site/cards/rules.svg' }],
    notices: ['실제 배당/API는 연결되지 않은 프론트엔드 데모입니다.', '로그인 버튼은 모달 UI와 입력 검증만 처리합니다.']
  },
  {
    slug: '스포츠',
    path: '/스포츠',
    label: '프리매치',
    eyebrow: 'PREMATCH',
    title: '프리매치 스포츠',
    description: '축구, 농구, 야구 등 사전 경기 카드 UI를 구성했습니다.',
    heroImage: '/assets/site/cards/prematch.svg',
    cards: [lobbyCards[1], lobbyCards[0], { title: '스포츠 토너먼트', label: 'TOURNAMENT', description: '토너먼트 페이지 이동', to: '/스포츠-토너먼트', image: '/assets/site/cards/event.svg' }],
    notices: ['좌측 메뉴와 카드 클릭은 Nuxt route로 이동합니다.', '경기 데이터는 정적 mock 데이터입니다.']
  },
  {
    slug: '스포츠-토너먼트',
    path: '/스포츠-토너먼트',
    label: '스포츠 토너먼트',
    eyebrow: 'TOURNAMENT',
    title: '스포츠 토너먼트',
    description: '랭킹, 리그, 참여 현황 UI를 위한 토너먼트 페이지입니다.',
    heroImage: '/assets/site/cards/event.svg',
    cards: [lobbyCards[0], lobbyCards[1], lobbyCards[5]],
    notices: ['참여/보상 처리 로직은 구현하지 않았습니다.']
  },
  {
    slug: '라이브-카지노',
    path: '/라이브-카지노',
    label: '라이브 카지노',
    eyebrow: 'LIVE CASINO',
    title: '라이브 카지노',
    description: '라이브 딜러 게임 로비를 카드형 UI로 구성했습니다.',
    heroImage: '/assets/site/cards/live-casino.svg',
    cards: [lobbyCards[2], slotGames[5], { title: '카지노 토너먼트', label: 'CASINO TOURNAMENT', description: '카지노 랭킹 이벤트', to: '/카지노-토너먼트', image: '/assets/site/cards/event.svg' }],
    notices: ['게임 실행 대신 로그인 안내 모달을 표시합니다.']
  },
  {
    slug: '슬롯',
    path: '/슬롯',
    label: '슬롯',
    eyebrow: 'SLOT',
    title: '슬롯',
    description: '원본 슬롯 페이지의 큰 썸네일 그리드 흐름을 반영했습니다.',
    heroImage: '/assets/site/cards/slot.svg',
    cards: slotGames,
    notices: ['슬롯 썸네일은 라이선스 문제가 없는 로컬 SVG 대체 이미지입니다.']
  },
  {
    slug: '카지노-토너먼트',
    path: '/카지노-토너먼트',
    label: '카지노 토너먼트',
    eyebrow: 'CASINO TOURNAMENT',
    title: '카지노 토너먼트',
    description: '이벤트와 랭킹 정보를 위한 프론트엔드 페이지입니다.',
    heroImage: '/assets/site/cards/event.svg',
    cards: [lobbyCards[2], lobbyCards[3], lobbyCards[5]],
    notices: ['랭킹/상금 데이터는 정적 표시용입니다.']
  },
  {
    slug: '이벤트',
    path: '/이벤트',
    label: '이벤트',
    eyebrow: 'EVENT',
    title: '이벤트',
    description: '프로모션 배너와 혜택 카드를 구성했습니다.',
    heroImage: '/assets/site/promo-banner.svg',
    cards: [lobbyCards[5], { title: '웰컴 보너스', label: 'WELCOME', description: '신규 이벤트 카드', to: '/이벤트?tab=welcome', image: '/assets/site/cards/event.svg' }, { title: '캐시백', label: 'CASHBACK', description: '캐시백 이벤트 카드', to: '/이벤트?tab=cashback', image: '/assets/site/cards/rules.svg' }],
    notices: ['이벤트 신청은 실제 backend 없이 UI 상태만 변경됩니다.']
  },
  {
    slug: '미니게임',
    path: '/미니게임',
    label: '미니게임',
    eyebrow: 'MINI GAME',
    title: '미니게임',
    description: '빅 하이로우, 페널티킥, 블라스트, 파워볼 메뉴를 제공합니다.',
    heroImage: '/assets/site/cards/mini-game.svg',
    cards: mainNavigation.find((item) => item.label === '미니게임')!.children!.map((item) => ({ title: item.label, label: 'MINI', description: item.description || 'Mini game', to: item.to, image: '/assets/site/cards/mini-game.svg' })),
    notices: ['각 미니게임 링크는 실제 Nuxt 페이지로 이동합니다.']
  },
  {
    slug: '빅-하이로우',
    path: '/빅-하이로우',
    label: '빅 하이로우',
    eyebrow: 'BIG HIGH LOW',
    title: '빅 하이로우',
    description: '하이로우 게임 로비 화면입니다.',
    heroImage: '/assets/site/cards/mini-game.svg',
    cards: [lobbyCards[4], slotGames[2], slotGames[3]],
    notices: ['플레이 버튼은 로그인 모달을 엽니다.']
  },
  {
    slug: '페널티킥',
    path: '/페널티킥',
    label: '페널티킥',
    eyebrow: 'PENALTY KICK',
    title: '페널티킥',
    description: '페널티킥 미니게임 로비입니다.',
    heroImage: '/assets/site/cards/mini-game.svg',
    cards: [lobbyCards[4], slotGames[2], slotGames[4]],
    notices: ['게임 엔진은 포함하지 않았습니다.']
  },
  {
    slug: '블라스트',
    path: '/블라스트',
    label: '블라스트',
    eyebrow: 'BLAST',
    title: '블라스트',
    description: '블라스트 미니게임 로비입니다.',
    heroImage: '/assets/site/cards/mini-game.svg',
    cards: [lobbyCards[4], slotGames[3], slotGames[4]],
    notices: ['실시간 결과/API는 mock 처리입니다.']
  },
  {
    slug: '파워볼',
    path: '/파워볼',
    label: '파워볼',
    eyebrow: 'POWERBALL',
    title: '파워볼',
    description: '파워볼 게임 목록과 바로가기 카드입니다.',
    heroImage: '/assets/site/cards/mini-game.svg',
    cards: [slotGames[2], slotGames[3], slotGames[4], slotGames[5]],
    notices: ['원본 페이지처럼 게임 카드 그리드를 제공합니다.']
  },
  {
    slug: '더보기',
    path: '/더보기',
    label: '더보기',
    eyebrow: 'MORE',
    title: '더보기',
    description: '추가 메뉴 전체 목록입니다.',
    heroImage: '/assets/site/cards/support.svg',
    cards: mainNavigation.find((item) => item.label === '더보기')!.children!.map((item) => ({ title: item.label, label: 'MORE', description: item.description || 'More menu', to: item.to, image: item.to.includes('가상') ? '/assets/site/cards/virtual.svg' : item.to.includes('규정') ? '/assets/site/cards/rules.svg' : '/assets/site/cards/esports.svg' })),
    notices: ['더보기 하위 메뉴가 모두 라우팅됩니다.']
  },
  {
    slug: 'e-스포츠',
    path: '/e-스포츠',
    label: 'E-스포츠',
    eyebrow: 'E-SPORTS',
    title: 'E-스포츠',
    description: 'E-스포츠 경기 목록 UI입니다.',
    heroImage: '/assets/site/cards/esports.svg',
    cards: [lobbyCards[0], { title: '가상 스포츠', label: 'VIRTUAL', description: '가상 스포츠 페이지', to: '/가상-스포츠', image: '/assets/site/cards/virtual.svg' }, lobbyCards[5]],
    notices: ['경기 데이터는 예시 데이터입니다.']
  },
  {
    slug: '가상-스포츠',
    path: '/가상-스포츠',
    label: '가상 스포츠',
    eyebrow: 'VIRTUAL SPORTS',
    title: '가상 스포츠',
    description: '가상 스포츠 로비 화면입니다.',
    heroImage: '/assets/site/cards/virtual.svg',
    cards: [{ title: 'Virtual Football', label: 'VIRTUAL', description: '가상 축구 카드', to: '/가상-스포츠?game=football', image: '/assets/site/cards/virtual.svg' }, { title: 'Virtual Racing', label: 'VIRTUAL', description: '가상 레이싱 카드', to: '/가상-스포츠?game=racing', image: '/assets/site/cards/virtual.svg' }, lobbyCards[0]],
    notices: ['실제 게임 공급자 연결은 제외했습니다.']
  },
  {
    slug: '베팅규정',
    path: '/베팅규정',
    label: '베팅규정',
    eyebrow: 'RULES',
    title: '베팅규정',
    description: '규정과 안내문을 표시하는 페이지입니다.',
    heroImage: '/assets/site/cards/rules.svg',
    cards: [{ title: '스포츠 규정', label: 'RULE', description: '스포츠 베팅 규정 안내', to: '/베팅규정#sports', image: '/assets/site/cards/rules.svg' }, { title: '카지노 규정', label: 'RULE', description: '카지노 이용 규정 안내', to: '/베팅규정#casino', image: '/assets/site/cards/live-casino.svg' }, { title: '고객센터', label: 'SUPPORT', description: '문의 페이지로 이동', to: '/고객센터', image: '/assets/site/cards/support.svg' }],
    notices: ['실제 운영 정책은 사이트 소유자가 별도로 입력해야 합니다.']
  },
  {
    slug: '고객센터',
    path: '/고객센터',
    label: '고객센터',
    eyebrow: 'CUSTOMER CENTER',
    title: '고객센터',
    description: '공지, 1:1문의, 라이브채팅 버튼 UI입니다.',
    heroImage: '/assets/site/cards/support.svg',
    cards: [{ title: '공지사항', label: 'NOTICE', description: '공지 리스트 화면', to: '/고객센터?tab=notice', image: '/assets/site/cards/support.svg' }, { title: '1:1 문의', label: 'SUPPORT', description: '문의 작성 모달', to: '/고객센터?tab=contact', image: '/assets/site/cards/rules.svg' }, { title: 'LiveChat', label: 'CHAT', description: '고정 채팅 버튼', to: '/고객센터?tab=chat', image: '/assets/site/cards/event.svg' }],
    notices: ['채팅 버튼은 UI 데모입니다.']
  },
  {
    slug: '메뉴',
    path: '/메뉴',
    label: '메뉴',
    eyebrow: 'MENU',
    title: '전체 메뉴',
    description: '원본 사이트에서 검색된 메뉴 구조를 전체 목록으로 표시합니다.',
    heroImage: '/assets/site/cards/support.svg',
    cards: flatNavigation.map((item) => ({ title: item.label, label: 'MENU', description: item.description || 'Menu item', to: item.to, image: '/assets/site/cards/support.svg' })),
    notices: ['모든 메뉴 아이템은 NuxtLink로 연결되어 있습니다.']
  },
  {
    slug: '경기결과',
    path: '/경기결과',
    label: '경기결과',
    eyebrow: 'RESULT',
    title: '경기결과',
    description: '경기 결과 리스트 UI입니다.',
    heroImage: '/assets/site/cards/rules.svg',
    cards: [lobbyCards[0], lobbyCards[1], { title: 'E-스포츠 결과', label: 'RESULT', description: 'E-스포츠 결과', to: '/e-스포츠', image: '/assets/site/cards/esports.svg' }],
    notices: ['결과 데이터는 mock 데이터입니다.']
  }
]

export const getPageBySlug = (slug: string) => pages.find((page) => page.slug === decodeURIComponent(slug))

export const defaultPage = (slug: string): PageContent => ({
  slug,
  path: `/${slug}`,
  label: slug,
  eyebrow: 'BELLABET',
  title: slug.replace(/-/g, ' '),
  description: '준비된 메뉴 페이지입니다. 상단 메뉴 또는 카드 버튼으로 다른 페이지로 이동할 수 있습니다.',
  heroImage: '/assets/site/cards/support.svg',
  cards: lobbyCards,
  notices: ['이 페이지는 fallback route입니다. 필요한 실제 콘텐츠를 app/data/site-content.ts에 추가하세요.']
})
