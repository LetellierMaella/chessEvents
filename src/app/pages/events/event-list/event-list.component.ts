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
        description: 'Tournoi rapide 10+5 ouvert à tous les niveaux.',
      },
      {
        id: 2,
        name: 'Tournoi Namur Juniors',
        location: 'Namur',
        date: '2025-08-05',
        description: 'Réservé aux moins de 18 ans. 5 rondes en cadence lente.',
      },
      {
        id: 3,
        name: 'Championnat Wallonie',
        location: 'Liège',
        date: '2025-09-15',
        description: 'Tournoi homologué FIDE sur deux jours.',
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
