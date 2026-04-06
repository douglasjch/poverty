import { AllData, MetricData, CitationsData } from '@/types';

export async function loadAllData(): Promise<AllData | null> {
  try {
    const [
      foodInsecurity,
      paycheckToPaycheck,
      healthcareUnaffordability,
      housingShortage,
      wealthDisparity,
      citations
    ] = await Promise.all([
      fetch('/data/food-insecurity.json').then(res => res.json()) as Promise<MetricData>,
      fetch('/data/paycheck-to-paycheck.json').then(res => res.json()) as Promise<MetricData>,
      fetch('/data/healthcare-unaffordability.json').then(res => res.json()) as Promise<MetricData>,
      fetch('/data/housing-shortage.json').then(res => res.json()) as Promise<MetricData>,
      fetch('/data/wealth-disparity.json').then(res => res.json()) as Promise<MetricData>,
      fetch('/data/citations.json').then(res => res.json()) as Promise<CitationsData>,
    ]);

    return {
      foodInsecurity,
      paycheckToPaycheck,
      healthcareUnaffordability,
      housingShortage,
      wealthDisparity,
      citations
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}