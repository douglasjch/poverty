interface YearFilterProps {
  yearRange: [number, number];
  setYearRange: (range: [number, number]) => void;
  minYear: number;
  maxYear: number;
}

export default function YearFilter({ yearRange, setYearRange, minYear, maxYear }: YearFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    setYearRange([newMin, yearRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    setYearRange([yearRange[0], newMax]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Year Range: {yearRange[0]} - {yearRange[1]}
      </label>
      
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-600">Start Year</label>
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={yearRange[0]}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="text-xs text-gray-600">End Year</label>
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={yearRange[1]}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <button
          onClick={() => setYearRange([minYear, maxYear])}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reset to All Years
        </button>
        <button
          onClick={() => setYearRange([2010, maxYear])}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Last 15 Years
        </button>
      </div>
    </div>
  );
}