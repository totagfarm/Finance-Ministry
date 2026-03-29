export interface SectorRevenue {
  sector: string;
  actual: number;
  target: number;
  gap: number;
}

export const SECTOR_PERFORMANCE: SectorRevenue[] = [
  { sector: 'Mining & Extractive', actual: 85000000, target: 92000000, gap: 7000000 },
  { sector: 'Telecommunications', actual: 42000000, target: 40000000, gap: -2000000 },
  { sector: 'Banking & Finance', actual: 38500000, target: 36000000, gap: -2500000 },
  { sector: 'Agriculture (Rubber/Palm)', actual: 12400000, target: 18000000, gap: 5600000 },
  { sector: 'Manufacturing', actual: 21600000, target: 24000000, gap: 2400000 },
];

export const COUNTY_REVENUE_DATA: Record<string, number> = {
  "Montserrado": 185.4,
  "Nimba": 42.1,
  "Grand Bassa": 28.5,
  "Margibi": 15.2,
  "Bong": 12.8,
  "Lofa": 8.4,
  "Grand Gedeh": 6.2,
  "Sinoe": 5.4,
  "Maryland": 4.8,
  "Grand Cape Mount": 18.2, // Mining heavy
  "Bomi": 3.1,
  "River Cess": 1.4,
  "Gbarpolu": 2.8,
  "River Gee": 1.1,
  "Grand Kru": 1.0
};

export const calculateFilingCompliance = (filers: number, registered: number) => {
  return Math.round((filers / registered) * 100);
};

export const calculateAuditYield = (auditRevenue: number, totalRevenue: number) => {
  return ((auditRevenue / totalRevenue) * 100).toFixed(1);
};
