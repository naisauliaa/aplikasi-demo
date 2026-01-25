# GitOps Demo Application (Node.js & Jenkins)

This repository contains a simple **Node.js** application designed as a *Proof of Concept* (PoC) to demonstrate the implementation of a **CI/CD Pipeline**, **Containerization**, and modern **DevOps** practices.

The application uses the **Express.js** framework and features a fully automated configuration using **Jenkins** to build and push Docker Images to Docker Hub.

## 🌟 Key Features

* **Simple REST API:** A lightweight backend server using Express.js that responds with the current application version.
* **Containerized Environment:** The application is packaged using Docker with the `node:18-alpine` base image, ensuring a lightweight and secure runtime.
* **Jenkins CI/CD Pipeline:** Fully integrated with Jenkins to automate the delivery process:
    * **Clean & Checkout:** Cleans the workspace and retrieves the latest code.
    * **Build:** Builds the Docker Image with dynamic tagging (based on the build number).
    * **Push:** Pushes the image to Docker Hub with both a specific build tag and the `latest` tag.
* **Vintage Frontend Concept:** Includes static assets (`index.html`) featuring a "Vintagee" theme as a frontend interface concept.

## 🛠️ Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/) (v18)
* **Framework:** [Express.js](https://expressjs.com/)
* **Containerization:** [Docker](https://www.docker.com/)
* **CI/CD:** [Jenkins](https://www.jenkins.io/)

## 📂 Project Structure

```text
.
├── Dockerfile          # Docker image configuration (Node 18 Alpine)
├── Jenkinsfile         # CI/CD Pipeline definition (Groovy)
├── index.html          # Frontend Assets (Vintage Theme)
├── package.json        # Node.js Dependencies
├── server.js           # Server entry point (Port 8080)
└── README.md           # Project Documentation
