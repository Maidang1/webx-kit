import type { AnyTRPCRouter } from '@trpc/server';
import type { SetOptional } from 'type-fest';
import {
  CustomHandlerOptions,
  TrpcClientOptions,
  createCustomHandler as internalCreateCustomHandler,
  createTrpcClient as internalCreateTrpcClient,
} from './client-base';

export const createCustomHandler = (options: SetOptional<CustomHandlerOptions, 'type'>) =>
  internalCreateCustomHandler({ type: 'popup', ...options });

export const createTrpcClient = <TRouter extends AnyTRPCRouter>(options: SetOptional<TrpcClientOptions, 'type'>) =>
  internalCreateTrpcClient<TRouter>({ type: 'popup', ...options });
