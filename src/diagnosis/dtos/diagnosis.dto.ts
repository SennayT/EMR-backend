import { UserDto } from './../../user/dto/UserDto';
import { PatientDto } from './../../patient/dto/PatientDto';
import { DiseaseDto } from './../../disease/dtos/disease.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';

export class DiagnosisDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  measuredIn: string;

  @ValidateNested({ each: true })
  @Type(() => DiseaseDto)
  disease: DiseaseDto;

  @IsNotEmpty()
  @IsNumber()
  filledById: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;
}