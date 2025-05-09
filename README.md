# DevOps Project

This repository contains a fully implemented DevOps workflow for a three-tier web application.

## Getting Started

### Prerequisites

* Docker & Docker Compose v3+
* Git v2+
* Node.js & npm
* Python 3.11+
* Terraform v1.0+
* Minikube or Kind for Kubernetes

### Running Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/devops-pr.git
   cd devops-pr
   ```
2. Build and launch all services:

   ```bash
   docker-compose up --build
   ```
3. Frontend → `http://localhost:3000`
4. Backend → `http://localhost:5000`

### CI/CD Pipelines

* CI: Runs on PRs, see `.github/workflows/ci.yml`.
* CD: Runs on merges to `main`, see `.github/workflows/cd.yml`.

### Terraform

```bash
cd terraform
terraform init
terraform apply --auto-approve
```

### Kubernetes
```bash
kubectl apply -f k8s/
kubectl get pods,svc
```

## Repository Structure

```
devops-pr/
├── back/
│   └── application_layer/
│       ├── application_layer/    # Django project
│       ├── db.sqlite3
│       ├── Dockerfile
│       ├── manage.py
│       └── requirements.txt
├── front/
│   └── presentation_layer/
│       ├── src/                 # Frontend source
│       ├── Dockerfile
│       └── nginx.conf
├── docs/                        # Screenshots and reports
├── .github/workflows/           # CI & CD pipelines
├── terraform/                   # IaC configuration
├── k8s/                         # Kubernetes manifests (optional)
└── docker-compose.yml
```

