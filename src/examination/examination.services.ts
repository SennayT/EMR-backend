import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './entities/examination.entity';
import { VitalsService } from '../vitals/vitals.service';
@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private readonly examinationRepository: Repository<Examination>,
    @Inject(forwardRef(() => VitalsService))
    private readonly vitalService: VitalsService,
  ) {}

  async create({ vitalId, ...data }: ExaminationDto) {
    const vital = await this.vitalService.getVital(vitalId);
    if (await this.doesVitalAlreadyHaveExamination(vitalId)) {
      throw new BadRequestException(
        `There is already an examination for vital ${vitalId}`,
      );
    }
    const examination = this.examinationRepository.create({
      ...data,
      vital,
    });
    return this.examinationRepository.save(examination);
  }

  findAll() {
    return this.examinationRepository.find({
      relations: ['vital'],
    });
  }

  async findOne(id: number) {
    const examination = await this.examinationRepository.findOne({
      where: {
        id,
      },
      relations: ['vital'],
    });
    if (examination) return examination;

    throw new NotFoundException(`Examination with id ${id} not found`);
  }

  async getExaminationForVital(vitalId: number) {
    await this.vitalService.getVital(vitalId);
    const examination = await this.examinationRepository.findOne({
      where: {
        vital: {
          id: vitalId,
        },
      },
      relations: ['vital'],
    });

    if (examination) return examination;

    throw new NotFoundException(
      `Examination for vital: id:${vitalId} not found`,
    );
  }

  //Check if the vital already has an examination
  async doesVitalAlreadyHaveExamination(id: number) {
    const examination = await this.examinationRepository.findOne({
      where: {
        vital: {
          id,
        },
      },
    });

    if (examination) return true;
    return false;
  }
}
