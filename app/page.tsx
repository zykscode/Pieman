'use client';

import { Award, Bell, Check, Layers, Scale } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import FirstTimeVisitor from '#/components/first-time-visitor';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);

  useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }
  }, []);
  return (
    <div className="flex grow flex-col">
      {isFirstTimeVisitor ? (
        <div className="flex flex-col">
          <FirstTimeVisitor />
          <div className="h min-h-screen">hdhd</div>
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center bg-blue-900 p-8 text-white">
          <div className="w-full max-w-md">
            <h1 className="mb-4 text-2xl font-bold">Escrow service App</h1>

            <Card className="mb-4 bg-blue-800 text-white">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Wallet Balance</p>
                    <p className="text-2xl font-bold">$4,500.00</p>
                  </div>
                  <Bell className="size-6" />
                </div>
                <div>
                  <p className="text-sm opacity-70">Escrow Balance</p>
                  <p className="text-xl font-semibold">$200.00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4 bg-white text-blue-900">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <Layers className="mb-1 size-6" />
                    <p className="text-sm font-semibold">Active</p>
                    <p className="text-lg font-bold">1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Check className="mb-1 size-6" />
                    <p className="text-sm font-semibold">Completed</p>
                    <p className="text-lg font-bold">1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Scale className="mb-1 size-6" />
                    <p className="text-sm font-semibold">Dispute</p>
                    <p className="text-lg font-bold">1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="mb-1 size-6" />
                    <p className="text-sm font-semibold">Total</p>
                    <p className="text-lg font-bold">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6 flex space-x-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                + Top up wallet
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white text-white hover:bg-blue-800"
              >
                Withdraw
              </Button>
            </div>

            <Card className="bg-white text-blue-900">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  RECENT TRANSACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm text-gray-600">ID: SD23432836</p>
                        <p className="font-semibold">$1,200.00</p>
                        <p className="text-sm">James Peter's enterprise</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Created on March 12 2023
                        </p>
                        <Button variant="link" className="p-0 text-blue-600">
                          See details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  );
};

export default Page;
