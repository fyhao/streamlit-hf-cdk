import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as ecr from "@aws-cdk/aws-ecr";
import * as path from 'path';


export class CdkEcsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define the VPC and ECS Cluster
        const vpc = new ec2.Vpc(this, "MyVpc", {
            maxAzs: 3
        });

        const cluster = new ecs.Cluster(this, "MyCluster", {
            vpc: vpc
        });

        // Define ECR repository
        const ecrRepository = new ecr.Repository(this, 'StreamlitRepo', {
            repositoryName: 'streamlit-repo'
        });

        // Define ECS Task Definition with the local Docker image
        const taskDef = new ecs.FargateTaskDefinition(this, 'TaskDef', {
            cpu: 512,
            memoryLimitMiB: 1024
        });
        const container = taskDef.addContainer('DefaultContainer', {
            image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../app')),
            memoryLimitMiB: 1024,
            logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'streamlit-hello' }),
            environment: {
                'HUGGINGFACE_TOKEN': '<YOUR TOKEN HERE>'
            }
        });

        container.addPortMappings({
            containerPort: 8080
        });

        // Create the Fargate service
        new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
            cluster: cluster,
            taskDefinition: taskDef,
            cpu: 512,
            desiredCount: 1,
            publicLoadBalancer: true
        });
    }
}