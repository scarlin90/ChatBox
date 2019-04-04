import { Component, OnInit, Input } from '@angular/core';
import { SidePanelModel } from './side-panel.model';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  @Input() model: SidePanelModel;

  constructor() { }

  ngOnInit() {
  }

}
