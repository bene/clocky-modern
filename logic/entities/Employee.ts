import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Session } from "./Session";

export enum EmployeeStatus {
    Working = "Working",
    OnPause = "OnPause",
    CheckedOut = "CheckedOut",
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    hoursPerWeek: number;

    status: EmployeeStatus;

    @OneToMany(() => Session, (session) => session.employee)
    sessions: Session[];
}
