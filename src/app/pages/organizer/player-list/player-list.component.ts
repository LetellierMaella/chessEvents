import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  players: any[] = [];
  eventId!: number;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventsService: EventsService
  ) {}

  async ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const data = await firstValueFrom(
        this.eventsService.getParticipants(this.eventId)
      );
      this.players = data as any[];
    } catch (err) {
      this.error = 'Impossible de charger la liste des participants.';
    }
  }
}
