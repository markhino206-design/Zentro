# Arquitectura del Marketplace

## Estilo arquitectónico
- Microservicios por dominio.
- API Gateway para agregación, autenticación y rate limiting.
- Event-driven architecture mediante RabbitMQ.
- Persistencia en PostgreSQL por bounded context (schema por servicio).

## Servicios
1. Auth Service: registro, login, JWT, OAuth Google, recuperación de contraseña.
2. User Service: perfil, direcciones, historial compra/venta.
3. Product Service: catálogo, categorías, variantes, stock, SKU.
4. Search Service: indexación y consulta Elasticsearch.
5. Order Service: carrito, checkout, estados de orden.
6. Payment Service: Stripe + webhooks; preparado para otros providers.
7. Review Service: reputación vendedor 1..5 estrellas.
8. Notification Service: email/push/in-app.
9. Shipping Service: cálculo de tarifa/ETA + tracking.
10. Admin Service: moderación, bans, gestión de catálogo.

## Eventos clave
- `order.created`
- `payment.confirmed`
- `order.shipped`
- `review.created`
- `question.created`
- `notification.dispatch`

## Seguridad
- JWT + refresh tokens.
- Hash de contraseñas con bcrypt.
- Validación de DTOs.
- Rate limiting por IP y por usuario.
- Protección XSS/CSRF/SQL Injection.

## Performance
- Redis para cache de búsqueda y catálogos.
- Paginación obligatoria en listados.
- Lazy loading de listados pesados.
- Optimización de imágenes y CDN.
