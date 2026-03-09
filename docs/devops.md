# DevOps & Deploy

## Local
- Docker Compose orquesta frontend, gateway, microservicios y dependencias.
- Variables centralizadas en `.env`.

## Cloud
- Kubernetes manifests base con Deployments/Services.
- Preparado para AWS EKS o GKE.
- Recomendado: usar ingress + cert-manager + external-secrets.

## Observabilidad
- Logging estructurado (JSON).
- Métricas Prometheus (pendiente wiring).
- Trazas distribuidas OpenTelemetry (pendiente wiring).
