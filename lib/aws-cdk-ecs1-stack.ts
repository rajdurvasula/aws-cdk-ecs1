import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as path from 'path';
import { Construct } from 'constructs';

export class AwsCdkEcs1Stack extends cdk.Stack {
  
  public readonly appVpc: ec2.Vpc;
  public readonly appRepository: ecr.Repository;
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const region = cdk.Stack.of(this).region;
    
    // context keys
    const appVpcId = this.node.tryGetContext('AppVpcId')
    this.appVpc = ec2.Vpc.fromLookup(this, 'app-vpc', {
      vpcId: appVpcId
    }) as ec2.Vpc;
    
    // security group for vpc endpoints
    const epSg = new ec2.SecurityGroup(this, 'app-vpc-ep-sg', {
        vpc: this.appVpc,
        description: 'SG for VPC Endpoints',
        securityGroupName: 'app-vpc-ep-sg'
    });
    epSg.addIngressRule(ec2.Peer.ipv4(this.appVpc.vpcCidrBlock), ec2.Port.tcp(443), 'HTTPS from vpc');
    // security group for internal vpc access
    const pubSg = new ec2.SecurityGroup(this, 'app-vpc-pub-sg', {
        vpc: this.appVpc,
        description: 'SG for sharednetwork access',
        securityGroupName: 'app-vpc-pub-sg'
    });
    pubSg.addIngressRule(ec2.Peer.ipv4('11.0.0.0/16'), ec2.Port.allTraffic(), 'All traffic from intern vpc');
    
    // VPC Endpoints
    const selectedSubnets = this.appVpc.selectSubnets({
      subnetFilters: [
        ec2.SubnetFilter.availabilityZones([ 'us-east-1a' ])
      ]
    });
    const privSubnet = selectedSubnets.subnets[0];
    const rtb = privSubnet.routeTable;
    const s3GWEP = new ec2.CfnVPCEndpoint(this, 'app-vpc-s3', {
      routeTableIds: [ rtb.routeTableId ],
      serviceName: `com.amazonaws.${region}.s3`,
      vpcId: appVpcId
    });
    this.appVpc.addInterfaceEndpoint('app-ecr-dkr', {
        service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
        securityGroups: [
            epSg
        ],
        subnets: {
            subnetFilters: [
                ec2.SubnetFilter.availabilityZones([ 'us-east-1a', 'us-east-1b' ])
            ]
        }
    });
    this.appVpc.addInterfaceEndpoint('app-ecr-api', {
        service: ec2.InterfaceVpcEndpointAwsService.ECR,
        securityGroups: [
            epSg
        ],
        subnets: {
            subnetFilters: [
                ec2.SubnetFilter.availabilityZones([ 'us-east-1a', 'us-east-1b' ])
            ]
        }
    });
    this.appVpc.addInterfaceEndpoint('app-logs', {
        service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
        securityGroups: [
            epSg
        ],
        subnets: {
            subnetFilters: [
                ec2.SubnetFilter.availabilityZones([ 'us-east-1a', 'us-east-1b' ])
            ]
        }
    });    
    
    const repoName = this.node.tryGetContext('RepositoryName');
    this.appRepository = ecr.Repository.fromRepositoryName(this, 'AppRepository', repoName) as ecr.Repository;
  }
}
