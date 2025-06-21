import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { AuthService } from '../../../core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChessEvent } from '../../../models/chess-event.model';

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
  alreadyJoined = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.authService.getUser();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.eventId = Number(idParam);

    try {
      this.event = await firstValueFrom(
        this.eventsService.getById(this.eventId)
      );
    } catch (err) {
      alert('Erreur lors du chargement du tournoi.');
    }
  }

  async register() {
    this.loading = true;

    try {
      const result: any = await firstValueFrom(
        this.eventsService.registerToEvent(this.eventId)
      );

      const currentUserId = this.authService.getUser()?.id;
      if (result?.participants?.some((p: any) => p.id === currentUserId)) {
        this.alreadyJoined = true;
      }

      alert('Inscription réussie !');
    } catch (err: any) {
      if (err.status === 409) {
        this.alreadyJoined = true;
        alert('Vous êtes déjà inscrit à ce tournoi.');
      } else {
        alert("Erreur lors de l'inscription au tournoi.");
      }
    } finally {
      this.loading = false;
    }
  }
}
