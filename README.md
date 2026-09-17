# Pipeline M Voice V4 - GitHub Deploy (with Delete)

## 폴더 구조
```
pipeline-m-voice/
├── index.html              # V4 앱 본체 (타이틀: Pipeline M - Voice V4 🗑️)
├── manifest.json           # PWA 아이콘 설정
├── icon-180.png, 192, 512  # V 로고
├── _redirects              # SPA 라우팅 (Cloudflare Pages 필수)
├── _headers                # 보안 헤더
└── functions/
    └── api/
        └── todoist.js      # ★ 핵심! 아이폰 직접 전송 프록시
```

## 3개 핵심 파일 설명
1. **index.html** - 앱 전체. V4에서는 삭제(🗑️) 기능 추가, Gemini 2.0-flash 사용
2. **functions/api/todoist.js** - 아이폰 사파리 CORS 우회용. 없으면 아이폰에서 Todoist 전송 실패
3. **_redirects** - Cloudflare Pages에서 새로고침해도 404 안 뜨게 함. 내용: `/* /index.html 200`

manifest.json, 아이콘은 PWA용 (홈 화면 추가 시 V 로고 보임)

## 배포 방법 아래 참고
