# 람다 생성 튜토리얼

다음 AWS 문서의 내용을 따른다.

- https://docs.aws.amazon.com/ko_kr/cdk/v2/guide/hello_world.html

```ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource
    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST, // Provide any supported Node.js runtime
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello World!'),
          };
        };
      `),
    });
  }
}
```

## 람다 공개 URL 추가

생성자 함수 블록(`constructor(scope: Construct, id: string, props?: cdk.StackProps) {`)에 공개 URL 생성 코드를 추가한다.

```ts
    // Define the Lambda function URL resource
    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    })
```

`cdk deploy` 명령어를 사용하면 다음과 같은 터미널에서 다음과 같은 출력물을 볼 수 있다.

> Outputs: CdkStack.myFunctionUrlOutput = https://abcdefg1hijklmnop2qrstuvw3xyz.lambda-url.ap-northeast-1.on.aws/
