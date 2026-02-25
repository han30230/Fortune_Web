# Vercel 배포 가이드

## 방법 1: GitHub 연동 (추천)

1. **Git 저장소 초기화 및 GitHub 푸시**
   ```bash
   cd c:\Users\sangh\Documents\Fortune_Web
   git init
   git add .
   git commit -m "Initial commit - Fortune Web MVP"
   ```
   GitHub에서 새 저장소 생성 후:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fortune-web.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel에서 프로젝트 가져오기**
   - [vercel.com](https://vercel.com) 접속 후 로그인
   - **Add New** → **Project**
   - **Import Git Repository**에서 방금 푸시한 `fortune-web` 선택
   - Framework Preset: **Next.js** (자동 감지)
   - **Deploy** 클릭

3. **커스텀 도메인 사용 시 (선택)**
   - Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` 추가 (사이트맵/OG용)

---

## 방법 2: Vercel CLI로 바로 배포

1. **Vercel CLI 설치 및 로그인**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **프로젝트 폴더에서 배포**
   ```bash
   cd c:\Users\sangh\Documents\Fortune_Web
   vercel
   ```
   - 첫 질문: **Set up and deploy?** → **Y**
   - **Which scope?** → 본인 계정 선택
   - **Link to existing project?** → **N**
   - **Project name?** → `fortune-web` (또는 원하는 이름)
   - **Directory?** → `./` (엔터)
   - 배포 완료 후 **Production URL** 이 출력됩니다.

3. **이후 배포**
   ```bash
   vercel --prod
   ```
   (`--prod` 없이 하면 Preview 배포, `--prod` 하면 프로덕션 도메인에 반영)

---

## 참고

- 빌드 명령: `npm run build` (Vercel이 자동 사용)
- 출력 디렉터리: `.next` (Next.js 기본값, 자동 처리)
- 사이트맵/OG URL: Vercel에 배포하면 `VERCEL_URL`로 자동 설정됩니다. 커스텀 도메인을 쓰면 `NEXT_PUBLIC_SITE_URL`을 설정하세요.
