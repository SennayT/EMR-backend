import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthCenter } from './healthcenter.entity';
import { Connection, Repository } from 'typeorm';
import { HealthCenterDto } from './dto';
import { AddressService } from '../address/address.service';
import { Address } from '../address/address.entity';

@Injectable()
export class HealthCenterService {
  constructor(
    @InjectRepository(HealthCenter)
    private healthCenterRepository: Repository<HealthCenter>,
    private addressService: AddressService,
    private connection: Connection,
  ) {}

  getAllHealthCenters() {
    return this.healthCenterRepository.find({
      relations: ['address'],
    });
  }

  async getOneHealthCenter(hcId: number): Promise<HealthCenter> {
    const healthCenter = await this.healthCenterRepository.findOne(hcId, {
      relations: ['address'],
    });
    if (healthCenter) return healthCenter;

    throw new HttpException(
      'Health Center with this id NOT Found !!!!',
      HttpStatus.NOT_FOUND,
    );
  }

  async disActiveHealthCenter(hcId: number): Promise<HealthCenter> {
    console.log('this is the first');
    let healthCenter = await this.getOneHealthCenter(hcId);

    healthCenter.isActive = false;

    return this.healthCenterRepository.save(healthCenter);
  }

  // async create({ address, ...health }: HealthCenterDto) {
  //   const createdAddress = await this.addressService.saveAddress(address);
  //   const hc = this.healthCenterRepository.create({
  //     ...health,
  //     address: createdAddress,
  //   });
  //   return this.healthCenterRepository.save(hc);
  // }

  async updateHealthCenter(
    hcId: number,
    updateHCData: HealthCenterDto,
  ): Promise<HealthCenter> {
    const healthCenter = await this.getOneHealthCenter(hcId);

    Object.assign(healthCenter, updateHCData);
    return this.healthCenterRepository.save(healthCenter);
  }

  async isEmailTaken(email: string) {
    const hc = await this.healthCenterRepository.findOne({
      where: {
        email,
      },
    });

    return hc !== undefined;
  }

  async createWithTransaction({ address, ...health }: HealthCenterDto) {
    if (await this.isEmailTaken(health.email)) {
      throw new BadRequestException('Email is in use');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    const addressRepo = manager.getRepository(Address);
    const hcRepo = manager.getRepository(HealthCenter);
    try {
      const createdAddress = await addressRepo.save({ ...address });
      const healthCenter = await hcRepo.save({
        ...health,
        address: createdAddress,
      });
      await queryRunner.commitTransaction();
      return healthCenter;
    } catch (err) {
      console.log('Error type is: ', typeof err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
