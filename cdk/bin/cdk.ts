#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { B1NetStack } from '../lib/b1net';

const config = {
    dev: { amplifyBranchName: 'preview-environment' },
    prod: { amplifyBranchName: 'main' },
} as const;

const app = new cdk.App();
const environment = process.env.ENVIRONMENT;

if (environment !== 'dev' && environment !== 'prod') {
    throw new Error('ENVIRONMENT must be "dev" or "prod"');
}

new B1NetStack(app, `b1net-${environment}`, {
    amplifyBranchName: config[environment].amplifyBranchName,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'ap-southeast-2',
    },
});