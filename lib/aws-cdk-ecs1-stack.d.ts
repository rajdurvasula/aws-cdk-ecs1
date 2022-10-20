import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
export declare class AwsCdkEcs1Stack extends cdk.Stack {
    readonly appVpc: ec2.Vpc;
    readonly appRepository: ecr.Repository;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
