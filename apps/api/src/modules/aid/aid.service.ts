import { Injectable } from '@nestjs/common';

@Injectable()
export class AidService {
  private activities = [
    { name: 'Water for Liberia Phase 2', donor: 'USAID', sector: 'WASH', budget: 12.5 },
    { name: 'Rural Electrification Expansion', donor: 'European Union', sector: 'Energy', budget: 22.0 },
    { name: 'National Health Support', donor: 'World Bank', sector: 'Health', budget: 45.0 },
  ];

  findActivities(donor?: string) {
    if (donor) return this.activities.filter(a => a.donor === donor);
    return this.activities;
  }

  getDonorYield() {
    return [
      { name: 'World Bank', committed: 120, disbursed: 85 },
      { name: 'USAID', committed: 95, disbursed: 90 },
      { name: 'EU', committed: 150, disbursed: 65 },
    ];
  }
}
