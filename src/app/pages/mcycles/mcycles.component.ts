import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mcycles',
  templateUrl: './mcycles.component.html',
  styleUrls: ['./mcycles.component.scss']
})
export class McyclesComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

}
