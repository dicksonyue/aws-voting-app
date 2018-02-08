# AWS Voting App

Jenkins setup
General
- Project Name

Source Code Management
- Git
- Repo https://github.com/dicksonyue/aws-voting-app.git
- Branch */master

Build trigger
- checked GitHub hook trigger for GITScm polling

Build
#!/bin/bash
DOCKER_LOGIN=`aws ecr get-login --region us-west-2`
${DOCKER_LOGIN}
echo $GIT_COMMIT

Docker Build and Publish
Repository Name: aws-voting-app-svc-10001
Tag: $GIT_COMMIT
Docker registry URI: https://179303575282.dkr.ecr.us-west-2.amazonaws.com/aws-voting-app-svc-10001

Repeat for
Repository Name: aws-voting-app-svc-10002
Repository Name: aws-voting-app-svc-10003

Execute Shell
#!/bin/bash
AWSREGION=us-west-2
CFFILE=cf.yaml
CFSTACKNAME=ecsv30
ImgSvc10001=179303575282.dkr.ecr.us-west-2.amazonaws.com/aws-voting-app-svc-10001:$GIT_COMMIT
ImgSvc10002=179303575282.dkr.ecr.us-west-2.amazonaws.com/aws-voting-app-svc-10002:$GIT_COMMIT
ImgSvc10003=179303575282.dkr.ecr.us-west-2.amazonaws.com/aws-voting-app-svc-10003:$GIT_COMMIT


aws cloudformation update-stack --template-body file://$CFFILE  --parameters ParameterKey=SubnetId,ParameterValue=subnet-6712a002\\,subnet-6c50801b ParameterKey=VpcId,ParameterValue=vpc-953ae1f0 ParameterKey=ImgSvc10001,ParameterValue=$ImgSvc10001 ParameterKey=ImgSvc10002,ParameterValue=$ImgSvc10002 ParameterKey=ImgSvc10003,ParameterValue=$ImgSvc10003 --capabilities CAPABILITY_IAM --stack-name $CFSTACKNAME --region $AWSREGION

Post-Build actions
Slack Notification
