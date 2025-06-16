import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessEvent } from '../../../models/chess-event.model';
import { AuthService } from '../../../core/services/auth.service';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  eventId!: number;
  event?: ChessEvent;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventsService: EventsService
  ) {}

  async ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const data = await firstValueFrom(
        this.eventsService.getById(this.eventId)
      );
      this.event = data as ChessEvent;
    } catch (err) {
      this.error = 'Tournoi introuvable ou erreur serveur.';
      console.error(err);
    }
  }

  handleJoin() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
    } else {
      this.router.navigate(['/events', this.eventId, 'join']);
    }
  }
}
