import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "./communication.service";
import { Bird } from "../../../common/tables/Bird";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  readonly title: string = "INF3710 TP4";
  birds: Bird[];
  newBird: Bird = {
    nomScientifique: "",
    nomCommun: "",
    statusEspece: ""
  };

  public constructor(private readonly communicationService: CommunicationService) {}

  public async ngOnInit(): Promise<void> {
    const birds = JSON.parse(await this.getBirds());
    this.birds = birds.map((bird: JSON) => {
      const birdJSON = JSON.parse(JSON.stringify(bird));
      const formatBird: Bird = {
        nomScientifique: birdJSON?.nomscientifique,
        nomCommun: birdJSON?.nomcommun,
        statusEspece: birdJSON?.statutspeces,
        predateur: birdJSON?.nomscientifiquecomsommer
      };
      return formatBird;
    });
  }

  async addBird(bird: string) {
    const newBird = JSON.parse(bird) as Bird;
    if (
      newBird.nomScientifique.length === 0 ||
      newBird.nomCommun.length === 0 ||
      newBird.statusEspece.length === 0
    ) {
      return;
    }
    console.log(newBird);
    const response = await this.postBirds(newBird);
    console.log(response);
    if (response > 0) {
      this.birds.push(newBird);
    }
  }

  deleteBird(birdID: string) {
    this.deleteBirds(birdID);
    this.birds = this.birds.filter((bird) => {
      return bird.nomScientifique !== birdID;
    });
  }

  updateBird(birdData: string) {
    const id: string = JSON.parse(birdData).oldBirdID;
    const bird: Bird = JSON.parse(birdData).newBird;
    this.updateBirds(bird, id);
  }

  private async postBirds(bird: Bird): Promise<number> {
    return new Promise<number>((resolve) => {
      this.communicationService.insertBird(bird).subscribe({
        next: (value) => resolve(value),
        error: (value) => resolve(value),
      });
    });
  }

  private async deleteBirds(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.communicationService.deleteBird(id).subscribe({
        next: () => resolve(),
        error: () => resolve(),
      });
    });
  }

  private async updateBirds(bird: Bird, oldID: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.communicationService.updateBird(bird, oldID).subscribe({
        next: () => resolve(),
        error: () => resolve(),
      });
    });
  }

  private getBirds(): Promise<string> {
    return new Promise<string>((resolve) => { this.communicationService.getBirds().subscribe({
      next: (res) => {
        resolve(JSON.stringify(res));
      },
      error: () => {
        resolve('');
      }
    })})
  }
}
