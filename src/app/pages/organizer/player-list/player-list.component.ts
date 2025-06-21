import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  eventId!: number;
  players: User[] = [];
  filteredPlayers: User[] = [];

  // Pour recherche
  searchTerm: string = '';

  // Pour pagination
  currentPage: number = 1;
  pageSize: number = 20;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  async ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const data = await firstValueFrom(
        this.eventsService.getParticipants(this.eventId)
      );
      this.players = data as User[];
      this.applyFilter();
    } catch (err) {
      console.error('Erreur lors du chargement des joueurs', err);
      this.players = [];
    }
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPlayers = this.players.filter((player) =>
      `${player.firstname} ${player.lastname}`.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  paginatedPlayers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPlayers.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filteredPlayers.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredPlayers.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
