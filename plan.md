# 계획

> 이 파일은 매일 "오늘 뭐 하지"의 진입점이다.
> 이전 계획은 로컬 메모리에만 있어서 기기를 옮기며 유실되었다. 그래서 저장소에 둔다.

## 원칙

**라이브러리를 도입하기 전에, 그 라이브러리가 해결하는 문제를 먼저 손으로 겪는다.**

mini React 를 만들고 React 로 넘어간 그 순서를 나머지 분야에도 그대로 적용한다.
최상위 추상화의 사용법만 아는 상태에서 벗어나는 것이 이 프로젝트의 목적이다.

## 운영 규칙

- 하루에 한 항목. 무거우면 `A5-1`, `A5-2` 로 쪼갠다.
- 한 레인만 파지 않는다. 어려운 레인(A, B) 다음엔 가벼운 레인(E, F)을 섞는다.
- 항목을 끝내면 `[x]` 와 일차 번호를 남긴다. 이 파일이 곧 색인이 된다.
- 새 아이디어는 회고에서 발견되는 대로 해당 레인 끝에 덧붙인다.

> 번호 체계는 51일차 기준으로 새로 매긴 것이다. 50일차 커밋에 등장하는 `A2`(빈 입력 방어)는 옛 체계이며 이 표와 대응하지 않는다.

---

## A. 상태 · 데이터 흐름

50일차 회고의 "상태 코드가 난잡해지면 어떻게 가독성을 보장할 것인가" 가 이 레인의 입구다.
상태관리는 Context API 부터 손으로 겪은 뒤 라이브러리로 넘어간다.

- [ ] **A1** `useReducer` 로 상태 전이 통합 — 액션을 판별 유니온으로 (`ApiFailure` 에서 연습한 도구)
- [ ] **A2** 요청 경합 관측 — 느린 요청과 빠른 요청을 겹쳐 쏘고 최종 상태가 뒤집히는 것을 재현
- [ ] **A3** stale response 무시 / `AbortController`
- [ ] **A4** Context API 로 서버 상태를 컴포넌트 밖으로 — Provider 분리, prop drilling 해소
- [ ] **A5** Context 의 한계를 직접 겪기 — value 객체 참조가 바뀔 때의 리렌더 범위를 Profiler 로 계측
- [ ] **A6** 외부 store 직접 구현 (`useSyncExternalStore`) — 선택적 구독으로 A5 의 문제 해결
- [ ] **A7** Zustand 또는 Jotai 도입 후 A6 와 대조 회고
- [ ] **A8** 캐시 직접 만들기 (key→data, staleTime, invalidate)
- [ ] **A9** TanStack Query 도입 후 A8 과 대조 회고


## B. 타입 · 검증

48일차 회고에서 예약해둔 레인.

- [ ] **B1** custom parser 직접 작성 — `unknown` → `Post`, 실패는 `kind: "parse"` 로
- [ ] **B2** 파서를 조합 가능하게 (`object({ id: string() })`) — zod 의 축소판
- [ ] **B3** zod 도입 후 B2 와 대조 회고
- [ ] **B4** DTO 와 도메인 모델 분리, 경계에서 매핑

## C. 컴포넌트 설계

- [ ] **C1** `Board.tsx` 안의 `List`/`Item`/`Input` 분리 — 파일 분리 기준을 문장으로 정의
- [x] **C2** 폼 로직을 커스텀 훅으로 추출 (`useBoardForm`) — 51일차
- [ ] **C3** 합성 패턴 (children, compound component)
- [ ] **C4** `memo`/`useMemo`/`useCallback` 을 실측한 뒤 적용 — Profiler 로 before/after

## D. 라우팅

- [ ] **D1** History API 로 미니 라우터 직접 구현
- [ ] **D2** 목록/상세 페이지 분리 — URL 이 상태의 원본이 되는 경험
- [ ] **D3** `lazy` + `Suspense` 코드 스플리팅
- [ ] **D4** React Router 도입 후 D1 과 대조 회고

## E. 스타일

backlog 의 "페이지 스타일 팔레트 만들기" 가 여기 들어온다.

- [ ] **E1** CSS 변수로 토큰화 (color / space / radius / font)
- [ ] **E2** 레이아웃 원칙 정리 + 반응형
- [ ] **E3** 다크 모드 (`prefers-color-scheme` + 토글)
- [ ] **E4** CSS Modules 도입 비교 — 전역 네임스페이스 문제를 겪은 뒤에

## F. 접근성 · 시맨틱

backlog 의 a11y.

- [ ] **F1** `<form onSubmit>` + `<label>` — 지금은 Enter 로 제출이 되지 않는다
- [ ] **F2** 에러 메시지에 `role="alert"` / `aria-live`
- [ ] **F3** 삭제 후 포커스 이동
- [ ] **F4** 키보드만으로 전 기능 조작 점검

## G. 품질 · 인프라

- [ ] **G1** `tsc --noEmit` 을 build 스크립트에 포함 (45일차 숙제)
- [ ] **G2** Vitest 도입 — `api.ts` 의 순수한 부분부터
- [ ] **G3** Testing Library 로 Board 동작 테스트
- [ ] **G4** ESLint 최소 규칙
- [ ] **G5** GitHub Actions CI / pre-commit hook

## H. 백엔드 · 배포

지금은 `json-server` 로 흉내내고 있다. 최종적으로는 직접 만든 백엔드를 실제로 배포해서 붙인다.
backlog 의 "배포" 가 여기 들어온다.

- [ ] **H1** `json-server` 고도화 — 지연과 에러를 주입해 실험 환경을 만든다 (A2·A3 실험의 토대)
- [ ] **H2** `.env` / `import.meta.env` 로 `BASE_URL` 분리 — 개발·운영 분기
- [ ] **H3** 프론트 정적 배포 (Vercel 또는 GitHub Pages)
- [ ] **H4** 백엔드 직접 작성 (Hono 또는 Express + SQLite) — 라우팅·상태코드·응답 스키마를 내가 정한다
- [ ] **H5** 백엔드 배포 (Fly.io / Railway / Render) 후 프론트와 연결
- [ ] **H6** CORS, 환경별 URL, 콜드 스타트 대응
- [ ] **H7** 인증 도입 검토 — 세션 vs 토큰

---

## 다음 배치

| 일차 | 항목 | 이유 |
|---|---|---|
| 51 | C2 | 50일차가 던진 질문의 직행 답 |
| 52 | F1 | 가볍고, C2 직후라 폼을 만지고 있는 중 |
| 53 | A1 | 상태가 네 개로 늘어난 지금이 적기 |
| 54 | G1 | 45일차 부채 청산, 하루짜리 |
| 55 | B1 | 48일차 예약분 |
