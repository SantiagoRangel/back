import { Connection, createConnection, EntityManager, getConnectionManager } from 'typeorm';
import config from '../../ormconfig';

/**
 * En este archivo se define la conexión a la base de datos
 * @returns conexión de la base de datos
 */
export const getConnection = async (): Promise<EntityManager> => {
    const connectionManager = getConnectionManager();
    let connection: Connection;
    if (connectionManager.has(config.name)) {
        connection = connectionManager.get(config.name);
    } else {
        connection = await createConnection(config);
    }
    if (!connection.isConnected) await connection.connect();

    return connection.manager;
};
