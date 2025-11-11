pipeline {
    // Tentukan agent 'docker' untuk memberi tahu Jenkins
    // bahwa kita perlu terhubung ke Docker
    agent any

    environment {
        // !! GANTI INI !! dengan nama image Anda di Docker Hub
        DOCKER_IMAGE = "naisaauliaa/aplikasi-demo"
        // ID credentials Docker Hub yang Anda simpan di Jenkins
        DOCKER_CREDS = 'docker-hub-creds'
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    // Kita akan menggunakan nomor build Jenkins sebagai tag versi
                    def versionTag = "${env.BUILD_NUMBER}"
                    def imageName = "${DOCKER_IMAGE}:${versionTag}"
                    def latestName = "${DOCKER_IMAGE}:latest"

                    echo "Membangun image: ${imageName}"

                    // 1. MEMBANGUN IMAGE (Sintaks Baru)
                    // Gunakan 'docker.build'
                    // Teruskan argumen APP_VERSION_ARG
                    def customImage = docker.build(imageName, "--build-arg APP_VERSION_ARG=${versionTag} .")

                    // 2. MEMBERI TAG (Sintaks Baru)
                    customImage.tag(latestName)
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Mendorong image ke Docker Hub..."
                    
                    // 3. LOGIN & PUSH (Sintaks Baru)
                    // Gunakan 'docker.withRegistry'
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDS) {
                        
                        def versionTag = "${env.BUILD_NUMBER}"
                        def imageName = "${DOCKER_IMAGE}:${versionTag}"
                        def latestName = "${DOCKER_IMAGE}:latest"

                        // Push tag versi
                        docker.image(imageName).push()

                        // Push tag 'latest'
                        docker.image(latestName).push()
                    }
                }
            }
        }
    }
    // 'post' tidak berubah dan tetap berfungsi
    post {
        always {
            echo "Pipeline Selesai"
            // Logout sudah di-handle oleh withRegistry
        }
    }
}
