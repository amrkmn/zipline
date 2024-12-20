import { Metric } from '@/lib/db/models/metric';
import { ChartTooltip, LineChart } from '@mantine/charts';
import { Paper, Title } from '@mantine/core';

export default function ViewsGraph({ metrics }: { metrics: Metric[] }) {
  const sortedMetrics = metrics.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <Paper radius='sm' withBorder p='sm'>
      <Title order={3}>Views</Title>
      {/* <Line
        data={[
          ...metrics.map((metric) => ({
            date: metric.createdAt,
            views: metric.data.fileViews,
            type: 'Files',
          })),
          ...metrics.map((metric) => ({
            date: metric.createdAt,
            views: metric.data.urlViews,
            type: 'URLs',
          })),
        ]}
        xField='date'
        yField='views'
        seriesField='type'
        xAxis={{
          type: 'time',
          mask: 'YYYY-MM-DD HH:mm:ss',
        }}
        yAxis={{
          label: {
            formatter: (v) => `${v} views`,
          },
        }}
        legend={{
          position: 'top',
        }}
        padding='auto'
        smooth
      /> */}
      <LineChart
        mt='xs'
        h={400}
        data={sortedMetrics.map((metric) => ({
          date: new Date(metric.createdAt).getTime(),
          files: metric.data.fileViews,
          urls: metric.data.urlViews,
        }))}
        series={[
          {
            name: 'files',
            label: 'File Views',
            color: 'blue',
          },
          {
            name: 'urls',
            label: 'URL Views',
            color: 'green',
          },
        ]}
        dataKey='date'
        curveType='natural'
        lineChartProps={{ syncId: 'datedStatistics' }}
        xAxisProps={{
          tickFormatter: (v) => new Date(v).toLocaleString(),
        }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip
              label={new Date(label).toLocaleString()}
              payload={payload}
              series={[
                { name: 'files', label: 'File Views' },
                { name: 'urls', label: 'URL Views' },
              ]}
            />
          ),
        }}
        connectNulls
        withDots={false}
      />
    </Paper>
  );
}
