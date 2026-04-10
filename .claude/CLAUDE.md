> This prompt is designed according to the official Claude Code guidelines:
> - **Sub-Agents**: https://code.claude.com/docs/ko/sub-agents
> - **Skills**: https://code.claude.com/docs/ko/skills

# Content Repurposing Engine

**한 줄 요약:** URL 하나 → Threads / LinkedIn / 뉴스레터(HTML) 자동 생성

---

## 워크플로우

```
[시작: URL 입력]
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│ 1. orchestrator (sonnet) ← 지휘자                        │
│    - URL 유효성 검사 및 slug 생성                        │
│    - outputs/{slug}/ 폴더 생성                          │
│    - 전체 에이전트 실행 순서 조율                        │
└─────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│ 2. content-extractor (haiku)                            │
│    - fetch-content 스킬로 YouTube/아티클 파싱           │
│    - source.json 생성                                   │
└─────────────────────────────────────────────────────────┘
    │
    ▼ (3개 에이전트 동시 실행)
┌─────────────────────────────────────────────────────────┐
│ 3. 병렬 콘텐츠 생성 (sonnet × 3)                        │
│    ├── threads-writer     → threads.md                  │
│    ├── linkedin-writer    → linkedin.md                 │
│    └── newsletter-creator → newsletter.html             │
│    (전원 tone-guidelines 스킬 참조)                     │
└─────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│ 4. quality-reviewer (sonnet) ← 검수                     │
│    - 사실 정확성 / 톤 / 포맷 / 클리셰 검사              │
│    - review.json 생성                                   │
│    - fail 항목 → orchestrator가 해당 에이전트 재실행    │
└─────────────────────────────────────────────────────────┘
    │
    ▼
[결과물: outputs/{YYYYMMDD_HHMMSS}_{slug}/]
```

---

## 스킬 역할 요약

| 스킬 | 위치 | 사용 에이전트 |
|------|------|--------------|
| `fetch-content` | `.claude/skills/fetch-content.md` | content-extractor |
| `tone-guidelines` | `.claude/skills/tone-guidelines.md` | writer × 3, quality-reviewer |

---

## 에이전트 공통 규칙

- **언어:** 소스가 한국어면 한국어, 영어면 한국어로 번역 생성 (기본값: 한국어)
- **source.json 필수 참조:** 모든 writer 에이전트는 source.json을 읽고 시작
- **할루시네이션 금지:** source.json에 없는 수치나 사실 추가 절대 금지
- **tone-guidelines 필수 참조:** writer 에이전트와 quality-reviewer 모두 적용
- **파일 덮어쓰기 금지:** 동일 slug 폴더 있으면 타임스탬프 변경해 새 폴더 생성
- **재실행 상한:** quality-reviewer fail 시 해당 에이전트만 최대 2회 재실행

---

## 출력 폴더 구조

```
outputs/
└── {YYYYMMDD_HHMMSS}_{slug}/
    ├── source.json
    ├── threads.md
    ├── linkedin.md
    ├── newsletter.html
    └── review.json
```

---

## 절대 금지 사항

- ❌ orchestrator를 거치지 않고 에이전트 직접 실행 금지
- ❌ source.json 없이 writer 에이전트 실행 금지
- ❌ quality-reviewer를 생략하고 완료 처리 금지
- ❌ 클리셰 표현: "세상이 변하고 있습니다", "패러다임", "게임체인저" 등
- ❌ newsletter.html에 외부 CSS 파일 분리 금지 (인라인 CSS만)
- ❌ source.json에 없는 수치·인용 임의 추가 금지
