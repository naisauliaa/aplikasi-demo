pipeline {
    // Agent 'any' sudah cukup karena kita akan
    // menggunakan 'docker' dari plugin
    agent any

    environment {
        // !! GANTI INI !! (jika belum)
        DOCKER_IMAGE = "naisaauliaa/aplikasi-demo"
        DOCKER_CREDS = 'docker-hub-creds'
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    def versionTag = "${env.BUILD_NUMBER}"
                    def imageName = "${DOCKER_IMAGE}:${versionTag}"
                    def latestName = "${DOCKER_IMAGE}:latest"

                    echo "Membangun image: ${imageName}"

                    // 1. MEMBANGUN IMAGE (Sintaks Baru via Plugin)
                    // Gunakan 'docker.build'
                    def customImage = docker.build(imageName, "--build-arg APP_VERSION_ARG=${versionTag} .")

                    // 2. MEMBERI TAG (Sintaks Baru via Plugin)
                    customImage.tag(latestName)
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Mendorong image ke Docker Hub..."

                    // 3. LOGIN & PUSH (Sintaks Baru via Plugin)
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
    post {
        always {
            echo "Pipeline Selesai"
        }
    }
}
