import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  template:
    `
    <h1>Kurssiarkisto</h1>
    <p>{{message}}</p>
    `,
  providers: [AppService],
})
export class AppComponent {
  constructor(private appService: AppService) { }

  getMessage(): void {
    this.appService.getMessage().then(message => this.message = message);
  }

  ngOnInit(): void {
    this.getMessage();
  }

  message = '';
}
