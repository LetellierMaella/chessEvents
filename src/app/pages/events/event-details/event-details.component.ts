import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessEvent } from '../../../models/chess-event.model';
import { AuthService } from '../../../core/services/auth.service';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId!: number;
  event?: ChessEvent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventsService: EventsService
  ) {}

  async ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    // simulation test
    const allEvents: ChessEvent[] = [
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
      // les 3 objets comme ci-dessus
    ];

    this.event = allEvents.find((e) => e.id === this.eventId);
  }

  handleJoin() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
    } else {
      this.router.navigate(['/events', this.eventId, 'join']);
    }
  }
}
