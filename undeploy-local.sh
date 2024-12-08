#!/bin/bash

set -e

DEPLOYMENT_FILE="k8s/deployment.yaml"
SERVICE_FILE="k8s/service.yaml"

printf "Undeploying Kubernetes resources...\n"

kubectl delete -f $SERVICE_FILE
kubectl delete -f $DEPLOYMENT_FILE
kubectl delete configmap garden-bot-ui-config

IMAGE_NAME="garden-bot-ui"

printf "Removing Docker image from Kind cluster: $IMAGE_NAME...\n"
kind unload docker-image $IMAGE_NAME

printf "Removing local Docker image: $IMAGE_NAME...\n"
docker rmi $IMAGE_NAME || printf "Local image $IMAGE_NAME not found.\n"

if grep -q "garden-bot-ui.local" /etc/hosts; then
    printf "Removing 'garden-bot-ui.local' from /etc/hosts...\n"
    sudo sed -i '/garden-bot-ui.local/d' /etc/hosts
else
    printf "'garden-bot-ui.local' not found in /etc/hosts\n"
    exit 1
fi

printf "Verifying pod status...\n"
kubectl get pods

printf "Cleaning up stopped Docker containers...\n"
docker container prune -f

printf "Cleaning up unused Docker images...\n"
docker image prune -f

printf "Undeployment and cleanup completed!\n"