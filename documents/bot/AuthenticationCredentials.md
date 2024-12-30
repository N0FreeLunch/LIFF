## AWS Config

## Identity and Access Management(IAM) 설정

'루트 액세스 관리' 메뉴에서 활성화를 한다.

## AWS Organizations 설정

다음 항목을 활성화 한다.

1. AWS Organizations > 정책 > 서비스 제어 정책
2. AWS Organizations > 서비스 > AWS IAM Identity Center (AWS Single Sign-On) > 신뢰할 수 있는 액세스 활성화 > '추가 설정 태스크를 수행하지 않고 AWS IAM Identity Center (AWS Single Sign-On)에 대한 신뢰할 수 있는 액세스를 활성화하는 옵션을 표시' 체크 (이걸 체크하지 않으면 AWS IAM Identity Center의 활성화가 이뤄지지 않음, 이 때 사용하려는 리전 이외의 다른 리전에 생성되어 있는지 확인한다.)

## IAM Identity Center 설정

1. IAM Identity Center > 메인 화면의 활성화 버튼
2. IAM Identity Center > 사용자 > 그룹 추가
3. IAM Identity Center > 사용자 > 사용자 추가
4. IAM Identity Center > 권한 세트 > SystemAdministrator 추가 > 생성
5. IAM Identity Center > 생성된 유저 선택 > 사용자 또는 그룹할당 > 권한 세트 할당 > 생성한 SystemAdministrator 권한 추가

## SSO 계정 생성

IAM Identity Center 과정에서 유저를 생성하고 메일 주소로 발송된 메일을 통해 엑세스 계정을 설정한다.

IAM Identity Center에서 권한 추가가 되었다면 로그인 후 엑세스 키를 확인할 수 있다.

## CLI 설정하기

IAM Identity Center에서 생성된 SSO 로그인을 한 후 엑세스 포털 메인 화면에서 엑세스키를 확인할 수 있다. 엑세스 키에서 확인한 정보를 다음 명령어를 실행 했을 때 나오는 CLI 입력창에 입력한다.

```
aws configure
```

```
aws configure sso
```

### 인증 정보 확인하기

이미 설정된 인증 정보가 있다면 새로 세팅하지 않아도 된다.

```
aws configure list
```

### 재접속하기

```
aws configure sso
```

위 명령어를 통해서 AWS 접속에 필요한 인증 정보 갱신 또는 재발급 할 수 있다.

이 때 SSO session name, SSO start URL 등의 정보를 매번 입력해야 한다. 이런 수고를 반복하지 않기 위해서 2가지 방법을 이용한다.

AWS CLI의 AWS 접속을 위한 세팅을 했다면 기본적으로 `~/.aws/config`에는 인증 정보가 세팅된다. 만약 인증 정보가 세팅되지 않았다면 `aws configure`와 `aws configure sso`으로 정보를 세팅하면 된다.

`~/.aws/config`에 인증정보가 세팅되었는데, `aws configure sso` 명령을 사용했을 때 정보를 입력하라는 메시지가 나오면 `~/.aws/config`의 인증 정보가 부족하거나, `aws configure sso` 명령어와 기록된 인증 정보인 `~/.aws/config`가 연결되지 않은 것을 의미한다.

#### 인증 정보 연결하기

`~/.aws/config` 파일을 보면, `[default]` `[profile profil_name]`등의 항목이 있다.(profil_name은 각 SSO 계정에 따라 명칭이 다르다.) 여기서 프로필로 설정한 항목에 대해 다음 `default` 부분에 `default`을 지정하거나 프로필명으로 바꾸어 명령어를 실행하도록 하자.

```
echo 'export AWS_PROFILE=default' >> ~/.bashrc
source ~/.bashrc
```

또는

```
echo 'export AWS_PROFILE=default' >> ~/.zshrc
source ~/.zshrc
```

를 사용하도록 하자.

설정을 했다면 `aws configure sso`을 사용해서 기존에 세팅된 정보를 확인하고 추가 입력 없이 접속을 할 수 있다.

## CDK 접근을 위한 권한 설정하기

> is not authorized to perform: cloudformation

위와 같은 에러가 발생한다면, AWS IAM의 사용자에서 대상 사용자의 상세 화면에서 AWSCloudFormationFullAccess 라는 권한을 추가해 줘야 한다.

