import { LineChartProps } from '@mantine/charts';

export const defaultChartProps: Partial<LineChartProps> & { dataKey: string } = {
  curveType: 'bump',
  lineChartProps: { syncId: 'datedStatistics' },
  connectNulls: true,
  withDots: true,
  withLegend: true,
  dotProps: { r: 0 },
  activeDotProps: { r: 3 },
  mt: 'xs',
  h: 400,
  dataKey: 'date',
};
