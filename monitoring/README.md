# Monitoring local avec Prometheus et Grafana

Ce dossier permet de lancer un stack de monitoring gratuit pour l'application.

## Pré-requis

- Docker
- Docker Compose

## Lancer le monitoring

Depuis ce dossier:

```bash
docker compose -f docker-compose.monitoring.yml up --build
```

Ce stack suppose que l'application tourne déjà sur ta machine sur `http://localhost:8080`.
Pour éviter le conflit avec Kubernetes, lance l'application locale sur `http://localhost:8081`.
Prometheus scrappe l'application via `host.docker.internal:8081`.

## URLs utiles

- Application: http://localhost:8080
- Metrics Prometheus: http://localhost:8080/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

## Si une URL ne répond pas

- `Cannot GET /metrics` signifie que l'application qui tourne sur le port 8080 n'est pas la version mise à jour. Relance l'application depuis `bulletin-board-app/server.js` ou reconstruis le conteneur avec Docker Compose.
- `ERR_CONNECTION_REFUSED` sur `9090` ou `3000` signifie que le stack monitoring n'est pas lancé ou que Docker Desktop n'est pas démarré.
- Vérifie que Docker Desktop est ouvert, puis relance la commande `docker compose -f docker-compose.monitoring.yml up --build` depuis ce dossier.

## Identifiants Grafana

Par défaut:

- utilisateur: admin
- mot de passe: admin

## Idée de dashboard

Dans Grafana, ajoute une source de données Prometheus vers:

```text
http://prometheus:9090
```

Puis crée un panneau avec les métriques:

- `bulletin_board_http_requests_total`
- `bulletin_board_http_request_duration_seconds`
