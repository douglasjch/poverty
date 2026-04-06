import { AllData, MetricData } from '@/types';

interface StatsSummaryProps {
  data: AllData;
  yearRange: [number, number];
}

export default function StatsSummary({ data, yearRange }: StatsSummaryProps) {
  if (!data) return null;

  const latestYear = yearRange[1];

  const getLatestValue = (metricData: MetricData): number | string => {
    const point = metricData?.data.find(d => d.year === latestYear);
    return point?.value ?? 'N/A';
  };

  const stats = [
    {
      label: 'Food Insecurity',
      value: getLatestValue(data.foodInsecurity),
      unit: '%',
      color: 'bg-red-500'
    },
    {
      label: 'Paycheck-to-Paycheck',
      value: getLatestValue(data.paycheckToPaycheck),
      unit: '%',
      color: 'bg-orange-500'
    },
    {
      label: 'Healthcare Unaffordability',
      value: getLatestValue(data.healthcareUnaffordability),
      unit: '%',
      color: 'bg-purple-500'
    },
    {
      label: 'Housing Shortage',
      value: getLatestValue(data.housingShortage),
      unit: 'M',
      color: 'bg-blue-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
            {stat.value !== 'N/A' ? stat.value : '?'}
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stat.value !== 'N/A' ? `${stat.value}${stat.unit}` : 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-1">As of {latestYear}</p>
        </div>
      ))}
    </div>
  );
}