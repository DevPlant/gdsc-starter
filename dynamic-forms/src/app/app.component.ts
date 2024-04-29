import { Component } from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form = new FormGroup({});
  model: any  = {};
  fields: FormlyFieldConfig[] =
    [ {
      "key" : "client.name",
      "type" : "input",
      "props" : {
        "label" : "Client name"
      }
    }, {
      "key" : "client.cnp",
      "type" : "input",
      "props" : {
        "label" : "Client cnp"
      }
    }, {
      "key" : "target",
      "type" : "input",
      "props" : {
        "label" : "Target"
      }
    } ];

  onSubmit(model: any) {
    console.log(model);
  }
}
