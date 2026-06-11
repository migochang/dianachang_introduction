# 장은실 자기소개 홈페이지 (v1)

순수 정적 사이트입니다. 별도 서버·빌드 없이 **`index.html`을 더블클릭**하면 바로 열립니다.

## 구성
```
site/
├─ index.html      ← 페이지 본문(콘텐츠 수정은 대부분 여기)
├─ styles.css      ← 디자인(색·서체·간격) 토큰과 스타일
├─ main.js         ← 메뉴·스크롤 애니메이션·폼 전송
└─ assets/         ← 프로필 사진·이력서 PDF·공유 이미지 (assets/README.txt 참고)
```

## 1) 바로 보기
`index.html` 더블클릭 → 브라우저에서 확인.

## 2) 내 정보 채우기
- **프로필 사진 / 이력서 PDF**: `assets/` 폴더에 넣기 (`assets/README.txt` 참고)
- **LinkedIn 주소**: `index.html`에서 `https://www.linkedin.com/` 를 본인 주소로 교체(2곳)
- **문구 수정**: `index.html`의 각 섹션 텍스트를 직접 수정

## 3) 문의 폼 작동시키기 (1분, 무료)
1. https://formspree.io 가입 → 새 form 생성 → 받은 주소 복사 (예: `https://formspree.io/f/abcdwxyz`)
2. `index.html`의 `action="https://formspree.io/f/your-id"` 에서 `your-id` 부분을 교체
   - 설정 전에는 제출 시 메일 앱(jdiana@naver.com)으로 자동 연결됩니다.

## 4) 인터넷에 올리기 (무료, 추천: Cloudflare Pages)
1. https://pages.cloudflare.com 또는 https://app.netlify.com/drop 접속
2. **`site` 폴더를 통째로 드래그&드롭** → 끝. 바로 주소가 발급됩니다.
3. (선택) 개인 도메인 연결: 도메인 구입 후 대시보드에서 연결.

## 디자인 메모
- 톤: 럭셔리 미니멀(아이보리 배경 · 네이비 강조 · 골드 라인). 비싸 보이는 절제된 무드.
- 서체: Cormorant Garamond(영문 제목) · 본명조 Noto Serif KR(국문 제목) · Pretendard(본문)
- 접근성: 키보드 이동·스크린리더·명도대비(WCAG AA)·모션 최소화(`prefers-reduced-motion`) 고려.

> 응원 댓글·구글 로그인 기능은 이번 버전에서 제외했습니다.
