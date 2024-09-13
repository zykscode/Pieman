import React from 'react';

import { Trader } from '#/types';

interface TopTradersListProps {
  traders: Trader[];
  isLoading: boolean;
}

const TopTradersList: React.FC<TopTradersListProps> = ({
  traders,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="text-center">Loading top traders...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Top Traders</h2>
      {traders.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {traders.map((trader) => (
            <li
              key={trader.id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {trader.name}
                </p>
                <p className="text-sm text-gray-500">
                  Profit: ${trader.profit.toFixed(2)}
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Top Performer
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No top traders available at the moment.</p>
      )}
    </div>
  );
};

export default TopTradersList;
