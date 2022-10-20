"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const ecs = require("aws-cdk-lib/aws-ecs");
const ecsPatterns = require("aws-cdk-lib/aws-ecs-patterns");
class AppCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            desiredCount: 1,
            taskImageOptions: {
                image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository),
                containerName: 'testnode',
                containerPort: 8080
            }
        });
    }
}
exports.AppCdkStack = AppCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNkay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jZGstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBR25DLDJDQUEyQztBQUMzQyw0REFBNEQ7QUFRNUQsTUFBYSxXQUFZLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFJdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixjQUFjO1FBQ2QsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFO1lBQzFELFdBQVcsRUFBRSxHQUFHLEVBQUUsY0FBYztZQUNoQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQUMscUNBQXFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtZQUN0RyxPQUFPLEVBQUUsVUFBVTtZQUNuQixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsWUFBWSxFQUFFLENBQUM7WUFDZixnQkFBZ0IsRUFBRTtnQkFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO2dCQUNoRSxhQUFhLEVBQUUsVUFBVTtnQkFDekIsYUFBYSxFQUFFLElBQUk7YUFDdEI7U0FDSixDQUFDLENBQUM7SUFFUCxDQUFDO0NBQ0o7QUE1QkQsa0NBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCAqIGFzIGVjciBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNyJztcbmltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGVjc1BhdHRlcm5zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MtcGF0dGVybnMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ2RrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gICAgYXBwVnBjOiBlYzIuVnBjO1xuICAgIGVjclJlcG9zaXRvcnk6IGVjci5SZXBvc2l0b3J5O1xufVxuXG5leHBvcnQgY2xhc3MgQXBwQ2RrU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIFxuICAgIHB1YmxpYyByZWFkb25seSBmYXJnYXRlU2VydmljZTogZWNzUGF0dGVybnMuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQXBwQ2RrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgICAgIFxuICAgICAgICAvLyBFQ1MgQ2x1c3RlclxuICAgICAgICBjb25zdCBlY3NDbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsIGAke2lkfS1lY3MtY2x1c3RlcmAsIHtcbiAgICAgICAgICAgIGNsdXN0ZXJOYW1lOiBgJHtpZH0tZWNzLWNsdXN0ZXJgLFxuICAgICAgICAgICAgdnBjOiBwcm9wcy5hcHBWcGNcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGYXJnYXRlIExhdW5jaFxuICAgICAgICB0aGlzLmZhcmdhdGVTZXJ2aWNlID0gbmV3IGVjc1BhdHRlcm5zLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRmFyZ2F0ZVNlcnZpY2UodGhpcywgYCR7aWR9LUZhcmdhdGVTZXJ2aWNlYCwge1xuICAgICAgICAgICAgY2x1c3RlcjogZWNzQ2x1c3RlcixcbiAgICAgICAgICAgIHB1YmxpY0xvYWRCYWxhbmNlcjogZmFsc2UsXG4gICAgICAgICAgICBtZW1vcnlMaW1pdE1pQjogMTAyNCxcbiAgICAgICAgICAgIGNwdTogNTEyLFxuICAgICAgICAgICAgZGVzaXJlZENvdW50OiAxLFxuICAgICAgICAgICAgdGFza0ltYWdlT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbUVjclJlcG9zaXRvcnkocHJvcHMuZWNyUmVwb3NpdG9yeSksXG4gICAgICAgICAgICAgICAgY29udGFpbmVyTmFtZTogJ3Rlc3Rub2RlJyxcbiAgICAgICAgICAgICAgICBjb250YWluZXJQb3J0OiA4MDgwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG59Il19