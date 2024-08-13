'use client';

import { motion } from 'framer-motion';

import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';

export function DashboardContent() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid h-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Active Escrows</CardTitle>
          </CardHeader>
          <CardContent className="flex grow items-center justify-center">
            <p className="text-4xl font-bold">5</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Total Value Locked</CardTitle>
          </CardHeader>
          <CardContent className="flex grow items-center justify-center">
            <p className="text-4xl font-bold">$50,000</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex grow items-center justify-center">
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex grow items-center justify-center">
            <p className="text-4xl font-bold">98%</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="sm:col-span-2 lg:col-span-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex grow flex-wrap items-center gap-4">
            <Button className="grow">Create New Escrow</Button>
            <Button variant="outline" className="grow">
              View All Transactions
            </Button>
            <Button variant="secondary" className="grow">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
