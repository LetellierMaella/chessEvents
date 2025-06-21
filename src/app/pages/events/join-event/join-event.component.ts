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
  alreadyRegistered: boolean = false;
  registrationSuccess: boolean = false;
  registrationError: string = '';
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const user = this.authService.getUser();
    this.userRole = user?.role ?? '';

    // 🚫 Redirection si organisateur
    if (this.userRole === 'organiser') {
      alert(
        "En tant qu'organisateur, vous ne pouvez pas vous inscrire à un tournoi."
      );
      this.router.navigateByUrl('/organizer/dashboard');
      return;
    }

    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const event = await firstValueFrom(
        this.eventsService.getById(this.eventId)
      );
      this.event = event as ChessEvent;

      this.alreadyRegistered = !!this.event.participants?.some(
        (p: any) => p.id === user?.id
      );
    } catch (err) {
      this.registrationError =
        'Erreur lors du chargement des informations du tournoi.';
    }
  }

  async join() {
    try {
      await firstValueFrom(this.eventsService.registerToEvent(this.eventId));
      this.registrationSuccess = true;
    } catch (err) {
      this.registrationError = 'Une erreur est survenue lors de l’inscription.';
    }
  }
}
