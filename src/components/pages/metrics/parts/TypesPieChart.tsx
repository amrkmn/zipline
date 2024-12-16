import { Metric } from '@/lib/db/models/metric';
import dynamic from 'next/dynamic';

const Pie = dynamic(() => import('@ant-design/plots').then(({ Pie }) => Pie), { ssr: false });

export default function TypesPieChart({ metric }: { metric: Metric }) {
  return (
    <Pie
      data={metric.data.types}
      angleField='sum'
      colorField='type'
      radius={0.8}
      label={{
        type: 'outer',
        content: '{name} - {percentage}',
      }}
      legend={false}
      interactions={[{ type: 'pie-legend-active' }, { type: 'element-active' }]}
    />
  );
}
