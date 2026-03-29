import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NgoService {
  private ngos = [
    { id: 'NGO-001', name: 'Global Health Partners', sector: 'Healthcare', status: 'Active', complianceScore: 94, totalFunding: 15500000 },
    { id: 'NGO-002', name: 'Education for All Foundation', sector: 'Education', status: 'Expired', complianceScore: 62, totalFunding: 2100000 },
    { id: 'NGO-003', name: 'AgriTech Liberia', sector: 'Agriculture', status: 'Pending Renewal', complianceScore: 85, totalFunding: 850000 },
  ];

  findAll() {
    return this.ngos;
  }

  updateStatus(id: string, status: string) {
    const ngo = this.ngos.find(n => n.id === id);
    if (!ngo) throw new NotFoundException('NGO not found');
    ngo.status = status;
    return ngo;
  }
}
