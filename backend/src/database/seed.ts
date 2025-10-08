import 'reflect-metadata';
import AppDataSource from 'src/data.source';
import AdminSeeder from './seeds/admin.seed';


async function seed() {
  await AppDataSource.initialize();
   await new AdminSeeder().run(AppDataSource);
   console.log("admin seeding complete");
}
seed();