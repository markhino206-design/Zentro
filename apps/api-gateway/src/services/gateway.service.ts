import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  private readonly allowedServices = new Set([
    'auth',
    'user',
    'product',
    'search',
    'order',
    'payment',
    'review',
    'notification',
    'shipping',
    'admin'
  ]);

  forward(service: string, path: string, payload?: Record<string, unknown>) {
    if (!this.allowedServices.has(service)) {
      return {
        gateway: 'api-gateway',
        status: 'rejected',
        reason: `Service not allowed: ${service}`
      };
    }

    return {
      gateway: 'api-gateway',
      target: service,
      path,
      payload,
      status: 'stubbed'
    };
  }
}
