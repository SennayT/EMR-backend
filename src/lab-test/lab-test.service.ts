import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';
import { Repository } from 'typeorm';
import { LabTestDto } from './dto';

@Injectable()
export class LabTestService {
  constructor(
    @InjectRepository(LabTest)
    private labTestRepository: Repository<LabTest>,
  ) {}

  getAllLabTests(): Promise<LabTest[]> {
    return this.labTestRepository.find();
  }

  async getLabTest(id: number) {
    const labTest = await this.labTestRepository.findOne(id);
    if (labTest) return labTest;
    throw new NotFoundException(`The Lab test with id ${id} not found`);
  }

  findAllByIds(ids: number[]) {
    return this.labTestRepository.find({
      where: ids.map((id) => ({ id: id })),
    });
  }

  async createLabTest({
    // investigationRequestId,
    ...data
  }: LabTestDto): Promise<LabTest> {
    // const investigationRequest =
    //   await this.invRequestService.getInvestigationRequest(
    //     investigationRequestId,
    //   );
    const labTest = this.labTestRepository.create({
      ...data,
    });
    return this.labTestRepository.save(labTest);
  }
}
