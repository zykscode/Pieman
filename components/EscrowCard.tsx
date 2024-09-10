import React from 'react';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface EscrowCardProps {
  id: string;
  amount: number;
  status: string;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

export function EscrowCard({
  id,
  amount,
  status,
  onComplete,
  onCancel,
}: EscrowCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow #{id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Amount: {amount} Pi</p>
        <p>Status: {status}</p>
        <div className="mt-4 space-x-2">
          <Button
            onClick={() => onComplete(id)}
            disabled={status !== 'PENDING'}
          >
            Complete
          </Button>
          <Button
            onClick={() => onCancel(id)}
            variant="destructive"
            disabled={status !== 'PENDING'}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
