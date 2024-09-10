'use client';

import { useEffect } from 'react';

import { initPiNetwork } from '#/utils/piNetwork';

export default function PiNetworkInitializer() {
  useEffect(() => {
    initPiNetwork();
  }, []);

  return null;
}
