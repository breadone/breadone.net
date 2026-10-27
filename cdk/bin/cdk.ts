#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { B1NetStack } from '../lib/b1net';

const app = new cdk.App();

new B1NetStack(app, `b1net-${process.env.ENVIRONMENT}`);