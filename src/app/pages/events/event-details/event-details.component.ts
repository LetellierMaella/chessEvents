import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessEvent } from '../../../models/chess-event.model';
import { AuthService } from '../../../core/services/auth.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-event-details',
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
    this.event = {
      id: this.eventId,
      name: 'Open de Liège',
      location: 'Liège',
      date: '2025-08-12',
      description: 'Tournoi FIDE ouvert à tous, 6 rondes. 20€ d’inscription.',
    };
  }

  handleJoin() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
    } else {
      this.router.navigate(['/events', this.eventId, 'join']);
    }
  }
}
