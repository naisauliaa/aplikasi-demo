pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        DOCKER_IMAGE = "naisaauliaa/aplikasi-demo"
        
        DOCKER_CREDS = 'docker-hub-credentials' 
    }

    stages {
        
        stage('Checkout & Clean') {
            steps {
                cleanWs()     // Hapus folder kerja lama yang rusak
                checkout scm  // Download codingan fresh dari GitHub
            }
        }

        stage('Build Image') {
            steps {
                script {
                    def versionTag = "${env.BUILD_NUMBER}"
                    echo "Membangun image: ${DOCKER_IMAGE}:${versionTag}"
                    
                    // Build image dengan tag nomor build
                    sh "docker build -t ${DOCKER_IMAGE}:${versionTag} ."
                    // Tag ulang menjadi 'latest' agar ArgoCD gampang mendeteksi
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
                            echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
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
            // Opsional: Bersihkan lagi setelah selesai agar hemat disk
            cleanWs() 
        }
    }
}
