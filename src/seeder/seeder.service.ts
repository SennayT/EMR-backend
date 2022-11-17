import { Injectable } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { Roles as rolesData } from './data/roles';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';
import { HealthCenterService } from '../health-center/health-center.service';

@Injectable()
export class SeederService {
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private healthCenterService: HealthCenterService,
  ) {}
  async seed() {
    await this.createRoles();
    await this.createSystemAdmin();
  }

  async createRoles() {
    for (const role of Object.values(rolesData)) {
      await this.roleService.addRole(role);
    }
    console.log('Successfully seeded roles');
  }

  async createSystemAdmin() {
    const healthCenter = await this.healthCenterService.create({
      name: 'Bethel Hospital',
      phone: '123',
      email: 'bethel@hospital.gov',
      type: 'Referral',
      address: {
        city: 'Addis Ababa',
        subCity: 'Kolfe Keranyo',
        kebelle: '01',
        street: 'Bethel 123',
        houseNo: '123',
        woreda: '123',
        zone: '0',
      },
    });

    const user: UserDto = {
      name: 'Super Admin',
      phone: '12345678',
      age: 50,
      email: 'wsennay@gmail.com',
      gender: 'male',
      isAdmin: true,
      address: {
        city: 'Addis Ababa',
        subCity: 'Kolfe Keranyo',
        kebelle: '01',
        street: 'Bethel 123',
        houseNo: '123',
        woreda: '123',
        zone: '0',
      },
      healthCenterId: healthCenter.id,
      isResearcher: false,
      image: '',
    };
    await this.userService.addUser(user, rolesData.System_Admin);
    console.log('Successfully seeded system admin user');
  }
}
