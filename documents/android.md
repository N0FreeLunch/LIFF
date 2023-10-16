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

### 자바 런타임 JDK 설치하기

- jdk는 자바로 만들어진 소스코드를 컴파일하고 컴파일된 결과물을 실행시키기 위해서 필요한 프로그램이다.
- `sdkmanager`를 사용하기 위해서는 자바 런타임이 필요하다.
  > The operation couldn’t be completed. Unable to locate a Java Runtime.
  > Please visit http://www.java.com for information on installing Java.
- 하지만, 위 경로에서 JDK를 받으면 안 되는데, LIFF를 사용하기 위해서는 [line-sdk-android](https://github.com/line/line-sdk-android)를 사용해야 하기 때문이다. 라인 SDK 프로젝트의 [gradle/wrapper
  /gradle-wrapper.properties](https://github.com/line/line-sdk-android/blob/master/gradle/wrapper/gradle-wrapper.properties)의 코드를 보면 gradle-7.6을 사용하고 있다. gradle은 자바의 패키지 매니저로 NodeJS의 yarn, npm과 비슷한 기능을 하는 것이다. 그런데 gradle7 버전과 호환되는 JDK 버전은 Java 8, 9, 10, 11, 12, 13, 14, 15, 16, 17에 해당한다.
- 그런데 JDK21의 경우 기본적으로 자바 소스 코드를 자바 21 버전에 맞게 컴파일한다. [line-sdk-android](https://github.com/line/line-sdk-android)를 사용하기 위해서는 Java 8, 9, 10, 11, 12, 13, 14, 15, 16, 17에 맞게 소스 코드를 빌드 해야 한다. JDK21으로도 이전 버전의 자바의 소스를 빌드할 수 있지만, 설정이 까다롭기 때문에 그냥 JDK 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 사이의 버전으로 소스 코드를 컴파일 해 주는 JDK를 사용하는 편이 좋다.
- JDK17버전은 다음 [링크](https://www.oracle.com/java/technologies/downloads/#java17)의 macOS 항목의 ARM64 DMG Installer을 다운로드하여 사용할 수 있다. 다운로드 받은 후 설치를 해 보자.
- `ls /Library/Java/JavaVirtualMachines`라는 명령어를 치면 현재 컴퓨터에 설치되어 있는 JDK의 버전을 확인할 수 있는데, 가장 높은 버전의 JDK를 사용하기 때문에 JDK17을 사용하기 위해서는 17 보다 큰 버전의 JDK를 삭제해 줘야 한다. [[참고](https://stackoverflow.com/a/44169445/22600994)] 예를 들어 JDK21이 최신 버전이고 그 다음 버전이 JDK17이라고 할 때
  `sudo rm -rf /Library/Java/JavaVirtualMachines/jdk-21.jdk` 명령어로 JDK21을 삭제해 주면 JDK17을 사용할 수 있다.
- `java --version`으로 버전을 확인해 주면 `/Library/Java/JavaVirtualMachines`의 최신 버전의 JDK 버전에 해당하는 자바 버전이 설치된 것을 확인할 수 있다.
- `~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager` 명령어를 다시 한 번 실행 시켜보자. 그러면 sdkmanager의 사용법에 관한 구문이 나온다.

#### line-sdk-android 설정하기

- `line-sdk-android`가 설치된 프로젝트에서 프로젝트 루트 디렉토리에 `local.properties`라는 파일을 만들고 그 안에 다음 코드를 넣어 준다.

```
sdk.dir = /Users/$USER/projects/android/sdk
```

#### ANDROID_HOME 설정하기

- 터미널에서 다음 명령어를 입력하자.

```sh
echo 'export ANDROID_HOME=/Users/$USER/projects/android/sdk' >> ~/.bashrc
```

```sh
echo 'export ANDROID_HOME=/Users/$USER/projects/android/sdk' >> ~/.bash_profile
```

```sh
echo 'export ANDROID_HOME=/Users/$USER/projects/android/sdk' >> ~/.zshrc
```

또는

```sh
echo 'export ANDROID_HOME=/Users/$USER/projects/android/sdk' >> ~/.profile
```

- 정상적으로 입력 되었다면 `echo $ANDROID_HOME` 명령을 터미널에 입력 했을 때 입력한 경로(`/Users/$USER/projects/android/sdk`)가 표시된다. 만약 출력되지 않았다면, `source ~/.bashrc || .zshrc || .bash_profile || .profile`를 입력해 보자.

### sdkmanager 사용하기

- `bin` 폴더 안에는 `sdkmanager`라는 파일이 들어 있다. 이 파일은 실행할 수 있는 파일로, 파일 경로를 커멘드라인에 입력하면 `sdkmanager`가 제공하는 명령어를 사용할 수 있다.
- 커멘드 라인에 다음과 같이 입력 해 보자. `~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager` 또는 터미널이 이미 bin 폴더의 위치라면 `./sdkmanager`를 사용해서 `sdkmanager`의 명령을 사용할 수 있다.
- [line-sdk-android](https://github.com/line/line-sdk-android)를 사용하기 위해서는 sdkmanager를 이용하여 다음 패키지를 설치 해 주어야 한다.
- 설치하지 않고 [line-sdk-android](https://github.com/line/line-sdk-android)를 실행하는 경우(line sdk에서 `./gradlew app:assembleDebug`으로 확인) 다음의 패키지 설치를 요구하는 메시지가 나온다.

- Requirement

  - patcher;v4 SDK Patch Applier v4
  - platforms;android-33 Android SDK Platform 33
  - build-tools;30.0.3 Android SDK Build-Tools 30.0.3
  - platform-tools Android SDK Platform-Tools
  - tools Android SDK Tools
  - emulator Android Emulator

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager --list
```

- sdkmanager 파일에 `--list` 옵션을 주어 명령하면 설치할 수 있는 패키지 리스트가 나오는데 위의 요구사항에 해당하는 항목을 설치해 준다.

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "patcher;v4"
```

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "platforms;android-33"
```

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "build-tools;30.0.3"
```

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "platform-tools"
```

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "emulator"
```

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager  --install "cmdline-tools;latest"
```

### line-sdk-android 실행하기

- [line-sdk-android](https://github.com/line/line-sdk-android)가 설치된 프로젝트의 루트 디렉토리 경로의 터미널에서 `./gradlew app:assembleDebug` 명령을 실행한다.
- 연두색 글씨의 'BUILD SUCCESSFUL'가 나오면 성공한 것이고, 빨강색의(crimson에 가까운 색) 'BUILD FAILED'가 나오면 실패한 것이다. 실패 했다면 실패 설명을 보고 보완을 하면 된다.
