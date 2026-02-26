# Stripe Checkout 테스트 가이드 (궁합 페이지)

궁합 페이지에서만 Stripe Checkout을 붙여 결제 플로우를 확인하는 용도입니다.  
DB/로그인/웹훅/권한 저장은 이번 범위에 포함되지 않습니다.

---

## 1. 환경 변수 (필수)

로컬: 프로젝트 루트에 `.env.local` 생성 후 아래 변수 설정.

| 변수 | 설명 | 예시 |
|------|------|------|
| `STRIPE_SECRET_KEY` | Stripe 시크릿 키 (서버 전용) | `sk_test_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 퍼블릭 키 (클라이언트, 현재 미사용 가능) | `pk_test_...` |
| `COMPATIBILITY_PRICE_ID` | 궁합 상세 결제용 Price ID | `price_...` |

선택:

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_COMPATIBILITY_PRICE_LABEL` | 상세 보기 버튼에 표시할 가격 텍스트 (예: `₩4,900`). 없으면 "유료"로 표시 |

Stripe 대시보드 → [Developers → API keys](https://dashboard.stripe.com/test/apikeys)에서 **테스트 모드** 키를 복사하고,  
[Products → 가격](https://dashboard.stripe.com/test/products)에서 궁합 상세용 상품의 **Price ID**를 복사해 사용하세요.

---

## 2. Vercel 환경 변수

1. Vercel 프로젝트 → **Settings** → **Environment Variables**
2. 아래 변수 추가 (Production / Preview / Development 원하는 환경에 적용)

- `STRIPE_SECRET_KEY` (Value만 입력, Encrypt 권장)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `COMPATIBILITY_PRICE_ID`
- (선택) `NEXT_PUBLIC_COMPATIBILITY_PRICE_LABEL`

배포 후 한 번 재배포하거나, 배포 로그에서 env가 주입되는지 확인하세요.

---

## 3. 로컬에서 테스트하는 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   - `.env.example`을 참고해 `.env.local`에 Stripe 테스트 키와 `COMPATIBILITY_PRICE_ID` 설정

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **결제 플로우 확인**
   - 브라우저에서 `http://localhost:3000/compatibility` 접속
   - 폼 입력 후 결과까지 진행
   - "무료 요약" 아래 "상세 분석 (유료)" 섹션에서 **상세 보기 (유료)** 버튼 클릭
   - Stripe Checkout 페이지로 리다이렉트되는지 확인
   - 테스트 카드로 결제 완료 → `/pay/success` 노출
   - 결제 취소 → `/pay/cancel` 노출

(선택) Stripe CLI로 웹훅을 로컬에 연결해 테스트할 수 있지만, 이번 단계에서는 **결제 완료/취소 리다이렉트만 확인**하면 됩니다.

---

## 4. Stripe 테스트 카드로 결제 확인

Stripe **테스트 모드**에서 사용하는 카드 번호 예시:

| 시나리오 | 카드 번호 |
|----------|-----------|
| 성공 | `4242 4242 4242 4242` |
| 인증 실패 | `4000 0000 0000 0002` |
| 잔액 부족 | `4000 0000 0000 9995` |

- 만료: 미래 날짜 아무 값 (예: 12/34)
- CVC: 아무 3자리 (예: 123)
- 우편번호: 아무 값

자세한 목록: [Stripe Testing - Test card numbers](https://docs.stripe.com/testing#cards)

---

## 5. 실행/테스트 체크리스트

- [ ] `npm install` 후 `npm run build` 성공
- [ ] `.env.local`에 `STRIPE_SECRET_KEY`, `COMPATIBILITY_PRICE_ID` 설정
- [ ] `/compatibility` 접속 → 폼 제출 → "무료 요약" / "상세 분석 (유료)" 섹션 노출
- [ ] "상세 보기 (유료)" 클릭 시 로딩 문구 후 Stripe Checkout 페이지로 이동
- [ ] 테스트 카드 `4242 4242 4242 4242`로 결제 완료 → `/pay/success`에서 "결제 성공" 및 (가능하면) 금액/상태 표시
- [ ] Checkout에서 "뒤로" 또는 취소로 나오기 → `/pay/cancel` 노출
- [ ] Vercel 배포 시 환경 변수 3종 설정 후 동일 플로우 한 번 더 확인

---

## 6. 테스트 말고 실제 결제(라이브)로 전환하려면

아래를 모두 진행하면 **실제 카드/카카오페이 등으로 결제**가 들어갑니다.

### 6.1 Stripe 계정 활성화

1. [Stripe 대시보드](https://dashboard.stripe.com) 로그인
2. **실제 수익을 받으려면** Stripe가 요구하는 사업자/개인 정보 입력 및 신원 확인을 완료해야 합니다. (대시보드 상단/이메일 안내 따라가면 됨)
3. 정산받을 **은행 계좌**를 Stripe에 등록합니다.

### 6.2 라이브 키·상품 사용

1. **API 키**
   - 대시보드 우측 상단에서 **테스트 모드 끄기**(토글 OFF) → **라이브 모드**로 전환
   - [Developers → API keys](https://dashboard.stripe.com/apikeys)에서 **라이브 키** 복사:
     - **Secret key**: `sk_live_...`
     - **Publishable key**: `pk_live_...`

2. **상품·가격**
   - 테스트 모드와 라이브 모드는 **데이터가 분리**되어 있습니다.
   - [Product catalog → Products](https://dashboard.stripe.com/products) (라이브 모드에서) 에서 궁합 상세용 **상품**과 **가격(Price)** 을 똑같이 하나 더 만듭니다.
   - 생성된 **라이브용 Price ID** (`price_...`) 를 복사합니다.

### 6.3 환경 변수 교체

- **로컬**: `.env.local` 에서 아래만 **라이브 값**으로 바꿉니다. (테스트할 때만 다시 test 키로 되돌리면 됨.)
- **Vercel (실서비스)**: Settings → Environment Variables 에서 **Production** 환경에 아래를 설정합니다.

| 변수 | 실제 결제용 값 |
|------|----------------|
| `STRIPE_SECRET_KEY` | `sk_live_...` (라이브 Secret key) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (라이브 Publishable key) |
| `COMPATIBILITY_PRICE_ID` | 라이브 모드에서 만든 궁합 상세 **Price ID** |

주의: **테스트 키(`sk_test_`, `pk_test_`)와 라이브 키(`sk_live_`, `pk_live_`)를 같은 환경에 섞어 쓰지 마세요.**  
실서비스(프로덕션)에는 라이브 키만, 로컬 테스트에는 테스트 키만 사용하는 것이 안전합니다.

### 6.4 웹훅(선택이지만 권장)

실제 결제에서는 **리다이렉트만으로는 부족**할 수 있습니다. 결제가 완료/실패/구독 갱신될 때 Stripe가 우리 서버로 보내는 **웹훅**을 받아서:

- 결제 성공 시 DB에 구매/권한 저장
- 구독 취소·갱신 처리
- 실패·환불 처리

를 하면 안정적입니다. 이번 단계에서는 “실제로 결제만 되게”가 목표라면 **6.1~6.3만 해도 결제는 실제로 진행**됩니다. 웹훅은 다음 단계에서 `/api/webhooks/stripe` 같은 엔드포인트를 만들고, Stripe 대시보드에서 **Webhooks** → **Add endpoint** 로 URL과 수신할 이벤트(`checkout.session.completed`, `invoice.paid` 등)를 설정하면 됩니다.

### 6.5 체크리스트 (실제 결제)

- [ ] Stripe 계정 활성화(신원 확인·은행 계좌) 완료
- [ ] 라이브 모드에서 궁합 상세용 **상품·가격** 생성 후 Price ID 복사
- [ ] 실서비스(Vercel Production) env에 **라이브 키 3종** 설정 (`sk_live_`, `pk_live_`, 라이브 `COMPATIBILITY_PRICE_ID`)
- [ ] 배포 후 실제 카드/카카오페이로 소액 결제 한 번 시도해 보기
- [ ] (다음 단계) 웹훅 엔드포인트 추가 후 결제 성공 시 DB/권한 저장
