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


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomTooltip } from './components/CustomToolTip';
import { dataMonthly, dataYearly } from './constants';

const MONTHLY_DOMAIN: [number, number] = [0, 50];
const YEARLY_DOMAIN: [number, number] = [0, 500];

const MONTHLY_TICKS = [0, 10, 20, 30, 40, 50];
const YEARLY_TICKS = [0, 100, 200, 300, 400, 500];

function ProjectChart() {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');
  const data = view === 'monthly' ? dataMonthly : dataYearly;
  return (
    <div className="w-full h-95 bg-[var(--background)] rounded-xl p-5 shadow-md box-border">
      <div className="flex justify-between items-center mb-4 px-4">
        <span className="text-base font-medium m-1">Projects Statistics</span>

        <Select
          value={view}
          onValueChange={(value: 'monthly' | 'yearly') => setView(value)}
        >
          <SelectTrigger className="w-32 h-9 bg-muted text-sm p-4 text-[var(--muted-foreground)] rounded-2xl cursor-pointer font-poppins">
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
