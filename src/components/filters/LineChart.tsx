'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const METRIC_COLORS = {
  'food-insecurity': '#ef4444',
  'paycheck-to-paycheck': '#f59e0b',
  'healthcare-unaffordability': '#8b5cf6',
  'housing-shortage': '#3b82f6',
  'wealth-disparity': '#10b981',
};

const METRIC_LABELS = {
  'food-insecurity': 'Food Insecurity (%)',
  'paycheck-to-paycheck': 'Paycheck-to-Paycheck (%)',
  'healthcare-unaffordability': 'Healthcare Unaffordability (%)',
  'housing-shortage': 'Housing Shortage (Millions)',
  'wealth-disparity': 'Wealth Disparity (Gini Coefficient)',
};

export default function LineChart({ data, yearRange, selectedMetrics }) {
  if (!data) return <div>Loading chart...</div>;

  // Filter data by year range
  const filteredData = prepareChartData(data, yearRange, selectedMetrics);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsLineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="year" 
          label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        
        {(selectedMetrics.includes('all') || selectedMetrics.includes('food-insecurity')) && (
          <Line 
            type="monotone" 
            dataKey="foodInsecurity" 
            stroke={METRIC_COLORS['food-insecurity']} 
            name={METRIC_LABELS['food-insecurity']}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )}
        
        {(selectedMetrics.includes('all') || selectedMetrics.includes('paycheck-to-paycheck')) && (
          <Line 
            type="monotone" 
            dataKey="paycheckToPaycheck" 
            stroke={METRIC_COLORS['paycheck-to-paycheck']} 
            name={METRIC_LABELS['paycheck-to-paycheck']}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )}
        
        {(selectedMetrics.includes('all') || selectedMetrics.includes('healthcare-unaffordability')) && (
          <Line 
            type="monotone" 
            dataKey="healthcareUnaffordability" 
            stroke={METRIC_COLORS['healthcare-unaffordability']} 
            name={METRIC_LABELS['healthcare-unaffordability']}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )}
        
        {(selectedMetrics.includes('all') || selectedMetrics.includes('housing-shortage')) && (
          <Line 
            type="monotone" 
            dataKey="housingShortage" 
            stroke={METRIC_COLORS['housing-shortage']} 
            name={METRIC_LABELS['housing-shortage']}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )}
        
        {(selectedMetrics.includes('all') || selectedMetrics.includes('wealth-disparity')) && (
          <Line 
            type="monotone" 
            dataKey="wealthDisparity" 
            stroke={METRIC_COLORS['wealth-disparity']} 
            name={METRIC_LABELS['wealth-disparity']}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

// Custom tooltip with citations
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
        <p className="font-semibold mb-2">Year: {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="text-sm mb-1">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span className="font-semibold">{entry.value?.toFixed(2)}</span>
            {entry.payload.citations && entry.payload.citations[entry.dataKey] && (
              <p className="text-xs text-gray-600 mt-1">
                Source: {entry.payload.citations[entry.dataKey]}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Helper function to prepare chart data
function prepareChartData(data, yearRange, selectedMetrics) {
  const chartData = [];
  
  for (let year = yearRange[0]; year <= yearRange[1]; year++) {
    const yearData = { year };
    
    if (data.foodInsecurity) {
      const point = data.foodInsecurity.data.find(d => d.year === year);
      yearData.foodInsecurity = point?.value || null;
    }
    
    if (data.paycheckToPaycheck) {
      const point = data.paycheckToPaycheck.data.find(d => d.year === year);
      yearData.paycheckToPaycheck = point?.value || null;
    }
    
    if (data.healthcareUnaffordability) {
      const point = data.healthcareUnaffordability.data.find(d => d.year === year);
      yearData.healthcareUnaffordability = point?.value || null;
    }
    
    if (data.housingShortage) {
      const point = data.housingShortage.data.find(d => d.year === year);
      yearData.housingShortage = point?.value || null;
    }
    
    if (data.wealthDisparity) {
      const point = data.wealthDisparity.data.find(d => d.year === year);
      yearData.wealthDisparity = point?.value || null;
    }
    
    chartData.push(yearData);
  }
  
  return chartData;
}