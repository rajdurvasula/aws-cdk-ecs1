# CDK TypeScript project - ECS workload behind SharedNetwork

This is a CDK TypeScript project to deploy:
- ECS Instances in a VPC created from IPAM Pool shared by SharedNetwork Account
- ECS Cluster is deployed with ApplicationLoadBalancedFargate option

## Prerequisites
- Create 2 Subnets (1 in each AZ)
- Create Route Table for both Subnets
- Create Security Groups
  - Security Group 1:
    - Allow `All Traffic` from Internal VPC CIDR (11.0.0.0/16)
  - Security Group 2:
    - Allow `HTTPS Traffic` from VPC CIDR (VPC which is used for ECS Cluster)
- Tag Subnets as per STNO guidelines
- Tag VPC as per STNO guidelines
- Provision North-South Routing
- Create VPC Endpoints for:
  - ECR.DKR
  - ECR.API
  - S3
  - LOGS
- Build local Docker Image
  - From Dir: `src/image`

```
docker build -t testnode:1.0.0 .
```

- Create ECR Repository
  - Name: `testnode`

- Login to ECR Repository using AWS CLI

```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 172489758104.dkr.ecr.us-east-1.amazonaws.com/testnode
```

- Tag and Push Docker Image to ECR Repository

```
docker tag testnode:1.0.0 172489758104.dkr.ecr.us-east-1.amazonaws.com/testnode:latest
docker push 172489758104.dkr.ecr.us-east-1.amazonaws.com/testnode:latest
```

## Context Keys
- Context Keys are used in file `cdk.context.json`
  - AppVpcId
  - RepositoryName = `testnode`
- Change these values to suit your environment VPC settings
- Clean the existing context json
```
cdk context --clear
```

- Create JSON keys as below:

```
{
  "AppVpcId": "your-vpc-id",
  "RepositoryName": "testnode"
}
```

## Deployment Steps
- Clone this Repo
- Go to the root directory of this Repo
- Run Synthesize command for each Stack
  - AwsCdkEcs1Stack
  - AppCdkStack

```
cdk synth AwsCdkEcs1Stack
cdk synth AppCdkStack
```

- Deploy command

```
cdk deploy --all
```

## Cleanup
- Go to the root directory of this Repo
- Destroy command

```
cdk destroy --all
```

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
