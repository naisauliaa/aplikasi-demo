pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "naisaauliaa/aplikasi-demo"
        DOCKER_CREDS = 'docker-hub-creds'
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    def versionTag = "${env.BUILD_NUMBER}"
                    echo "Membangun image: ${DOCKER_IMAGE}:${versionTag}"
                    
                    sh "docker build -t ${DOCKER_IMAGE}:${versionTag} --build-arg APP_VERSION_ARG=${versionTag} ."
                    sh "docker tag ${DOCKER_IMAGE}:${versionTag} ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Mendorong image ke Docker Hub..."
                    
                    withCredentials([usernamePassword(
                        credentialsId: "${DOCKER_CREDS}", 
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo \"\$DOCKER_PASS\" | docker login -u \"\$DOCKER_USER\" --password-stdin
                            docker push ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                            docker push ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline Selesai"
        }
    }
}
