import { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../logic/stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    register(res);
};

export const config = {
    api: {
        bodyParser: false,
    },
};
