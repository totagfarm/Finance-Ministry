import React from 'react';
import LiberiaInteractiveMap from './LiberiaInteractiveMap';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const COLORS = ['#D4AF37', '#1E4D2B', '#4ade80', '#facc15', '#60a5fa'];

const areaData = [
  { month: 'Jan', revenue: 4000, execution: 2400 },
  { month: 'Feb', revenue: 3000, execution: 1398 },
  { month: 'Mar', revenue: 2000, execution: 9800 },
  { month: 'Apr', revenue: 2780, execution: 3908 },
  { month: 'May', revenue: 1890, execution: 4800 },
];

const pieData = [
  { name: 'Infrastructure', value: 400 },
  { name: 'Health', value: 300 },
  { name: 'Education', value: 300 },
  { name: 'Security', value: 200 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const barData = [
  { name: 'Q1', target: 4000, actual: 2400 },
  { name: 'Q2', target: 3000, actual: 1398 },
  { name: 'Q3', target: 2000, actual: 9800 },
];

export default function HeroMagazineSpread() {
  const boxBaseClasses = "w-full h-full flex flex-col items-center justify-center bg-white/[0.02] border-2 border-dashed border-brand-gold/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_60px_rgba(212,175,55,0.1)] backdrop-blur-sm overflow-visible";
  const labelClasses = "text-[0.6rem] font-medium text-brand-gold uppercase tracking-widest absolute top-2 left-3 z-10";

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto hidden lg:block perspective-[1000px]">
      {/* Box 5 (Top Left - Contains Map) */}
      <CardContainer 
        containerClassName="absolute group/card"
        className={boxBaseClasses}
        style={{
          width: '160px',
          height: '200px',
          top: '5%',
          left: '5%',
          transform: 'rotate(-3deg)',
          zIndex: 1
        }}
      >
        <CardBody className="w-full h-full flex items-center justify-center">
          <CardItem translateZ="60" className="w-full h-full">
            <LiberiaInteractiveMap />
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* Box 3 (Center Left - Area Chart) */}
      <CardContainer 
        containerClassName="absolute group/card"
        className={boxBaseClasses}
        style={{
          width: '240px',
          height: '300px',
          top: '35%',
          left: '10%',
          transform: 'rotate(-4deg)',
          zIndex: 2
        }}
      >
        <CardBody className="w-full h-full p-2 relative">
          <span className={labelClasses}>Revenue Flux</span>
          <CardItem translateZ="40" className="w-full h-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* Box 1 (Top Right - Pie Chart) */}
      <CardContainer 
        containerClassName="absolute group/card"
        className={boxBaseClasses}
        style={{
          width: '280px',
          height: '350px',
          top: '10%',
          right: '5%',
          transform: 'rotate(3deg)',
          zIndex: 3
        }}
      >
        <CardBody className="w-full h-full p-2 relative flex items-center justify-center">
          <span className={labelClasses}>Allocation</span>
          <CardItem translateZ="80" className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* Box 2 (Middle Right - Scatter Plot) */}
      <CardContainer 
        containerClassName="absolute group/card"
        className={boxBaseClasses}
        style={{
          width: '200px',
          height: '250px',
          top: '40%',
          right: '15%',
          transform: 'rotate(-2deg)',
          zIndex: 4
        }}
      >
        <CardBody className="w-full h-full p-2 relative flex flex-col justify-end">
          <span className={labelClasses}>Correlates</span>
          <CardItem translateZ="50" className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis type="number" dataKey="x" hide />
                <YAxis type="number" dataKey="y" hide />
                <ZAxis type="number" dataKey="z" range={[20, 200]} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                <Scatter name="Execution" data={scatterData} fill="#4ade80" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* Box 4 (Bottom Center - Bar Chart) */}
      <CardContainer 
        containerClassName="absolute group/card"
        className={boxBaseClasses}
        style={{
          width: '180px',
          height: '225px',
          bottom: '5%',
          left: '40%',
          transform: 'rotate(5deg)',
          zIndex: 5
        }}
      >
        <CardBody className="w-full h-full p-2 relative flex flex-col justify-end">
          <span className={labelClasses}>Targets</span>
          <CardItem translateZ="60" className="w-full h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="target" fill="#1E4D2B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
              </BarChart>
            </ResponsiveContainer>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
