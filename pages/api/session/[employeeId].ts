import { NextApiRequest, NextApiResponse } from "next";
import { prepareConnection } from "../../../logic/database";
import { getRepository, IsNull } from "typeorm";
import { Session } from "../../../logic/entities/Session";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await prepareConnection();

    const { employeeId } = req.query;
    const sessionRepository = getRepository(Session);
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

        return res.status(200).end();
    }

    res.status(405).end();
};
