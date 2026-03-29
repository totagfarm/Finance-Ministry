import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async getAidSummary() {
    // Aggregation from Fact Tables (Star Schema)
    const result = await this.prisma.factAidDisbursement.aggregate({
      _sum: {
        disbursementAmount: true,
      },
      _count: {
        id: true,
      }
    });

    return {
      totalDisbursed: result._sum.disbursementAmount || 0,
      activeProjects: result._count.id,
      absorptionRate: 0.78, // Placeholder for complex logic
    };
  }

  async getDonorYield() {
    // In a real scenario, this would group by donor_id from dim_funding_source
    // and sum the fact_aid_disbursement
    return [
      { name: 'World Bank', committed: 120, disbursed: 85 },
      { name: 'USAID', committed: 95, disbursed: 90 },
      { name: 'EU', committed: 150, disbursed: 65 },
      { name: 'AfDB', committed: 80, disbursed: 45 },
      { name: 'UN Agencies', committed: 60, disbursed: 58 },
    ];
  }

  async getNGOMetrics() {
    const total = await this.prisma.factNgoCompliance.count();
    const compliant = await this.prisma.factNgoCompliance.count({
      where: { complianceScore: { gte: 70 } }
    });

    return {
      registryTotal: total,
      compliantTotal: compliant,
      healthScore: total > 0 ? (compliant / total) * 100 : 0
    };
  }
}
