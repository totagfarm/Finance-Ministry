export interface MacroSeries {
  year: string;
  gdp_growth: number;
  inflation: number;
  revenue_projection: number;
  fiscal_deficit: number;
}

export const MACRO_HISTORY: MacroSeries[] = [
  { year: '2022', gdp_growth: 4.8, inflation: 7.6, revenue_projection: 640000000, fiscal_deficit: -120000000 },
  { year: '2023', gdp_growth: 4.5, inflation: 12.4, revenue_projection: 680000000, fiscal_deficit: -90000000 },
  { year: '2024', gdp_growth: 5.1, inflation: 10.2, revenue_projection: 720000000, fiscal_deficit: -45000000 },
  { year: '2025', gdp_growth: 5.3, inflation: 8.5, revenue_projection: 760000000, fiscal_deficit: -25000000 },
];

export const calculateFiscalImpact = (
  baseGrowth: number,
  shockIntensity: number, 
  shockType: 'commodity' | 'inflation' | 'none'
) => {
  let adjustedGrowth = baseGrowth;
  let revenueMultiplier = 1.0;

  if (shockType === 'commodity') {
    adjustedGrowth -= (shockIntensity * 0.5); // Iron Ore shock
    revenueMultiplier = 1.0 - (shockIntensity * 0.05);
  } else if (shockType === 'inflation') {
    revenueMultiplier = 1.0 + (shockIntensity * 0.02); // Inflation-driven nominal revenue increase
    adjustedGrowth -= (shockIntensity * 0.2);
  }

  const projectedRevenue = 840000000 * revenueMultiplier;
  const projectedExpenditure = 920000000 + (shockType === 'inflation' ? shockIntensity * 10000000 : 0);
  const projectedDeficit = projectedRevenue - projectedExpenditure;

  return {
    adjustedGrowth,
    projectedRevenue,
    projectedDeficit,
    debtSustainability: projectedDeficit < -100000000 ? 'Caution' : 'Sustainable'
  };
};
