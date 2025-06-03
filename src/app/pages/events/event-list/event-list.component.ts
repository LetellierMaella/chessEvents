import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  public events: object[] = [];
  constructor(private readonly eventsService: EventsService) {
    console.log(eventsService);
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(this.eventsService.getAll());
      console.log(data);
    } catch (error) {
      console.log('erreur lors de la connexion aux events');
    }
  }
}
