# Aplikasi Demo GitOps (Vintagee Concept)

Proyek ini adalah aplikasi Node.js sederhana yang dirancang untuk mendemonstrasikan implementasi praktik **DevOps**, **Containerization**, dan **CI/CD Pipeline**. Aplikasi ini menampilkan server backend sederhana menggunakan Express.js dan menyertakan aset frontend bertema Vintage sebagai konsep.

Tujuan utama dari repositori ini adalah sebagai bahan pembelajaran atau *proof-of-concept* untuk otomatisasi build dan deployment menggunakan Docker dan Jenkins.

## 🌟 Fitur Utama

* **Web Server Ringan:** Dibangun menggunakan Express.js untuk respon HTTP cepat.
* **Container Ready:** Dilengkapi dengan `Dockerfile` yang dioptimalkan (menggunakan base image `node:18-alpine`).
* **CI/CD Automation:** Terintegrasi dengan Jenkins Pipeline (`Jenkinsfile`) untuk otomatisasi proses:
    * Checkout kode.
    * Build Docker Image.
    * Push ke Docker Hub (dengan versioning dan tag `latest`).
* **Version Control:** Mendukung manajemen versi aplikasi melalui environment variable (`APP_VERSION`).
* **Desain Frontend:** Menyertakan file `index.html` dengan tema "Vintagee" yang responsif (HTML/CSS/JS).

## 🛠️ Teknologi yang Digunakan

* **Runtime:** [Node.js](https://nodejs.org/) (v18)
* **Framework:** [Express.js](https://expressjs.com/)
* **Containerization:** [Docker](https://www.docker.com/)
* **CI/CD:** [Jenkins](https://www.jenkins.io/)
* **Frontend:** HTML5, CSS3, JavaScript
* **Font & Icons:** Google Fonts, Font Awesome

## 📂 Susunan Project

Berikut adalah struktur direktori dari proyek ini:

```text
.
├── Dockerfile          # Konfigurasi image Docker (Node 18 Alpine)
├── Jenkinsfile         # Definisi pipeline CI/CD Groovy
├── index.html          # Halaman landing page (Konsep Vintage)
├── package.json        # Dependensi dan script project
└── server.js           # Entry point server aplikasi (Express)
