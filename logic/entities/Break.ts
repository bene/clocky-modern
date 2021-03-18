import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Session } from "./Session";

@Entity()
export class Break {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamptz", default: () => "NOW()" })
    startAt: Date;

    @Column({ type: "timestamptz", nullable: true })
    endAt: Date;

    @ManyToOne(() => Session, (session) => session.breaks, { nullable: false })
    session: Session;
}
