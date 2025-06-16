import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChessEvent } from '../../../models/chess-event.model';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  public events: ChessEvent[] = [];

  constructor(
    private readonly eventsService: EventsService,
    private readonly router: Router
  ) {
    console.log(eventsService);
  }

  async ngOnInit(): Promise<void> {
    this.events = [
      {
        id: 1,
        name: 'Open de Bruxelles',
        location: 'Bruxelles',
        date: '2025-07-12',
      },
      {
        id: 2,
        name: 'Tournoi Namur Juniors',
        location: 'Namur',
        date: '2025-08-05',
      },
      {
        id: 3,
        name: 'Championnat Wallonie',
        location: 'Liège',
        date: '2025-09-15',
      },
    ];

    try {
      const data = await firstValueFrom(this.eventsService.getAll());
      this.events = data as ChessEvent[];

      console.log(data);
    } catch (error) {
      console.log('erreur lors de la connexion aux events');
    }
  }

  goToDetails(eventId: number) {
    // Redirige vers la page détails du tournoi
    this.router.navigate(['/events', eventId]);
  }
}
