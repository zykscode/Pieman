import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import logger from './logger';

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  logger.error('An error occurred', { error });
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
