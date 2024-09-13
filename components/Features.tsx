import React from 'react';

const FeaturesComponent: React.FC = () => {
  const features = [
    {
      title: 'Real-time Trading',
      description: 'Execute trades instantly with our advanced platform.',
    },
    {
      title: 'Market Analysis',
      description: 'Access in-depth market analysis and insights.',
    },
    {
      title: 'Portfolio Management',
      description: 'Manage and optimize your portfolio with ease.',
    },
    {
      title: 'Risk Assessment',
      description: 'Evaluate and mitigate risks with our advanced tools.',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          Our Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesComponent;
