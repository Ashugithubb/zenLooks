import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Service } from './services/entities/service.entity';
import { Booking } from './booking/entities/booking.entity';
import { UnavailableSlot } from './unavailable-slots/entities/unavailable-slot.entity';
import { ServiceDelivered } from './service-delivered/entities/service-delivered.entity';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || undefined,
    host: process.env.DB_HOST || undefined,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Service, Booking, UnavailableSlot, ServiceDelivered],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: true,
    ssl: isProduction
        ? { rejectUnauthorized: false }
        : false,
    logging: !isProduction,
});
export default AppDataSource;