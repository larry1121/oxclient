# OX 서비스 데이터베이스 구조

## **기관 데이터베이스 (Organization DB)**

### **Profiles 테이블**
- **id (char(12)):** 프로필 고유 ID (정규 표현식: `[p0-9][0-9]{a-z0-9}^9`).
- **name (varchar(250)):** 사용자 이름.
- **display_name (varchar(250)):** 프로필에 표시되는 이름.
- **biography (text):** 사용자 소개.
- **email (varchar(250)):** 사용자 이메일.
- **status (varchar(50)):** 프로필 상태 (예: `active`, `suspended`).
- **timezone (varchar(50)):** 사용자 시간대.
- **photo_url (varchar(50)):** 프로필 이미지 URL.

---

### **Teams 테이블**
- **id (char(12)):** 팀 고유 ID (정규 표현식: `[t0-9][0-9]{a-z0-9}^9`).
- **name (varchar(250)):** 팀 이름.
- **description (varchar(250)):** 팀 설명.
- **status (varchar(250)):** 팀 상태 (예: `active`, `archived`).
- **photo_url (varchar(50)):** 팀 이미지 URL.

---

### **Profile_Teams 테이블**
- **profile_id (char(12)):** 프로필 ID (FK).
- **team_id (char(12)):** 팀 ID (FK).
- **nickname (varchar(250)):** 팀 내 별명.
- **joined_at (timestamp):** 가입 시간.

---

### **Spaces 테이블**
- **id (char(12)):** 공간 고유 ID (정규 표현식: `[s0-9][0-9]{a-z0-9}^9`).
- **name (varchar(250)):** 공간 이름.
- **description (varchar(250)):** 공간 설명.
- **status (varchar(250)):** 공간 상태.
- **photo_url (varchar(50)):** 공간 이미지 URL.

---

### **Documents 테이블**
- **id (char(12)):** 문서 고유 ID (정규 표현식: `[d0-9][0-9]{a-z0-9}^9`).
- **space_id (char(12)):** 공간 ID (FK).
- **name (varchar(250)):** 문서 이름.
- **contents (text):** 문서 내용.
- **photo_url (varchar(50)):** 문서 이미지 URL.

---

### **Attributes 테이블**
- **id (int):** 속성 고유 ID (PK).
- **space_id (char(12)):** 공간 ID (FK).
- **name (varchar(250)):** 속성 이름.
- **type (varchar(250)):** 속성 타입.
- **config (json):** 속성 설정 정보 (예: 선택 옵션).
- **position (int):** 속성의 순서.

---

### **Attribute_Values 테이블**
- **id (int):** 속성 값 고유 ID (PK).
- **attribute_id (int):** 속성 ID (FK).
- **value (text):** 속성 값.
- **updated_at (timestamp):** 업데이트 시간.
- **config (json):** 추가 설정 정보.
- **position (int):** 속성 값 순서.

---

### **Inner_Tasks 테이블**
- **id (int):** 태스크 고유 ID (PK).
- **document_id (char(12)):** 문서 ID (FK).
- **name (varchar(250)):** 태스크 이름.
- **completed (boolean):** 완료 여부.

---

## **글로벌 인증 데이터베이스 (Auth DB)**

### **Users 테이블**
- **id (int):** 사용자 고유 ID (PK).
- **username (varchar(50)):** 사용자 이름.
- **email (varchar(250)):** 이메일.
- **password (varchar(250)):** 비밀번호.
- **hash (varchar(250)):** 해시된 비밀번호.

---

### **Tokens 테이블**
- **id (int):** 토큰 고유 ID (PK).
- **user_id (int):** 사용자 ID (FK).
- **token (varchar(250)):** 토큰 문자열.
- **revoke_at (timestamp):** 토큰 만료 시간 (NULL이면 유효).
- **created_at (timestamp):** 토큰 생성 시간.

---

### **Activities 테이블**
- **id (int):** 활동 고유 ID (PK).
- **user_id (int):** 사용자 ID (FK).
- **token_id (int):** 토큰 ID (FK).
- **session_id (varchar(50)):** 세션 ID.
- **useragent (varchar(250)):** 사용자 에이전트 정보.
- **login_at (timestamp):** 로그인 시간.
- **logout_at (timestamp):** 로그아웃 시간 (NULL이면 활성화 상태).

---

### **Organizations 테이블**
- **id (char(12)):** 조직 고유 ID (PK).
- **name (varchar(250)):** 조직 이름.
- **plan (varchar(50)):** 조직 플랜 (예: Free, Pro).
- **i18n_language (varchar(50)):** 언어 설정.
- **photo_url (varchar(50)):** 조직 이미지 URL.

---

## **Redis 세션 설정**
- **session:{id}:** 세션 정보 (Serialized).
- **magic:{email}:** 이메일 기반 임시 토큰.
- **at:rvked:{hash}:** 토큰 취소 상태 (TTL 기반).

### 세션과 토큰의 유효 기간
- **Session:** HTTP Only, Secure Cookie, 1일.
- **Access Token:** Session Storage, 5분.
- **Refresh Token:** Local Storage, 30일.
