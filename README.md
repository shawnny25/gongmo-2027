# 글로벌 파트너십 공모 접수 페이지

빌드 없는 정적 사이트입니다. HTML 3장 + CSS 1장 + JS 2장.

| 파일 | 역할 |
|---|---|
| `index.html` | ① 공모 안내 |
| `apply.html` | ② 지원서 작성 |
| `done.html` | ③ 접수 완료 |
| `content.js` | **자주 바뀌는 글자** (기관명 · 공모 이름 · 기간 · 소개 · 문의 메일). 여기만 고치면 세 화면에 다 반영됩니다 |
| `config.js` | Supabase 연결 정보 |
| `supabase/schema.sql` | Supabase 표 + 보안 설정(RLS) |

## 배포 순서 (3단계)

### 1. Supabase
1. https://supabase.com 에서 새 프로젝트를 만듭니다.
2. 왼쪽 메뉴 **SQL Editor** → `supabase/schema.sql` 내용을 붙여넣고 **Run**.
3. **Project Settings → API** 에서 `Project URL` 과 `anon public` 키를 복사합니다.
4. `config.js` 의 두 줄에 붙여넣습니다.

### 2. content.js
`ㅇㅇㅇ` 을 실제 기관명으로, `contact@example.org` 를 문의 메일로 바꿉니다.

### 3. Vercel
1. https://vercel.com 에서 **Add New → Project**.
2. 이 폴더를 GitHub 에 올린 뒤 연결하거나, Vercel CLI 로 이 폴더에서 `vercel` 을 실행합니다.
3. Framework Preset 은 **Other**, 빌드 설정은 비워둡니다.
4. 배포 주소가 열리면 끝.

## 로컬에서 미리 보기
```bash
python -m http.server 5173
```
브라우저에서 http://localhost:5173 을 엽니다.

## 확인할 것
- [ ] 안내 → 지원서 → 완료 세 화면이 이어진다
- [ ] 지원서를 제출하면 Supabase **Table Editor → applications** 에 한 줄 쌓인다
- [ ] 필수칸을 비우면 제출이 막힌다
- [ ] 휴대폰에서 열어도 깨지지 않는다

## 디자인
Coral(#EF4623) & Ink(#2D3B42) 편집 스타일. 영문 서체(Instrument Serif · Manrope)에 한글이 없어서
Noto Serif KR · Noto Sans KR 을 뒤에 붙였습니다. 색·둥글기·애니메이션 곡선은 `style.css` 맨 위 `:root` 에 모여 있습니다.
