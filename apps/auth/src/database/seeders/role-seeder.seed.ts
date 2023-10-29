import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { roles } from '../../role/entities/data/role.data';
import { Role } from '../../role/entities/role.entities';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource.manager.getRepository(Role);
    const rolePromises = [];
    for (const role of roles) {
      rolePromises.push(roleRepository.save(role));
    }
    await Promise.allSettled(rolePromises);
  }
}
