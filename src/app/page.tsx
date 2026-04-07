'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import YearFilter from '@/components/filters/YearFilter';
import MetricSelector from '@/components/filters/MetricSelector';
import LineChart from '@/components/filters/LineChart';
import HeatMap from '@/components/charts/HeatMap';
import StatsSummary from '@/components/dashboard/StatsSummary';
import { loadAllData } from '@/lib/dataLoader';
import { AllData } from '@/types';

export default function Dashboard() {
  const [yearRange, setYearRange] = useState<[number, number]>([1975, 2026]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['all']);
  const [data, setData] = useState<AllData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const allData = await loadAllData();
      setData(allData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            US Poverty & Wealth Disparity Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis of poverty metrics and economic inequality (1975-Present)
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YearFilter 
              yearRange={yearRange} 
              setYearRange={setYearRange}
              minYear={1975}
              maxYear={2026}
            />
            <MetricSelector 
              selectedMetrics={selectedMetrics}
              setSelectedMetrics={setSelectedMetrics}
            />
          </div>
        </div>

        {/* Stats Summary */}
        <StatsSummary data={data} yearRange={yearRange} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Trends Over Time</h2>
            <LineChart
              data={data} 
              yearRange={yearRange}
              selectedMetrics={selectedMetrics}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Heat Map Analysis</h2>
            <HeatMap 
              data={data} 
              yearRange={yearRange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}