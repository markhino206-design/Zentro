# Zentro Marketplace Monorepo

Plataforma marketplace global estilo Mercado Libre/Amazon basada en microservicios, arquitectura orientada a eventos y despliegue cloud-native.

## Stack principal
- **Frontend:** Next.js 14, React, TypeScript, TailwindCSS.
- **Backend:** NestJS + Node.js en microservicios.
- **Datos:** PostgreSQL, Redis, Elasticsearch.
- **Mensajería:** RabbitMQ.
- **Infra:** Docker, Docker Compose, Kubernetes-ready.

## Arquitectura

```mermaid
flowchart LR
  UI[Next.js Frontend] --> GW[API Gateway]
  GW --> AUTH[Auth Service]
  GW --> USER[User Service]
  GW --> PROD[Product Service]
  GW --> SEARCH[Search Service]
  GW --> ORDER[Order Service]
  GW --> PAY[Payment Service]
  GW --> REV[Review Service]
  GW --> NOTIF[Notification Service]
  GW --> SHIP[Shipping Service]
  GW --> ADMIN[Admin Service]

  AUTH --> PG[(PostgreSQL)]
  USER --> PG
  PROD --> PG
  ORDER --> PG
  REV --> PG
  PAY --> PG
  ADMIN --> PG

  PROD --> ES[(Elasticsearch)]
  SEARCH --> ES

  GW --> REDIS[(Redis Cache)]
  ORDER --> MQ[(RabbitMQ)]
  PAY --> MQ
  NOTIF --> MQ
  SHIP --> MQ
```

## Estructura

- `apps/frontend`: Aplicación web Next.js 14.
- `apps/api-gateway`: API Gateway NestJS.
- `apps/services/*`: 10 microservicios de dominio.
- `infra/docker`: archivos de contenedores y orquestación local.
- `infra/k8s`: manifests base para Kubernetes.
- `docs`: documentación funcional y técnica.
- `scripts`: utilidades de bootstrap.

## Inicio rápido

1. Copiar variables:
   ```bash
   cp .env.example .env
   ```
2. Levantar stack:
   ```bash
   docker compose -f infra/docker/docker-compose.yml up --build
   ```
3. Frontend: http://localhost:3000
4. API Gateway: http://localhost:8080

## Estado del proyecto

Este repositorio incluye una base productiva inicial:
- contratos API,
- microservicios esqueleto con patrones Controller/Service/Repository/DTO/Validation,
- eventos de dominio en RabbitMQ,
- frontend con UX marketplace responsive,
- documentación de despliegue, seguridad, performance y roadmap.
