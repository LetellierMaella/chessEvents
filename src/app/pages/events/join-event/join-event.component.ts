import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { AuthService } from '../../../core/services/auth.service';
import { ChessEvent } from '../../../models/chess-event.model';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.scss'],
})
export class JoinEventComponent implements OnInit {
  eventId!: number;
  event!: ChessEvent;
  userRole: string | null = null;
  alreadyRegistered = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.authService.getUser();
    this.userRole = user?.role || null;

    if (this.userRole !== 'user') {
      alert("Seuls les joueurs peuvent s'inscrire à un tournoi.");
      this.router.navigateByUrl('');
      return;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = Number(idParam);
      try {
        const event = await firstValueFrom(
          this.eventsService.getById(this.eventId)
        );
        this.event = event as ChessEvent;
        this.alreadyRegistered = !!this.event.participants?.some(
          (p: any) => p.id === user?.id
        );
      } catch (err) {
        this.errorMessage = 'Erreur lors du chargement du tournoi.';
      }
    }
  }

  async register() {
    try {
      await firstValueFrom(this.eventsService.registerToEvent(this.eventId));
      alert('Inscription réussie !');
      this.router.navigateByUrl('/events');
    } catch (err: any) {
      alert("Erreur lors de l'inscription au tournoi.");
    }
  }
}
