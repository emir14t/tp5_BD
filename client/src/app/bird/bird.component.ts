import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bird } from '../../../../common/tables/Bird';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {
  @Input() bird: Bird;
  @Input() listOfPredators: Bird[];
  @Input() createMode: boolean;
  @Output() updater = new EventEmitter();
  @Output() deleter = new EventEmitter();
  @Output() creater = new EventEmitter();
  predators: string[] = [];

  name: string;
  sName: string;
  status: string;
  preyOf: string;

  constructor() { }

  ngOnInit(): void {
    this.name = this.bird.nomCommun;
    this.sName = this.bird.nomScientifique;
    this.status = this.bird.statusEspece;
    this.preyOf = this.bird.predateur ?? '';
    if (this.sName === '') {
      console.log('predators', this.listOfPredators);
    }
    const predators = this.listOfPredators.filter((bird) => {
      return bird.nomScientifique !== this.sName;
    });
    this.predators = predators.map((bird) => {
      return bird.nomScientifique;
    });
  }

  delete() {
    this.deleter.emit(this.bird.nomScientifique);
  }

  update() {
    const newBird: Bird = {
      nomScientifique: this.sName,
      nomCommun: this.name,
      statusEspece: this.status,
      predateur: this.preyOf,
    }
    const data = {
      'oldBirdID': this.bird.nomScientifique,
      'newBird': newBird
    }
    this.updater.emit(JSON.stringify(data));
  }

  create() {
    const newBird: Bird = {
      nomScientifique: this.sName,
      nomCommun: this.name,
      statusEspece: this.status,
      predateur: this.preyOf,
    }
    this.sName = '';
    this.name = '';
    this.status = '';
    this.preyOf = '';
    this.creater.emit(JSON.stringify(newBird));
  }
}
