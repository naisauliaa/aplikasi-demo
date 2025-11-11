pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "naisaauliaa/aplikasi-demo"
        
        // ID credentials Docker Hub yang Anda simpan di Jenkins
        DOCKER_CREDS = 'docker-hub-creds'
    }

    stages {
        stage('Build Image') {
            steps {
                // Kita akan menggunakan nomor build Jenkins sebagai tag versi
                // Contoh: 1, 2, 3, ...
                def versionTag = "${env.BUILD_NUMBER}"
                
                echo "Membangun image: ${DOCKER_IMAGE}:${versionTag}"
                
                // Build image, dan teruskan nomor build sebagai APP_VERSION_ARG
                // yang akan ditangkap oleh Dockerfile
                sh "docker build --build-arg APP_VERSION_ARG=${versionTag} -t ${DOCKER_IMAGE}:${versionTag} ."
                
                // Beri tag 'latest' juga untuk image yang sama
                sh "docker tag ${DOCKER_IMAGE}:${versionTag} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo "Mendorong image ke Docker Hub..."
                // Login ke Docker Hub menggunakan credentials
                sh "echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin"
                
                // Push kedua tag (versi dan latest)
                sh "docker push ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }
    }
    post {
        always {
            // Selalu logout setelah selesai
            echo "Logout dari Docker Hub"
            sh "docker logout"
        }
    }
}
