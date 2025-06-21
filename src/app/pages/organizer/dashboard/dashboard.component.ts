import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { ChessEvent } from '../../../models/chess-event.model';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  events: ChessEvent[] = [];

  constructor(
    private readonly router: Router,
    private readonly eventsService: EventsService
  ) {}

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.eventsService.getMyEvents());
      this.events = data as ChessEvent[];
    } catch {
      this.events = [];
    }
  }

  goToCreate() {
    this.router.navigate(['/organizer/event-crud']);
  }

  editEvent(id: number) {
    this.router.navigate(['/organizer/event-crud', id]);
  }
  async deleteEvent(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ?')) {
      return;
    }

    try {
      await firstValueFrom(this.eventsService.delete(id));
      // Met à jour la liste après suppression
      this.events = this.events.filter((e) => e.id !== id);
    } catch (err) {
      console.error('Erreur lors de la suppression du tournoi', err);
      alert('Une erreur est survenue lors de la suppression du tournoi.');
    }
  }

  viewPlayers(id: number) {
    this.router.navigate(['/organizer/player-list', id]);
  }
}
