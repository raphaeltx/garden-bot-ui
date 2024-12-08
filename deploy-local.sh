#!/bin/bash

set -e

IMAGE_NAME="garden-bot-ui"

undo_changes() {
    sorce ./undeploy_local.sh
}

printf "Building Docker image...\n"
docker build -t $IMAGE_NAME .

printf "Loading Docker image into Kind...\n"
kind load docker-image $IMAGE_NAME:latest || undo_changes

printf "Applying Kubernetes resources...\n"

kubectl create configmap garden-bot-ui-config --from-env-file=.env || undo_changes
kubectl apply -f k8s/deployment.yaml || undo_changes
kubectl apply -f k8s/service.yaml || undo_changes

printf "Updating /etc/hosts...\n"
printf "127.0.0.1 garden-bot-ui.local" | sudo tee -a /etc/hosts || undo_changes

printf "Deployment successful! You can access the app at http://garden-bot-ui.local:8080\n"