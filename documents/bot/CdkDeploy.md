## entry-point

deploy할 때 처음 사용되는 파일은 `cdk.json`의 app 속성으로 지정할 수 있다.

```
"app": "npx ts-node --prefer-ts-exts bin/cdk.ts",
```

## src 폴더의 파일

`cdk.json`의 `bin/cdk.ts` 파일에서 사용할 cdk 정의 파일을 불러와서 사용한다.

```ts
import * as cdk from 'aws-cdk-lib';
import { HelloCdkStack } from '../src/hello-cdk';

const app = new cdk.App();
new HelloCdkStack(app, 'CdkStack', {

});
```

위의 예제를 보면 엔트리 포인트에 지정한 파일이 src 폴더 안의 `'../src/hello-cdk'`를 가져와서 사용하는 것을 볼 수 있다.

## deploy를 위한 권한 설정

```
cdk deploy
```

> current credentials could not be used to assume 'arn:aws:iam::123456789012:role/cdk-hnb659fds-deploy-role-123456789012-ap-northeast-1', but are for the right account. Proceeding anyway.

위와 같은 에러가 발생하면 제대로 실행되지 않으므로 권한을 추가 해 줘야 한다.

'IAM Identity Center > 권한 세트 > SystemAdministrator > 인라인 정책 편집'에서 다음 항목을 추가하자.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Action": [
        /**
         * other policies
         */
        "sts:AssumeRole"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```