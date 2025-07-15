import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

type CustomTooltipProps = {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  coordinate?: { x: number; y: number };
};

const TOOLTIP_VERTICAL_OFFSET = 40;

export const CustomTooltip = ({ active, payload, coordinate }: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    const filtered = payload.filter((p) => p.dataKey === 'value');

    return (
      <div
        className="custom-tooltip bg-[var(--chart-6)] rounded-3xl shadow text-[var(--ring)] p-2 py-2 pointer-events-none"
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
