import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Bird } from "../../../common/tables/Bird";

const DATABASE_NAME = 'ornithologue_bd';

@injectable()
export class DatabaseService {
  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "postgres",
    password: "qwerty",
    port: 5555,
    host: "0.0.0.0",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM ${DATABASE_NAME}.${tableName};`);
    client.release();
    return res;
  }

  // ======= BIRD =======
  public async createBird(bird: Bird): Promise<pg.QueryResult> {
    if (!bird.nomCommun || !bird.nomScientifique || !bird.statusEspece) {
      throw new Error('Invalid create bird');
    }
    const client = await this.pool.connect();
    const values = [bird.nomScientifique, bird.nomCommun, bird.statusEspece, bird.predateur]
    const queryText = `INSERT INTO ${DATABASE_NAME}.especeoiseau VALUES($1, $2, $3, $4)`

    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async updateBird(bird: Bird, oldBirdID: string): Promise<pg.QueryResult> {
      if (!oldBirdID) {
        throw new Error('ID invalid')
      }
      const client = await this.pool.connect();

      const queryText = `SELECT * FROM ${DATABASE_NAME}.especeoiseau WHERE nomscientifique = '${oldBirdID}';`;
      const res = await client.query(queryText);
      if (res.rows.length === 0) {
        throw new Error(`NAME ${oldBirdID} does not exist in collection`)
      }

      const paramsToUpdate: string[] = [];

      if (bird.nomScientifique.length > 0) { paramsToUpdate.push(`nomscientifique = '${ bird.nomScientifique }'`); }
      if (bird.nomCommun.length > 0) { paramsToUpdate.push(`nomcommun = '${ bird.nomCommun }'`); }
      if (bird.statusEspece.length > 0) { paramsToUpdate.push(`statutspeces = '${ bird.statusEspece }'`); }
      if (bird.predateur && bird.predateur.length > 0) { paramsToUpdate.push(`nomscientifiquecomsommer = '${ bird.predateur }'`); }

      const updateQueryText = `UPDATE ${DATABASE_NAME}.especeoiseau SET ${paramsToUpdate.join(", ")} WHERE nomscientifique = '${oldBirdID}'`;
      const updateRes = await client.query(updateQueryText);

      client.release();
      return updateRes;
  }

  public async deleteBird(birdID: string): Promise<pg.QueryResult> {
    if (birdID.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();

    /* dereference foreign key in db before deleting */
    const updateQuery = `UPDATE ${DATABASE_NAME}.especeoiseau 
    SET nomscientifiquecomsommer = NULL 
    WHERE nomscientifiquecomsommer = '${birdID}';`;
    await client.query(updateQuery);
    
    /* delete the entry */
    const deleteQuery = `DELETE FROM ${DATABASE_NAME}.especeoiseau WHERE nomscientifique = '${birdID}';`;
    const res = await client.query(deleteQuery);
    
    client.release();
    return res;
  }
}
