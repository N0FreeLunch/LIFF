## 리액트 네이티브 설치하기

### 요구사항

- 리액트 네이티브 [설치 문서](https://reactnative.dev/docs/environment-setup?guide=native&package-manager=yarn&platform=android)를 보면 다음과 같은 설치 요구사항이 필요하다는 것을 알 수 있다.
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device
- 여기서 Android SDK Platform은 Android 13 (Tiramisu)으로 안드로이드 설정에서 sdkmanager로 설치한 "platforms;android-33"에 해당한다.
- 또 다음과 같은 요구사항을 추가로 요구한다.
  > Intel x86 Atom_64 System Image또는 Google APIs Intel x86 Atom System Image또는 (Apple M1 Silicon의 경우)Google APIs ARM 64 v8a System Image
- `~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager --list` 명령으로 해당되는 항목을 찾아 보면 "system-images;android-33;google_atd;arm64-v8a"라는 항목을 찾을 수 있다. sdkmanager로 해당 패키지를 설치하도록 하자.

```
~/projects/android/sdk/cmdline-tools/latest/bin/sdkmanager --install "system-images;android-33;google_atd;arm64-v8a"
```

### 환경 변수 설정

```sh
echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.bashrc
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.bashrc
```

```sh
echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.bash_profile
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.bash_profile
```

```sh
echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.zshrc
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.zshrc
```

또는

```sh
echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.profile
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.profile
```

- 위 명령어가 제대로 동작한다면 `~/projects/android/sdk/emulator` 안에 들어 있는 파일들을 커멘드라인 명령어로 사용할 수 있고, `~/projects/android/sdk/platform-tools` 안에 들어 있는 파일들을 커멘드라인 명령어로 사용할 수 있다. 곧 터미널에 `emulator`라고 입력하면 `~/projects/android/sdk/emulator/emulator` 파일이 실행되는 것이며, 터미널에 `adb`라고 입력하면 `~/projects/android/sdk/platform-tools/adb` 파일이 실행되는 것이다.
- 만약, 명령어가 없다고 나오면 `source ~/.bashrc || .zshrc || .bash_profile || .profile` 명령어를 실행한 후 `emulator`, `adb` 명령어를 터미널에 입력해서 실행되는지 확인한다.

### avdmanager 설정

#### 가상 디바이스 만들기

- 안드로이드 sdk 폴더의 `cmdline-tools` 하위의 bin 폴더의 `avdmanager` 파일을 실행하여 가상 디바이스를 만든다.

```
~/projects/android/sdk/cmdline-tools/latest/bin/avdmanager --verbose create avd --name "pixel_7_api33_emulator" -k "system-images;android-33;google_atd;arm64-v8a" --abi "arm64-v8a" --device "pixel_7"
```

#### 가상 디바이스 실행하기

- 안드로이드 sdk 폴더의 `emulator` 폴더 하위의 `emulator` 파일을 `-list-avds` 옵션으로 실행하여, 설정한 가상 디바이스의 리스트를 확인한다.

```
~/projects/android/sdk/emulator/emulator -list-avds
```

- 명령어 문법은 `emulator_파일_경로명 -list-avds`이다.
- 가상 디바이스 리스트에서 대상의 명칭을 복사한 뒤 다음 명령어의 `-avd` 옵션 뒤에 가상 디바이스명을 적어 준다.

```
~/projects/android/sdk/emulator/emulator -avd pixel_7_api33_emulator
```

- 명령어 문법은 `emulator_파일_경로명 -avd 가상_디바이스명`이다.
- 위 명령을 실행하면 휴대폰 디자인의 프로그램이 실행된다.
