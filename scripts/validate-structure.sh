#!/usr/bin/env bash
set -euo pipefail

services=(auth user product search order payment review notification shipping admin)

for svc in "${services[@]}"; do
  test -f "apps/services/$svc/package.json"
  test -f "apps/services/$svc/tsconfig.json"
  test -f "apps/services/$svc/src/main.ts"
  test -f "apps/services/$svc/src/controllers/$svc.controller.ts"
  test -f "apps/services/$svc/src/services/$svc.service.ts"
  test -f "apps/services/$svc/src/repositories/$svc.repository.ts"
  test -f "apps/services/$svc/src/dto/create-$svc.dto.ts"
  test -f "apps/services/$svc/src/validations/$svc.schema.ts"
done

test -f apps/frontend/tailwind.config.ts
test -f apps/frontend/postcss.config.js
test -f apps/api-gateway/tsconfig.json

echo "structure-ok"
