export const KIT_CATEGORIES = {
  data:   { emoji: '📊', label: '데이터',  color: '#818cf8' },
  text:   { emoji: '📝', label: '텍스트',  color: '#34d399' },
  encode: { emoji: '🔐', label: '인코딩',  color: '#f472b6' },
  calc:   { emoji: '🧮', label: '계산기',  color: '#fbbf24' },
  game:   { emoji: '🎮', label: '게임',  color: '#f472b6' },
};

export const KIT_TOOLS = [
  {
    slug: 'json-formatter',
    title: 'JSON 포매터',
    category: 'data',
    type: 'html',
    desc: 'JSON 데이터 정렬, 압축, 검증',
    emoji: '📋',
  },
  {
    slug: 'score-board',
    title: '게임 점수판',
    category: 'game',
    type: 'html',
    desc: '게임용 타이머 + 팀 점수 기록 및 순위 자동 정렬',
    emoji: '🎮',
  },
];

export const KIT_CATEGORY_ORDER = ['data', 'text', 'encode', 'calc', 'game'];
