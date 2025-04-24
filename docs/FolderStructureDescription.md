project-root/
├── .expo/
├── android/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── explore.tsx
│       ├── index.tsx
│       ├── test.tsx
│       ├── _layout.tsx
│       └── not-found.tsx
├── assets/
├── components/
│   ├── ui/
│   │   ├── IconSymbol.ios.tsx
│   │   ├── IconSymbol.tsx
│   │   ├── TabBarBackground.ios.tsx
│   │   ├── TabBarBackground.tsx
│   │   ├── Collapsible.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── HapticTab.tsx
│   │   ├── HelloWave.tsx
│   │   ├── ParallaxScrollView.tsx
│   │   ├── ThemedText.tsx
│   │   └── ThemedView.tsx
│   └── common/               # 새로 추가: 공통 컴포넌트
├── constants/
│   └── Colors.ts
├── hooks/
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
│
├── screens/                  # 새로 추가: 화면 컴포넌트
│   ├── HomeScreen/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── ProfileScreen/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── SettingsScreen/
│       ├── index.tsx
│       └── styles.ts
├── services/                 # 새로 추가: API 및 서비스
│   ├── api.ts
│   └── auth.ts
├── utils/                    # 새로 추가: 유틸리티 함수
│   ├── formatters.ts
│   └── validators.ts
├── context/                  # 새로 추가: 앱 상태 관리
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── types/                    # 새로 추가: 타입 정의
│   └── index.ts
├── node_modules/
├── scripts/
├── .gitignore
├── app.json
├── babel.config.js
├── expo-env.d.ts
├── package-lock.json
├── package.json
└── README.md