import { NextApiRequest, NextApiResponse } from "next";
import { prepareConnection } from "../../logic/database";
import { getRepository } from "typeorm";
import { Employee } from "../../logic/entities/Employee";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await prepareConnection();

        const employeeRepository = getRepository(Employee);
        const { firstName, lastName, hoursPerWeek } = req.body;
        const newEmployee = {
            firstName,
            lastName,
            hoursPerWeek,
        };

        const result = await employeeRepository.save(newEmployee);

        return res.status(201).json({ id: result.id });
    }

    res.status(405).end();
};
