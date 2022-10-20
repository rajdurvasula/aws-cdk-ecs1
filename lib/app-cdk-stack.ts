import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface AppCdkProps extends cdk.StackProps {
    appVpc: ec2.Vpc;
    ecrRepository: ecr.Repository;
}

export class AppCdkStack extends cdk.Stack {
    
    public readonly fargateService: ecsPatterns.ApplicationLoadBalancedFargateService;
    
    constructor(scope: Construct, id: string, props: AppCdkProps) {
        super(scope, id, props);
        
        // ECS Cluster
        const ecsCluster = new ecs.Cluster(this, `${id}-ecs-cluster`, {
            clusterName: `${id}-ecs-cluster`,
            vpc: props.appVpc
        });
        
        // Fargate Launch
        this.fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, `${id}-FargateService`, {
            cluster: ecsCluster,
            publicLoadBalancer: false,
            memoryLimitMiB: 1024,
            cpu: 512,
            desiredCount: 2,
            taskImageOptions: {
                image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository),
                containerName: 'testnode',
                containerPort: 8080
            }
        });
        
    }
}