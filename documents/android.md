## 안드로이드

## 안드로이드 환경 구축하기

### 안드로이드 Command line tools 세팅하기

- https://developer.android.com/studio 에서 맥북 버전을 다운로드 받는다.
- 안드로이드 스튜디오를 다운로드 받아서 사용할 수도 있지만, 앱 개발을 하는 것이 아니므로 용량이 큰 안드로이드 스튜디오를 사용하지 않는 방식으로 사용해 보자.
- 압축 파일이 받아지고, 압축을 풀면 `cmdline-tools`라는 이름의 폴더가 생성된다.
- 적당한 폴더 예를 들어 `~/projects/android` 경로에 다음 구조의 폴더를 만들어 보자. `~/projects/android` 경로는 예시로 제시한 것이고 사용하고 싶은 경로를 지정하면 된다.

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

### sdkmanager 사용하기

- `bin` 폴더 안에는 `sdkmanager`라는 파일이 들어 있다. 이 파일은 실행할 수 있는 파일로, 파일 경로를 커멘드라인에 입력하면 `sdkmanager`가 제공하는 명령어를 사용할 수 있다.
- 커멘드 라인에 다음과 같이 입력 해 보자. `~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager` 또는 터미널이 이미 bin 폴더의 위치라면 `./sdkmanager`를 사용해서 `sdkmanager`의 명령을 사용할 수 있다.

#### 자바 런타임 JDK 설치하기

- jdk는 자바로 만들어진 파일을 실행시키기 위해서 필요한 프로그램이다.
- `sdkmanager`를 사용하기 위해서는 자바 런타임이 필요하다.
  > The operation couldn’t be completed. Unable to locate a Java Runtime.
  > Please visit http://www.java.com for information on installing Java.
- https://www.java.com/en/download/ 경로로 들어가서 'If you are running on an M series system (ARM64), download the ARM64 version of the JRE .'라는 메시지의 'ARM64 version of the JRE' 부분에 마우스 클릭하면 애플실리콘 (M1, M2)용의 자바 런타임을 다운로드 받을 수 있다.
- 다운로드 받은 파일은 `jdk-21_macos-aarch64_bin`이다. 가능한한 최신의 jdk 버전을 받는 편이 좋고 글을 작성할 시점에서는 jdk-21이 최신 버전이다. 가끔 특정 jdk 버전을 요구하는 프로젝트가 있을 수도 있다.
- 다운로드 받은 JDK를 실행하여 설치하도록 하자. 설치가 다 되었다면 `java -version` 명령어를 사용해 보자. 자바가 설치되었다는 다음과 같은 메시지가 나온다.

  ```
  java version "21" 2023-09-19 LTS
  Java(TM) SE Runtime Environment (build 21+35-LTS-2513)
  Java HotSpot(TM) 64-Bit Server VM (build 21+35-LTS-2513, mixed mode, sharing)
  ```

- `~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager` 명령어를 다시 한 번 실행 시켜보자. 그러면 sdkmanager의 사용법에 관한 구문이 나온다.
