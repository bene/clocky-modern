import { NextApiRequest, NextApiResponse } from "next";
import { prepareConnection } from "../../../logic/database";
import { getRepository } from "typeorm";
import { Employee } from "../../../logic/entities/Employee";
import { calcDuration } from "../../../shared/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await prepareConnection();

    if (req.method === "GET") {
        const { employeeId } = req.query;
        const employeeRepository = getRepository(Employee);

        const employeeWithSessions = await employeeRepository.findOne({
            where: {
                id: employeeId,
            },
            relations: ["sessions", "sessions.breaks"],
        });

        if (!employeeWithSessions) {
            res.status(400).json({ error: "User does not exist" });
            return;
        }

        const sessions = employeeWithSessions.sessions
            .map((session) => {
                const totalDuration = calcDuration(session.startAt, session.endAt);
                const breakDuration = session.breaks.reduce(
                    (total, b) => total + (calcDuration(b.startAt, b.endAt) || 0),
                    0
                );
                const workDuration = totalDuration - breakDuration;

                return {
                    ...session,
                    workDuration,
                    breakDuration,
                    totalDuration,
                };
            })
            .sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

        return res.json(sessions);
    }

    res.status(405).end();
};
