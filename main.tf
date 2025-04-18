terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

# Create a Docker network for our application
resource "docker_network" "app_network" {
  name = "devops_app_network"
}

# Frontend React application
resource "docker_image" "frontend" {
  name         = "devops_frontend:latest"
  build {
    path = "${path.module}/front/presentation_layer"
    tag  = ["devops_frontend:latest"]
  }
  keep_locally = true
}

resource "docker_container" "frontend" {
  image   = docker_image.frontend.image_id
  name    = "devops_frontend"
  restart = "unless-stopped"
  
  ports {
    internal = 80
    external = 3000
  }
  
  networks_advanced {
    name = docker_network.app_network.name
  }
  
  env = [
    "NODE_ENV=development"
  ]
}

# Backend Django application
