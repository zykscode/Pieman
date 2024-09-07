import { motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

const EscrowTransaction = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement escrow transaction logic here
    toast({
      title: 'Transaction Initiated',
      description: `Escrow transaction of ${amount} Pi to ${recipient} has been initiated.`,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (Pi)"
        required
      />
      <Input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        required
      />
      <Button type="submit" className="w-full">
        Initiate Escrow
      </Button>
    </motion.form>
  );
};

export default EscrowTransaction;
