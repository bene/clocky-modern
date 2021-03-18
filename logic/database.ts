import { Break } from "./entities/Break";
import { Session } from "./entities/Session";
import { Employee } from "./entities/Employee";
import { createConnection, getConnection } from "typeorm";

let connectionReadyPromise: Promise<void> | null = null;

function prepareConnection() {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            // clean up old connection that references outdated hot-reload classes
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                // no stale connection to clean up
            }

            // wait for new default connection
            await createConnection({
                type: "postgres",
                url: process.env.DATABASE_URL,
                entities: [Break, Session, Employee],
                synchronize: true,
            });
        })();
    }

    return connectionReadyPromise;
}

export { prepareConnection };
