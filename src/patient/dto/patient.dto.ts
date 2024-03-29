import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from '../../user/dto';

export class PatientDto {
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @IsNotEmpty()
  @IsString()
  emergencyContactPhone: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  registeredBy: number;

  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsNotEmpty()
  user: UserDto;
}

class UpdatePatientDto {
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  emergencyContactPhone: string;

  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsNotEmpty()
  user: UserDto;
}
