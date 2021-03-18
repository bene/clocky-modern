import { getRepository } from "typeorm";
import { Server } from "socket.io";
import { NextApiResponse } from "next";

import { Notification } from "./entities/Notification";
import { prepareConnection } from "./database";

let server: Server;

function register(res: NextApiResponse) {
    if (!server) {
        server = new Server((res.socket as any).server);
    }

    if (!(res.socket as any).server.io) {
        (res.socket as any).server.io = server;
    }

    res.end();
}

async function pushNotification(notification: Notification) {
    await prepareConnection();
    const notificationRepository = getRepository(Notification);
    await notificationRepository.save(notification);

    if (!notification.timeDate) {
        notification.timeDate = new Date();
    }

    if (!!server) {
        server.emit("notification", notification);
    }
}

export { pushNotification, register };
