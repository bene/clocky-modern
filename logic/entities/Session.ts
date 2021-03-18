import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Employee } from "./Employee";
import { Break } from "./Break";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamptz", default: () => "NOW()" })
    startAt: Date;

    @Column({ type: "timestamptz", nullable: true })
    endAt: Date;

    @OneToMany(() => Break, (breakObj) => breakObj.session)
    breaks: Break[];

    @ManyToOne(() => Employee, (employee) => employee.sessions, {
        nullable: false,
    })
    employee: Employee;
}
