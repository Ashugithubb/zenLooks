import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Booking } from "../entities/booking.entity";


@Injectable()
export class BookingRepository extends Repository<Booking> {
    constructor(private datasource: DataSource,
    ) {
        super(Booking, datasource.createEntityManager());
    }

}