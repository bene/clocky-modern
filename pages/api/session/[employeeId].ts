import { NextApiRequest, NextApiResponse } from "next";
import { prepareConnection } from "../../../logic/database";
import { getRepository, IsNull } from "typeorm";
import { Session } from "../../../logic/entities/Session";
import { Notification } from "../../../logic/entities/Notification";
import { pushNotification } from "../../../logic/stream";
import { Employee } from "../../../logic/entities/Employee";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await prepareConnection();

    const { employeeId } = req.query;
    const sessionRepository = getRepository(Session);
    const employeeRepository = getRepository(Employee);
    const employee = await employeeRepository.findOne({
        where: {
            id: employeeId,
        },
    });
    const currentSession = await sessionRepository.findOne({
        where: {
            employee: employeeId,
            endAt: IsNull(),
        },
        relations: ["breaks"],
    });

    if (req.method === "GET") {
        if (!currentSession) {
            res.status(400).json({ error: "session not running" });
            return;
        }

        return res.json(currentSession);
    }

    // Start a session
    if (req.method === "POST") {
        if (!!currentSession) {
            res.status(400).json({ error: "session is running" });
            return;
        }

        await sessionRepository.save({
            employee: {
                id: parseInt(`${employeeId}`),
            },
        });

        // Send a notification
        const notification = new Notification();
        notification.title = "Arbeit begonnen";
        notification.body = `${employee.firstName} ${employee.lastName} hat zum Arbeiten begonnen.`;
        await pushNotification(notification);

        return res.status(201).end();
    }

    // End a session
    if (req.method === "PATCH") {
        if (!currentSession) {
            res.status(400).json({ error: "session not running" });
            return;
        }

        currentSession.endAt = new Date();
        await sessionRepository.save(currentSession);

        // Send a notification
        const notification = new Notification();
        notification.title = "Arbeit beendet";
        notification.body = `${employee.firstName} ${employee.lastName} hat die Arbeite beendet.`;
        await pushNotification(notification);

        return res.status(200).end();
    }

    res.status(405).end();
};
