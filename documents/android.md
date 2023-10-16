## 안드로이드

## 안드로이드 환경 구축하기

### 안드로이드 Command line tools 세팅하기

- https://developer.android.com/studio 에서 맥북 버전을 다운로드 받는다.
- 안드로이드 스튜디오를 다운로드 받아서 사용할 수도 있지만, 앱 개발을 하는 것이 아니므로 용량이 큰 안드로이드 스튜디오를 사용하지 않는 방식으로 사용해 보자.
- 압축 파일이 받아지고, 압축을 풀면 `cmdline-tools`라는 이름의 폴더가 생성된다.
- 적당한 폴더 예를 들어 `~/project/android` 경로에 다음 구조의 폴더를 만들어 보자. `~/project/android` 경로는 예시로 제시한 것이고 사용하고 싶은 경로를 지정하면 된다.

```
┌ cmdline-tools
│ ├ bin
│ ├ lib
│ ├ NOTICE.txt
│ ├ source.properties
```

- 기본적으로 `cmdline-tools` 폴더의 구조는 다음과 같다. 이를 다음과 같은 구조로 바꾸어 주어야 한다.

```
┌ sdk
│    ├ cmdline-tools
│    │     ├ latest
│    │     │     ├ bin
│    │     │     ├ lib
│    │     │     ├ NOTICE.txt
│    │     │     ├ source.properties
```

- 참고 : https://stackoverflow.com/a/71331807/22600994
- 일단 `~/project/android`에서 `sdk`라는 폴더를 만들자. 그리고 앞서 다운 받아 압축을 푼 `cmdline-tools` 폴더를 위치시킨다.
- 파인더에서 `cmdline-tools` 폴더에 `latest`라는 폴더를 만들고, `bin` `lib` `NOTICE.txt` `source.properties` 파일을 `latest` 폴더 안으로 옮겨 준다.
