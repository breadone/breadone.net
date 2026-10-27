import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as amplify from 'aws-cdk-lib/aws-amplify'
import * as iam from 'aws-cdk-lib/aws-iam'

interface B1NetStackProps extends cdk.StackProps {
  amplifyBranchName: string;
}

export class B1NetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: B1NetStackProps) {
    const { amplifyBranchName, ...stackProps } = props;
    super(scope, id, stackProps);

    const githubToken = process.env.AMPLIFY_GITHUB_TOKEN;
    if (!githubToken) {
      throw new Error('Set AMPLIFY_GITHUB_TOKEN before synthesizing or deploying this stack.');
    }

    const photosBucket = new s3.Bucket(this, "PhotosBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true
    });

    new cdk.CfnOutput(this, 'PhotosBucketName', {
      value: photosBucket.bucketName
    })

    const cdn = new cloudfront.Distribution(this, "PhotoCDN", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(
          photosBucket
        ),
      },
    });

    new cdk.CfnOutput(this, "CDNUrl", {
      value: `https://${cdn.distributionDomainName}`,
    });

    const computeRole = new iam.Role(this, "AmplifyComputeRole", {
      assumedBy: new iam.ServicePrincipal("amplify.amazonaws.com"),
    });
    photosBucket.grantRead(computeRole);

    const amplifyServiceRole = new iam.Role(this, "AmplifyServiceRole", {
      assumedBy: new iam.ServicePrincipal("amplify.amazonaws.com"),
      description: "Allows AWS Amplify to operate the application.",
    });

    amplifyServiceRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AdministratorAccess-Amplify"
      )
    )

    // amplifyServiceRole.addToPolicy(
    //   new iam.PolicyStatement({
    //     actions: [
    //       "logs:CreateLogStream",
    //       "logs:CreateLogGroup",
    //       "logs:DescribeLogGroups",
    //       "logs:PutLogEvents",

    //       "amplify:*",
    //       "codebuild:CreateProject",
    //       "codebuild:StartBuild",
    //       "codebuild:BatchGetBuilds",
    //       "iam:PassRole"
    //     ],
    //     resources: ["*"],
    //   }),
    // );

    const app = new amplify.CfnApp(this, "B1NetWebApp", {
      name: "B1NetWeb",
      repository: "https://github.com/breadone/breadone.net",
      accessToken: githubToken,
      platform: "WEB_COMPUTE",
      iamServiceRole: amplifyServiceRole.roleArn,
      environmentVariables: [
      ],
      buildSpec: `version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm i -g pnpm
        - pnpm config set store-dir .pnpm-store
        - pnpm install --frozen-lockfile
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: .amplify-hosting
    files:
      - '**/*'
  cache:
    paths:
      - .pnpm-store/**/*`,
    });

    new amplify.CfnBranch(this, `${amplifyBranchName}Branch`, {
      appId: app.attrAppId,
      branchName: amplifyBranchName,
      enableAutoBuild: true,
      environmentVariables: [
        {
          name: "S3_BUCKET_NAME",
          value: photosBucket.bucketName,
        },
        {
          name: "CLOUDFRONT_DOMAIN",
          value: cdn.distributionDomainName,
        }
      ],
    });
  }
}
