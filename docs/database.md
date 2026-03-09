# Modelo de Base de Datos (simplificado)

## Tablas
- `users` (buyer/seller/admin)
- `products`
- `categories`
- `orders`
- `order_items`
- `reviews`
- `questions`
- `answers`
- `payments`
- `notifications`

## DDL inicial
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  full_name VARCHAR(255),
  photo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  seller_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  category VARCHAR(80) NOT NULL,
  sub_category VARCHAR(80),
  brand VARCHAR(80),
  model VARCHAR(80),
  images JSONB,
  stock INT NOT NULL,
  sku VARCHAR(120) UNIQUE NOT NULL,
  condition VARCHAR(20),
  shipping_options JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
