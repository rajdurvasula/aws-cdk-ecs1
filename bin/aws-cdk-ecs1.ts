#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { AwsCdkEcs1Stack } from '../lib/aws-cdk-ecs1-stack';
import { AppCdkStack } from '../lib/app-cdk-stack';
import { VpcEpConfig } from '../lib/vpc-ep-config';

const app = new cdk.App();

const awsCdkEcsStack = new AwsCdkEcs1Stack(app, 'AwsCdkEcs1Stack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: { account: '172489758104', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});


const appCdkStack = new AppCdkStack(app, 'AppCdkStack', {
  appVpc: awsCdkEcsStack.appVpc,
  ecrRepository: awsCdkEcsStack.appRepository,
  env: { account: '172489758104', region: 'us-east-1' }
});
appCdkStack.addDependency(awsCdkEcsStack);
