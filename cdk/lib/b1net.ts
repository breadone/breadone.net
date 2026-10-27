import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as amplify from 'aws-cdk-lib/aws-amplify'
import * as iam from 'aws-cdk-lib/aws-iam'


export class B1NetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const app = new amplify.CfnApp(this, "B1NetWebApp", {
      name: "B1NetWeb",
      repository: "https://github.com/breadone/breadone.net",
      oauthToken: githubToken,
    });

    new amplify.CfnBranch(this, "MainBranch", {
      appId: app.attrAppId,
      branchName: "main",
      environmentVariables: [
        {
          name: "S3_BUCKET_NAME",
          value: photosBucket.bucketName,
        },
      ],
    });

    const computeRole = new iam.Role(this, "AmplifyComputeRole", {
      assumedBy: new iam.ServicePrincipal(
        "amplify.amazonaws.com"
      ),
    });
    photosBucket.grantRead(computeRole)



  }

  
}
