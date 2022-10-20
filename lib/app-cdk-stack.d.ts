import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
export interface AppCdkProps extends cdk.StackProps {
    appVpc: ec2.Vpc;
    ecrRepository: ecr.Repository;
}
export declare class AppCdkStack extends cdk.Stack {
    readonly fargateService: ecsPatterns.ApplicationLoadBalancedFargateService;
    constructor(scope: Construct, id: string, props: AppCdkProps);
}
