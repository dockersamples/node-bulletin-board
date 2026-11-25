output "instance_id" {
  description = "ID of the provisioned EC2 instance"
  value       = aws_instance.app_server.id
}

output "public_ip" {
  description = "Public IP address of the bulletin-board-app server"
  value       = aws_instance.app_server.public_ip
}

output "application_url" {
  description = "URL to access the deployed bulletin-board-app"
  value       = "http://${aws_instance.app_server.public_ip}:8080"
}
