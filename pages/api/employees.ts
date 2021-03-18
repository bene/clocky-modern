import { NextApiRequest, NextApiResponse } from "next";
import { prepareConnection } from "../../logic/database";
import { getRepository, IsNull } from "typeorm";
import { Employee, EmployeeStatus } from "../../logic/entities/Employee";
import { Session } from "../../logic/entities/Session";
import { Break } from "../../logic/entities/Break";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await prepareConnection();

    const employeeRepository = getRepository(Employee);
    const sessionRepository = getRepository(Session);
    const breakRepository = getRepository(Break);

    let employees = await employeeRepository.find();

    employees = await Promise.all(
        employees.map(async (employee) => {
            const currentSession = await sessionRepository.findOne({
                where: {
                    employee: employee.id,
                    endAt: IsNull(),
                },
            });

            const currentBreak = !!currentSession
                ? await breakRepository.findOne({
                      where: {
                          session: currentSession.id,
                          endAt: IsNull(),
                      },
                  })
                : undefined;

            if (!!currentSession && !!currentBreak) {
                employee.status = EmployeeStatus.OnPause;
            } else if (!!currentSession) {
                employee.status = EmployeeStatus.Working;
            } else {
                employee.status = EmployeeStatus.CheckedOut;
            }

            return employee;
        })
    );

    res.status(200).json(employees);
};
