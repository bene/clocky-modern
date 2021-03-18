import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

export enum NotificationType {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ type: "timestamptz", default: () => "NOW()" })
    timeDate: Date;

    @Column({
        type: "enum",
        enum: NotificationType,
        default: NotificationType.Info,
    })
    type: NotificationType;
}
