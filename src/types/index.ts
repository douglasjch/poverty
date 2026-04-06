export interface DataPoint {
    year: number;
    value: number | null;
    note?: string;
    citationId?: string | null;
  }
  
  export interface MetricData {
    metric: string;
    unit: string;
    data: DataPoint[];
  }
  
  export interface Citation {
    id: string;
    source: string;
    title: string;
    year: number;
    url: string;
    accessDate: string;
    format: string;
  }
  
  export interface CitationsData {
    citations: Citation[];
  }
  
  export interface AllData {
    foodInsecurity: MetricData;
    paycheckToPaycheck: MetricData;
    healthcareUnaffordability: MetricData;
    housingShortage: MetricData;
    wealthDisparity: MetricData;
    citations: CitationsData;
  }
  
  export interface ChartDataPoint {
    year: number;
    foodInsecurity?: number | null;
    paycheckToPaycheck?: number | null;
    healthcareUnaffordability?: number | null;
    housingShortage?: number | null;
    wealthDisparity?: number | null;
    citations?: Record<string, string>;
  }