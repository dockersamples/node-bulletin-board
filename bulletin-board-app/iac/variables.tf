variable "aws_region" {
  description = "AWS region for deploying bulletin-board-app infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project prefix for consistent resource naming"
  type        = string
  default     = "bulletin-board-app"
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
  default     = "prod"
}
