'use client';

import { useEffect, useRef } from 'react';
import { AllData } from '@/types';

interface HeatMapProps {
  data: AllData;
  yearRange: [number, number];
}

export default function HeatMap({ data, yearRange }: HeatMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1000;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw heat map
    drawHeatMap(ctx, data, yearRange);
  }, [data, yearRange]);

  return (
    <div className="w-full overflow-x-auto">
      <canvas 
        ref={canvasRef} 
        className="border border-gray-200 rounded"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div className="mt-4 flex justify-center items-center gap-4">
        <span className="text-sm text-gray-600">Low</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-8 h-4"
              style={{ backgroundColor: getColor(i / 5) }}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">High</span>
      </div>
    </div>
  );
}

function drawHeatMap(
  ctx: CanvasRenderingContext2D, 
  data: AllData, 
  yearRange: [number, number]
) {
  const metrics = [
    { name: 'Food Insecurity', data: data.foodInsecurity },
    { name: 'Paycheck-to-Paycheck', data: data.paycheckToPaycheck },
    { name: 'Healthcare Unaffordability', data: data.healthcareUnaffordability },
    { name: 'Housing Shortage', data: data.housingShortage },
    { name: 'Wealth Disparity', data: data.wealthDisparity },
  ];

  const years = yearRange[1] - yearRange[0] + 1;
  const cellWidth = 800 / years;
  const cellHeight = 60;
  const leftMargin = 180;
  const topMargin = 40;

  // Draw metric labels
  ctx.font = '12px Arial';
  ctx.fillStyle = '#000';
  metrics.forEach((metric, i) => {
    ctx.fillText(metric.name, 10, topMargin + i * cellHeight + cellHeight / 2);
  });

  // Draw year labels (every 5 years)
  for (let year = yearRange[0]; year <= yearRange[1]; year += 5) {
    const x = leftMargin + (year - yearRange[0]) * cellWidth;
    ctx.fillText(year.toString(), x, topMargin - 10);
  }

  // Draw cells
  metrics.forEach((metric, metricIndex) => {
    const values = metric.data.data
      .filter(d => d.year >= yearRange[0] && d.year <= yearRange[1])
      .map(d => d.value);
    
    const maxValue = Math.max(...values.filter(v => v !== null) as number[]);
    const minValue = Math.min(...values.filter(v => v !== null) as number[]);

    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      const dataPoint = metric.data.data.find(d => d.year === year);
      const value = dataPoint?.value;

      const x = leftMargin + (year - yearRange[0]) * cellWidth;
      const y = topMargin + metricIndex * cellHeight;

      if (value !== null && value !== undefined) {
        const normalized = (value - minValue) / (maxValue - minValue);
        ctx.fillStyle = getColor(normalized);
      } else {
        ctx.fillStyle = '#e5e7eb';
      }

      ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
    }
  });
}

function getColor(value: number): string {
  // Color gradient from blue (low) to red (high)
  const r = Math.floor(value * 255);
  const b = Math.floor((1 - value) * 255);
  return `rgb(${r}, 100, ${b})`;
}