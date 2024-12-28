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