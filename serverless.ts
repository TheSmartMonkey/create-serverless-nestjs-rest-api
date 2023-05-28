import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-ts-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-deployment-bucket', 'serverless-latest-layer-version'],
  custom: {
    stageType: '${opt:stage, env:AWS_STAGE, "dev"}',
    envType: '${env:ENV_TYPE, "dev"}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      loader: { '.html': 'text' },
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${self:custom.stageType}',
    region: 'eu-west-3',
    deploymentBucket: {
      name: '${self:custom.envType}-${self:provider.region}-serverless-framework-deployment-bucket',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
  },
  package: {
    individually: true,
    exclude: ['./**'],
    include: ['dist/**/*'],
  },
  functions: {
    main: {
      handler: 'dist/main-serverless.handler',
      events: [
        {
          http: { method: 'ANY', path: '/create-serverless-nestjs-rest-api' },
        },
        {
          http: {
            method: 'ANY',
            path: 'create-serverless-nestjs-rest-api/{proxy+}',
          },
        },
      ],
      layers: ['arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:layer:nestjsLayer:latest'],
    },
  },
};

module.exports = serverlessConfiguration;
