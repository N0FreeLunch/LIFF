## 필수 세팅

### NodeJS version

- 18 버전 이상의 NodeJS를 사용하자.

```
nvm use 18
```

### LIFF 설치하기

```
npx @line/create-liff-app
```

- 여기서는 yarn, react, typescript 옵션을 선택하였다.

### liff mock 설치

```
yarn add @line/liff-mock
```

- 실제 LIFF 채널 및 라인 로그인 없이 liff 앱의 동작을 테스트 할 수 있는 기능이다.

### vite.config.ts 설정하기

- module을 import 할 때 절대 경로를 지정할 수 있도록 설정한다.

```js
export default defineConfig({
  // ...
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  // ...
});
```

### tsconfig.json 설정하기

```js
{
  "compilerOptions": {
    // ...
    "paths": {
      "src/*": [
        "./src/*"
      ],
    },
    "baseUrl": "./",
  }
  // ...
}
```

- import 경로를 설정할 때 상대경로가 아닌 애플리케이션 root의 src 폴더 기준의 경로 다음과 같이 `import Login from "src/components/Login/Login";` 사용하기 위해서는 위의 설정이 필요하다.
- 이것은 타입스크립트 파일의 모듈 불러올 때의 상대 경로가 아닌 지정한 폴더를 기준으로 하는 절대 경로로 추론할 수 있도록 한다. 타입스크립트는 연결된 모듈의 타입을 체크하므로 이 설정을 하면 좀 더 정확한 타입 추론을 할 수 있다.
- 하지만 위의 설정은 실제 코드가 동작할 때의 경로를 지정하는 것이 아니며, 위의 경로로 실제 동작을 하게 하려면 vite.config.ts 파일에서 vite의 설정을 해야 한다.

### 개발 서버 실행하기

```
yarn dev
```
