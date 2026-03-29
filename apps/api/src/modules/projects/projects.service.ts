import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Project = {
  id: string;
  code: string;
  title: string;
  sector: string;
  status: string;
};

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [];

  findAll() {
    return this.projects;
  }

  findOne(id: string) {
    const item = this.projects.find((p) => p.id === id);
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  create(dto: { code: string; title: string; sector: string }) {
    const item: Project = {
      id: randomUUID(),
      code: dto.code,
      title: dto.title,
      sector: dto.sector,
      status: 'draft',
    };
    this.projects.push(item);
    return item;
  }
}
