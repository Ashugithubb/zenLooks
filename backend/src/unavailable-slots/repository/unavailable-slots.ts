
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UnavailableSlot } from "../entities/unavailable-slot.entity";


@Injectable()
export class UnavailableSlotRepository extends Repository<UnavailableSlot> {
    constructor(private datasource: DataSource,
    ) {
        super(UnavailableSlot, datasource.createEntityManager());
    }

}