import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Bird } from "../../../common/tables/Bird";

import { DatabaseService } from "../services/database.service";
import Types from "../types";
import console = require("console");

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= BIRD ROUTES =======
    // ex http://localhost:3000/database/oiseau?nomScientifique=smth
    router.get("/oiseau", (req: Request, res: Response) => {
      this.databaseService
        .getAllFromTable('especeoiseau')
        .then((result: pg.QueryResult) => {
          res.status(200).send(result.rows);
        })
        .catch((e: Error) => {
          res.status(400).send();
        });
    });

    router.post("/oiseau", (req: Request, res: Response) => {
        const bird: Bird = {
          nomScientifique: req.body.nomScientifique,
          nomCommun: req.body.nomCommun,
          statusEspece: req.body.statusEspece,
          predateur: req.body.predateur,
        }

        this.databaseService.createBird(bird)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            res.json(-1);
          });
      }
    );

    router.patch('/oiseau/update/:nomScientifique', (req: Request, res: Response) => {
      const pKey = req.params.nomScientifique;
      const newBird: Bird = {
        nomScientifique: req.body.nomScientifique || '',
        nomCommun: req.body.nomCommun || '',
        statusEspece: req.body.statusEspece || '',
        predateur: req.body.predateur
      };
      this.databaseService.updateBird(newBird, pKey)
        .then((result: pg.QueryResult) => {
          res.status(200).send(':)');
        })
        .catch((e: Error) => {
          console.log(e);
          res.status(400).send();
        });
    });

    router.delete('/oiseau/:nomScientifique', (req: Request, res: Response) => {
      const pKey = req.params.nomScientifique;
      this.databaseService.deleteBird(pKey)
        .then((result: pg.QueryResult) => {
          res.status(202).send();
        })
        .catch((e: Error) => {
          console.log(e);
          res.status(400).send();
        });
    });

    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
