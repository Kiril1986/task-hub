import { useState } from 'react';
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CustomTooltipProps = {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  coordinate?: { x: number; y: number };
};

const dataMonthly = [
  { name: 'Jan', value: 19, areaValue: 19 },
  { name: 'Feb', value: 15, areaValue: 15 },
  { name: 'Mar', value: 27, areaValue: 27 },
  { name: 'Apr', value: 38, areaValue: 38 },
  { name: 'May', value: 27, areaValue: 27 },
  { name: 'Jun', value: 19, areaValue: 19 },
  { name: 'Jul', value: 26, areaValue: 26 },
];

const dataYearly = [
  { name: '2020', value: 320, areaValue: 320 },
  { name: '2021', value: 400, areaValue: 400 },
  { name: '2022', value: 375, areaValue: 375 },
  { name: '2023', value: 440, areaValue: 440 },
  { name: '2024', value: 390, areaValue: 390 },
];

const TOOLTIP_VERTICAL_OFFSET = 40;

const MONTHLY_DOMAIN: [number, number] = [0, 50];
const YEARLY_DOMAIN: [number, number] = [0, 500];

const MONTHLY_TICKS = [0, 10, 20, 30, 40, 50];
const YEARLY_TICKS = [0, 100, 200, 300, 400, 500];

const CustomTooltip = ({ active, payload, coordinate }: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    const filtered = payload.filter((p) => p.dataKey === 'value');

    return (
      <div
        className="custom-tooltip bg-[var(--chart-6)] rounded-[20px] shadow text-[12px] text-[var(--ring)] p-[8px] py-2 pointer-events-none"
        style={{
          position: 'absolute',
          left: coordinate.x,
          top: coordinate.y - TOOLTIP_VERTICAL_OFFSET,
          transform: 'translateX(-50%)',
          minWidth: '100px',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {filtered.map((pld, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>{pld.value} Projects</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

function ProjectChart() {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');
  const data = view === 'monthly' ? dataMonthly : dataYearly;
  return (
    <div className="max-w-[604px] w-full h-[430px] bg-[var(--background)] rounded-xl p-[16px] shadow-md box-border">
      <div className="flex justify-between items-center mb-4 px-4">
        <span className="text-[16px] font-[600] mt-[8px] mb-[8px] mr-[8px] ml-[18px]">Projects Statistics</span>

        <Select
          value={view}
          onValueChange={(value: 'monthly' | 'yearly') => setView(value)}
        >
          <SelectTrigger className="w-[120px] h-[36px] bg-muted text-sm text-[var(--muted-foreground)] rounded-[20px] cursor-pointer font-poppins">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly" className="cursor-pointer">Monthly</SelectItem>
            <SelectItem value="yearly" className="cursor-pointer">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} style={{ cursor: 'pointer' }}>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ring)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--ring)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            style={{ fontSize: 12 }}
          />
          <YAxis
            domain={view === 'monthly' ? MONTHLY_DOMAIN : YEARLY_DOMAIN}
            ticks={view === 'monthly' ? MONTHLY_TICKS : YEARLY_TICKS}
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tickMargin={24}
            style={{ fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />

          <Area
            type="monotone"
            dataKey="areaValue"
            fill="var(--ring)"
            fillOpacity={0.15}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--chart-6)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectChart;
