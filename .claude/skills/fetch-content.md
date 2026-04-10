# Skill: fetch-content

content-extractor 에이전트가 YouTube 또는 웹 아티클에서 텍스트를 추출할 때 사용하는 공통 파싱 로직.

---

## YouTube URL 처리

### 방법 1: yt-dlp (권장)
```bash
# yt-dlp 설치 확인
which yt-dlp || pip install yt-dlp --break-system-packages

# 자막 다운로드 (한국어 우선, 없으면 영어)
yt-dlp --write-auto-sub --sub-lang ko,en --skip-download \
  --output "/tmp/%(id)s.%(ext)s" "{URL}"

# .vtt 파일 파싱 (타임코드 제거)
# WEBVTT 헤더, 00:00:00.000 형식 타임코드, <c> 태그 모두 제거
```

### 방법 2: WebFetch 폴백
- `https://www.youtube.com/watch?v={video_id}` 페이지 fetch
- `<meta name="description">` 태그에서 설명 추출
- 영상 제목, 채널명 추출

### YouTube URL 파싱
- `youtu.be/{id}` → video_id = {id}
- `youtube.com/watch?v={id}` → video_id = {id}
- `youtube.com/shorts/{id}` → video_id = {id}

---

## 웹 아티클 처리

### 방법 1: WebFetch
```
URL을 WebFetch로 가져온 후:
1. <script>, <style>, <nav>, <footer>, <aside>, <header> 태그 내용 제거
2. <article>, <main>, [role="main"], .post-content, .article-body 우선 추출
3. 나머지는 <body> 전체에서 텍스트만 추출
4. 최소 300자 이상이어야 유효한 본문
```

### 방법 2: WebSearch 폴백
- 아티클 제목으로 WebSearch 후 요약 내용 활용

---

## 공통 후처리

추출된 텍스트에 대해:
1. 연속 공백/줄바꿈 정리 (`\n\n\n` → `\n\n`)
2. 광고성 문구 제거: "구독하기", "좋아요", "Subscribe", "쿠팡 파트너스", "이 포스팅은 광고" 등
3. HTML 엔티티 디코딩: `&amp;` → `&`, `&lt;` → `<` 등
4. 최종 텍스트를 content-extractor에게 반환

---

## 오류 처리

| 상황 | 처리 방법 |
|------|----------|
| YouTube 자막 없음 | 영상 description + title 활용 |
| 아티클 접근 차단 | WebSearch로 요약 수집 |
| 300자 미만 추출 | WebSearch로 추가 정보 보완 |
| URL 접근 불가 | orchestrator에 오류 보고 |
