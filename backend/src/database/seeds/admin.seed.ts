import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../user/enum/user.role';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';


export default class AdminSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const adminRepo = dataSource.getRepository(User);
        const password = await bcrypt.hash('admin123', 10);

        const admin: User[] = [];
        admin.push(
            adminRepo.create({
                email: 'admin123@gmail.com',
                name:"Admin",
                password:`${password}`,
                role: Role.ADMIN
               
            }),
        );
        await adminRepo.save(admin);
    }
}