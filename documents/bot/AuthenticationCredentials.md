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

## `cdk bootstrap` 명령을 사용하기 위한 권한

`cdk bootstrap`는 cdk로 배포를 하기 위한 기본 리소스들을 세팅하는 역할을 한다.

이 리소스를 세팅하기 위해서는 다양한 권한이 필요하며, 리소스 세팅이 된 이후에는 초기 세팅에 필요한 권한을 좀 더 제한하여 운용할 수 있다.

다음은 cdk bootstrap은 cdk를 실행하기 위한 정책을 생성하기 위해 부여되어야 하는 권한이다.

- cloudformation
- ecr
- ssm
- iam
- s3

위에서 ecr 관련 권한은 관리형 정책이 제공되지 않기 때문에 인라인 권한으로 부여한다.

### 관리형 정책 추가하기

관리형 정책이란 AWS에서 함께 사용될만한 권한들을 세트로 묶어서 제공하는 것을 의미한다. 관련된 권한을 한 꺼번에 추가하고 제거할 수 있기 때문에 편리하다는 장점이 있다.

앞서 AWS SSO를 사용했기 때문에 SSO의 유저에 권한을 부여해야 한다.

권한 세팅을 하지 않으면 다음과 같은 에러 메시지가 나타난다. 권한에 따라 다양한 에러 메시지가 생성된다.

> is not authorized to perform: cloudformation

#### cloudformation 권한 세팅

IAM Identity Center > 권한 세트 > SSO 유저에게 부여한 권한 이름 > 정책 연결 > AWSCloudFormationFullAccess 추가를 하자.

#### S3 권한 세팅

IAM Identity Center > 권한 세트 > SSO 유저에게 부여한 권한 이름 > 정책 연결 > AmazonS3FullAccess 추가를 하자.

#### SSM 권한 세팅

IAM Identity Center > 권한 세트 > SSO 유저에게 부여한 권한 이름 > 정책 연결 > AmazonSSMFullAccess 추가를 하자.

#### iam 권한 세팅

IAM Identity Center > 권한 세트 > SSO 유저에게 부여한 권한 이름 > 정책 연결 > IAMFullAccess 추가를 하자.

IAM 권한은 각종 리소스를 사용할 수 있는 권한이기 때문에 `cdk bootstrap` 설정이 완료된 이후 해제하도록 한다.

### 인라인 정책 추가하기

관리형 정책에서 제공하지 않는 권한이지만 필요한 경우, 인라인 정책을 추가할 수 있다. 인라인 권한은 권한을 하나씩 추가하는 것이기 때문에 연관된 권한을 한 꺼번에 추가하고 제거할 수 없어서 관리가 까다롭다는 단점이 있다.

> because no identity-based policy allows the ecr:CreateRepository action

> is not authorized to perform: ecr:DeleteRepository on resource

위와 같은 에러가 발생했다면, AWS 관리형 정책에는 없는 권한이기 때문에 인라인 정책으로 추가 해 줘야 한다.

'IAM Identity Center > 권한 세트 > SystemAdministrator > 인라인 정책 편집'에서 다음 항목을 추가하자.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Action": [
        "ecr:CreateRepository",
        "ecr:DescribeRepositories",
        "ecr:DeleteRepository",
        "ecr:PutLifecyclePolicy",
        "ecr:SetRepositoryPolicy",
        "ecr:GetRepositoryPolicy"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

### 생성된 리소스 삭제

#### 클라우드 포메이션 스텍 삭제

> failed bootstrapping: CloudFormationServiceException [ValidationError]: Stack:arn:aws:cloudformation:ap-northeast-1:12345678910:stack/CDKToolkit/9ad27db1-78cb-456f-b845-abcd1234567e is in DELETE_FAILED state and can not be updated.

생성되었지만 실패한 스텍이 클라우드 포메이션에 존재한다면 수동으로 삭제 해 줘야 한다. 

'CloudFormation > 스택'에서 생성된 스텍을 수동으로 삭제하자.

#### S3 버킷 삭제

> StagingBucket Resource handler returned message: "cdk-abc123def-assets-123456789012-ap-northeast-1 already exists (Service: S3, Status Code: 0, Request ID: null)" (RequestToken: 9ad27db1-78cb-456f-b845-abcd1234567e, HandlerErrorCode: AlreadyExists)

생성되었지만 실패한 스텍이 S3에 존재한다면 수동으로 삭제 해 줘야 한다.

'CloudFormation > 스택'에서 생성된 스텍을 수동으로 삭제하자.

## `cdk bootstrap` 실행

```
CDKToolkit: creating CloudFormation changeset...
CDKToolkit |  0/12 | 오후 3:38:03 | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit User Initiated
CDKToolkit |  0/12 | 오후 3:38:08 | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | CDKToolkit User Initiated
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | CloudFormationExecutionRole 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | ImagePublishingRole 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::ECR::Repository    | ContainerAssetsRepository 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::S3::Bucket         | StagingBucket 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | LookupRole 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | FilePublishingRole 
CDKToolkit |  0/12 | 오후 3:38:11 | CREATE_IN_PROGRESS   | AWS::SSM::Parameter     | CdkBootstrapVersion 
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | ImagePublishingRole Resource creation Initiated
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::SSM::Parameter     | CdkBootstrapVersion Resource creation Initiated
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | CloudFormationExecutionRole Resource creation Initiated
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::ECR::Repository    | ContainerAssetsRepository Resource creation Initiated
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | FilePublishingRole Resource creation Initiated
CDKToolkit |  0/12 | 오후 3:38:12 | CREATE_IN_PROGRESS   | AWS::S3::Bucket         | StagingBucket Resource creation Initiated
CDKToolkit |  1/12 | 오후 3:38:12 | CREATE_COMPLETE      | AWS::SSM::Parameter     | CdkBootstrapVersion 
CDKToolkit |  2/12 | 오후 3:38:13 | CREATE_COMPLETE      | AWS::ECR::Repository    | ContainerAssetsRepository 
CDKToolkit |  2/12 | 오후 3:38:13 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | LookupRole Resource creation Initiated
CDKToolkit |  3/12 | 오후 3:38:27 | CREATE_COMPLETE      | AWS::S3::Bucket         | StagingBucket 
CDKToolkit |  3/12 | 오후 3:38:28 | CREATE_IN_PROGRESS   | AWS::S3::BucketPolicy   | StagingBucketPolicy 
CDKToolkit |  3/12 | 오후 3:38:29 | CREATE_IN_PROGRESS   | AWS::S3::BucketPolicy   | StagingBucketPolicy Resource creation Initiated
CDKToolkit |  4/12 | 오후 3:38:30 | CREATE_COMPLETE      | AWS::IAM::Role          | ImagePublishingRole 
CDKToolkit |  5/12 | 오후 3:38:30 | CREATE_COMPLETE      | AWS::S3::BucketPolicy   | StagingBucketPolicy 
CDKToolkit |  6/12 | 오후 3:38:30 | CREATE_COMPLETE      | AWS::IAM::Role          | FilePublishingRole 
CDKToolkit |  7/12 | 오후 3:38:30 | CREATE_COMPLETE      | AWS::IAM::Role          | CloudFormationExecutionRole 
CDKToolkit |  7/12 | 오후 3:38:30 | CREATE_IN_PROGRESS   | AWS::IAM::Policy        | FilePublishingRoleDefaultPolicy 
CDKToolkit |  7/12 | 오후 3:38:31 | CREATE_IN_PROGRESS   | AWS::IAM::Policy        | ImagePublishingRoleDefaultPolicy 
CDKToolkit |  8/12 | 오후 3:38:31 | CREATE_COMPLETE      | AWS::IAM::Role          | LookupRole 
CDKToolkit |  8/12 | 오후 3:38:31 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | DeploymentActionRole 
CDKToolkit |  8/12 | 오후 3:38:32 | CREATE_IN_PROGRESS   | AWS::IAM::Policy        | FilePublishingRoleDefaultPolicy Resource creation Initiated
CDKToolkit |  8/12 | 오후 3:38:32 | CREATE_IN_PROGRESS   | AWS::IAM::Policy        | ImagePublishingRoleDefaultPolicy Resource creation Initiated
CDKToolkit |  8/12 | 오후 3:38:33 | CREATE_IN_PROGRESS   | AWS::IAM::Role          | DeploymentActionRole Resource creation Initiated
CDKToolkit |  9/12 | 오후 3:38:47 | CREATE_COMPLETE      | AWS::IAM::Policy        | FilePublishingRoleDefaultPolicy 
CDKToolkit | 10/12 | 오후 3:38:48 | CREATE_COMPLETE      | AWS::IAM::Policy        | ImagePublishingRoleDefaultPolicy 
CDKToolkit | 11/12 | 오후 3:38:51 | CREATE_COMPLETE      | AWS::IAM::Role          | DeploymentActionRole 
CDKToolkit | 12/12 | 오후 3:38:53 | CREATE_COMPLETE      | AWS::CloudFormation::Stack | CDKToolkit 
 ✅  Environment aws://12345678901/ap-northeast-1 bootstrapped.
```

CDK를 실행하면 CLI에 위와 같은 권한이 사용한 것을 알 수 있다. 이들 권한을 모아서 정책을 `cdk-bootstrap`이라는 커스텀 정책을 설정하는 것도 방법이다.
