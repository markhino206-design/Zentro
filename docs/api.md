# API pública (ejemplos)

## Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/oauth/google`
- `POST /api/v1/auth/forgot-password`

## Products
- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `POST /api/v1/products`

## Orders
- `POST /api/v1/orders`
- `GET /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id/status`

## Reviews
- `POST /api/v1/reviews`
- `GET /api/v1/sellers/:id/reviews`

## Search
- `GET /api/v1/search?q=iphone&category=phones&free_shipping=true`
