pipeline {
      agent any
      
      environment {
          DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
          DOCKER_IMAGE = 'naisaauliaa/aplikasi-demo'
          IMAGE_TAG = "${BUILD_NUMBER}"
      }
      
      stages {
          stage('Checkout') {
              steps {
                  checkout scm
              }
          }
          
          stage('Build Docker Image') {
              steps {
                  script {
                      sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
                      sh "docker tag ${DOCKER_IMAGE}:${IMAGE_TAG} ${DOCKER_IMAGE}:latest"
                  }
              }
          }
          
          stage('Push to Docker Hub') {
              steps {
                  script {
                      sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                      sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                      sh "docker push ${DOCKER_IMAGE}:latest"
                  }
              }
          }
          
          stage('Update Kubernetes Manifest') {
              steps {
                  script {
                      sh """
                          sed -i 's|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${IMAGE_TAG}|g' k8s/deployment.yaml
                          git config user.email "jenkins@example.com"
                          git config user.name "Jenkins CI"
                          git add k8s/deployment.yaml
                          git commit -m "Update image to ${IMAGE_TAG}" || true
                          git push origin main || true
                      """
                  }
              }
          }
      }
      
      post {
          always {
              sh 'docker logout'
          }
      }
  }
