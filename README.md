# 스스로 어른이

<br/>

## 프로젝트 소개

**할 일과 보상을 설정하고 관리하는 웹 서비스**

사용자가 할 일과 보상을 설정하고, 할 일을 완료해 코인을 얻은 뒤 이를 사용해 보상을 구입하는 구조의 할 일 관리 웹 서비스입니다.

<br/>

## 프로젝트 진행 기간

2024.07 ~ 2024.12

<br/>

## 링크

[🔗스스로 어른이 서비스 배포 링크](https://custom-task-rewards-react-ts.web.app/)

<br/>

## 주요 기능

### 📌 로그인 및 회원가입

- 로그인 및 회원가입 기능을 제공합니다.

### 📌 할 일 및 보상 관리

- 할 일 등록 및 관리
  - 할 일 탭에서 새로운 할 일을 등록하고 관리할 수 있습니다.
  - 완료된 할 일은 실시간으로 코인과 기록, 대시보드에 반영됩니다.
- 보상 등록 및 관리
  - 사용자가 원하는 보상을 직접 등록할 수 있습니다.
  - 상점에서 보상을 구매하면 코인이 실시간으로 업데이트됩니다.
  - 보유한 코인보다 높은 가격의 보상을 구매하려고 하면 경고 모달이 표시됩니다.
- 자세히 보기 및 편집
  - 각 할 일 및 보상 카드를 눌러 세부 정보를 확인하고 편집, 삭제, (할 일의 경우) 동일한 항목 생성을 할 수 있습니다.

### 📌 기록

- 완료한 할 일은 기록 탭에 저장되며, 완료 날짜와 함께 확인 가능합니다.
- 각 기록 카드를 눌러 세부 정보를 확인하고 완료 취소, 동일한 할 일 생성, 삭제를 할 수 있습니다.

### 📌 대시보드

- 현재 보유 코인 및 총 획득 코인을 확인할 수 있습니다.
- 최근 12개월(화면 너비 550px 미만 시 6개월)의 월별 획득 코인 및 완료한 일을 차트로 시각화하여 보여줍니다.

### 📌 설정

- 닉네임 변경 및 계정 탈퇴 기능을 제공합니다.
- 탈퇴 버튼을 누르면 확인 모달이 표시됩니다.

### 📌 기타

- 비로그인 사용자 및 다른 사용자가 페이지에 접근하지 못하도록 보호합니다.
- 내비게이션에서 현재 보유 코인을 실시간으로 확인 가능합니다.
- 내비게이션에서 로그아웃 버튼을 클릭하면 로그아웃할 수 있습니다.
- 에러 발생 시 화면 위쪽에 메시지가 뜹니다.

<br/>

## 기술 스택

### Frontend

- `React`
- `TypeScript`
- `Styled Components`
- `Zustand`
- `React Query`
- `React Router`
- `Nivo`
- `uuid`

###  DB

- `Firestore`

###  Deploy

- `Firebase`

<br/>

## 설치 및 로컬 환경 실행 방법

1. **레포지토리 클론**
   ```bash
   git clone https://github.com/Yuna-001/custom-task-rewards-react-ts.git
   ```
2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   `.env` 파일을 생성한 뒤, Firebase Console에서 프로젝트 설정에 있는 firebaseConfig 값을 복사하여 아래와 같은 형식으로 입력합니다.

   ```
   VITE_FIREBASE_API_KEY = <Your_Firebase_API_Key>
   VITE_FIREBASE_AUTH_DOMAIN = <Your_Firebase_Auth_Domain>
   VITE_FIREBASE_PROJECT_ID = <Your_Firebase_Project_ID>
   VITE_FIREBASE_STORAGE_BUCKET = <Your_Firebase_Storage_Bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID = <Your_Firebase_Messaging_Sender_ID>
   ```

4. **Firestore 컬렉션 설정**
   Firebase Console에서 Firestore를 활성화하고 아래 컬렉션들을 추가합니다.

   - users: 사용자 정보를 저장하는 컬렉션
   - identifiers: 고유 식별자를 관리하는 컬렉션

5. **개발 서버 실행**

   ```bash
   npm run dev
   ```
