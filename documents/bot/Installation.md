# 설치

## 사용 NodeJS 버전

```
nvm use 20
```

v20.10.0 stable

## CDK 설치하기

```
pnpm install -g aws-cdk
```

또는

```
sudo npm install -g aws-cdk
```

### CDK 설치 확인

```
cdk --version
```

### VSCODE용 AWS Toolkit 설치하기

[참고](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode)

## CDK 프로젝트 폴더 구성

```
cd cdk
```

```
cdk init app --language typescript
```

### pnpm 패키지로 바꾸기

```
rm package-lock.json
```

```
rm -rf node_modules
```

```
pnpm install
```

## AWS CLI 설치

[참고](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html)

```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
```

```
sudo installer -pkg AWSCLIV2.pkg -target /
```

### 설치 및 실행 확인

```
which aws
```

```
aws --version
```

### 설치 파일 삭제

```
rm AWSCLIV2.pkg
```