interface Metric {
  id: string;
  label: string;
  color: string;
}

const METRICS: Metric[] = [
  { id: 'food-insecurity', label: 'Food Insecurity', color: '#ef4444' },
  { id: 'paycheck-to-paycheck', label: 'Paycheck-to-Paycheck', color: '#f59e0b' },
  { id: 'healthcare-unaffordability', label: 'Healthcare Unaffordability', color: '#8b5cf6' },
  { id: 'housing-shortage', label: 'Housing Shortage', color: '#3b82f6' },
  { id: 'wealth-disparity', label: 'Wealth Disparity', color: '#10b981' },
];

interface MetricSelectorProps {
  selectedMetrics: string[];
  setSelectedMetrics: (metrics: string[]) => void;
}

export default function MetricSelector({ selectedMetrics, setSelectedMetrics }: MetricSelectorProps) {
  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes('all')) {
      setSelectedMetrics([metricId]);
    } else if (selectedMetrics.includes(metricId)) {
      const newMetrics = selectedMetrics.filter(m => m !== metricId);
      setSelectedMetrics(newMetrics.length === 0 ? ['all'] : newMetrics);
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  const selectAll = () => {
    setSelectedMetrics(['all']);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Metrics
      </label>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedMetrics.includes('all')}
            onChange={selectAll}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-semibold">All Metrics</span>
        </label>

        {METRICS.map((metric) => (
          <label key={metric.id} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedMetrics.includes('all') || selectedMetrics.includes(metric.id)}
              onChange={() => toggleMetric(metric.id)}
              className="w-4 h-4"
              style={{ accentColor: metric.color }}
            />
            <span className="flex items-center space-x-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metric.color }}
              />
              <span className="text-sm">{metric.label}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}