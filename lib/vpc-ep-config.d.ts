import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export interface VpcEpConfigProps extends cdk.StackProps {
    appVpc: ec2.Vpc;
}
export declare class VpcEpConfig extends cdk.Stack {
    constructor(scope: Construct, id: string, props: VpcEpConfigProps);
}
