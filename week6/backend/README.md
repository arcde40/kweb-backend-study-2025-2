# Simple Board Backend

Express.js + MariaDB 기반 게시판 백엔드 API

## 프로젝트 구조

```
backend/
├── app.js                      # 메인 서버 파일
├── database/
│   └── database.js            # DB 연결 설정
├── middleware/
│   └── auth.js                # 인증 미들웨어
├── routes/
│   ├── auth.js                # 인증 라우트
│   ├── posts.js               # 게시글 라우트 (댓글 포함)
│   └── replies.js             # 댓글 삭제 라우트
├── utils/
│   ├── password.js            # bcrypt 비밀번호 해싱 유틸
│   └── password.example.js    # 사용 예제
└── schema.sql                 # DB 스키마
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 DB 정보를 수정하세요.

### 3. 데이터베이스 설정

```bash
mysql -u kweb -p kweb_db < schema.sql
```

### 4. 서버 실행

```bash
npm run dev
```

서버는 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

### 인증

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 조회

### 게시글

- `GET /api/posts` - 게시글 목록
- `GET /api/posts/:id` - 게시글 상세
- `POST /api/posts` - 게시글 작성 (인증 필요)
- `PUT /api/posts/:id` - 게시글 수정 (인증 필요)
- `DELETE /api/posts/:id` - 게시글 삭제 (인증 필요)

### 댓글

- `GET /api/posts/:postId/replies` - 댓글 목록
- `POST /api/posts/:postId/replies` - 댓글 작성 (인증 필요)
- `DELETE /api/replies/:replyId` - 댓글 삭제 (인증 필요)

## 데이터베이스 스키마

**users** - 사용자

- `id`, `username` (unique), `password` (bcrypt 해시), `created_at`

**posts** - 게시글

- `id`, `title`, `content`, `user_id` (FK), `created_at`, `updated_at`

**replies** - 댓글

- `id`, `content`, `post_id` (FK), `user_id` (FK), `created_at`

## 비밀번호 해싱

`utils/password.js`에서 bcrypt 헬퍼 함수 제공:

```javascript
const {hashPassword, comparePassword} = require('./utils/password');

// 회원가입 시
const hashedPassword = await hashPassword(password);

// 로그인 시
const isValid = await comparePassword(password, user.password);
```

**예제 실행:**

```bash
node utils/password.example.js
```

## 보안 참고사항

- 비밀번호는 반드시 해싱하여 저장
- API 응답에 비밀번호 포함 금지
- Parameterized Query 사용 (SQL Injection 방지)

### Disclaimer

- 이 프로젝트에는 AI로 작성한 코드가 포함되어 있습니다.