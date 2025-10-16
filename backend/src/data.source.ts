import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Service } from './services/entities/service.entity';
import { Booking } from './booking/entities/booking.entity';
import { UnavailableSlot } from './unavailable-slots/entities/unavailable-slot.entity';
import { ServiceDelivered } from './service-delivered/entities/service-delivered.entity';


dotenv.config();
const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
   entities:[User,Service,Booking,UnavailableSlot,ServiceDelivered],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: true,
});
export default AppDataSource;