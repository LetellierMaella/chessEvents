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
  canJoin: boolean = false;
  alreadyRegistered: boolean = false;

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

      const user = this.authService.getUser();
      const userGender = user?.gender;

      this.alreadyRegistered = !!this.event.participants?.some(
        (p: any) => p.id === user?.id
      );

      this.canJoin =
        !!user &&
        user.role === 'user' &&
        !this.alreadyRegistered &&
        (this.event.gender === 'all' || this.event.gender === userGender);
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

  async handleUnregister() {
    const confirmed = confirm(
      'Souhaitez-vous vous désinscrire de ce tournoi ?'
    );
    if (!confirmed) return;

    try {
      await firstValueFrom(
        this.eventsService.unregisterFromEvent(this.eventId)
      );
      this.alreadyRegistered = false;
      alert('Vous avez été désinscrit.');
      this.router.navigateByUrl('/profile');
    } catch (err) {
      alert('Erreur lors de la désinscription.');
    }
  }

  formatCategory(gender?: string): string {
    switch (gender) {
      case 'man':
        return 'Hommes';
      case 'woman':
        return 'Femmes';
      default:
        return 'Mixte';
    }
  }
}
