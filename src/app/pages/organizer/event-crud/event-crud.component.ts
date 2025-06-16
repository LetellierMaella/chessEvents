import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-crud.component.html',
  styleUrls: ['./event-crud.component.scss'],
})
export class EventCrudComponent implements OnInit {
  eventForm!: FormGroup;
  eventId: number | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      label: ['', Validators.required],
      date: ['', Validators.required],
      maxParticipants: [null, [Validators.required, Validators.min(1)]],
      gender: ['all', Validators.required],
      number: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = Number(idParam);
      this.loadEvent();
    }
  }

  async loadEvent() {
    try {
      const event: any = await firstValueFrom(
        this.eventsService.getById(this.eventId!)
      );

      this.eventForm.patchValue({
        label: event.label,
        date: event.date.substring(0, 10),
        maxParticipants: event.maxParticipants,
        gender: event.gender,
        number: event.address.number,
        street: event.address.street,
        zip: event.address.postalCode,
        city: event.address.city,
        country: event.address.country,
      });
    } catch (err) {
      alert('Erreur lors du chargement du tournoi.');
    }
  }

  async save() {
    this.submitted = true;
    if (this.eventForm.invalid) return;

    const formValues = this.eventForm.value;
    const data = {
      label: formValues.label,
      date: formValues.date,
      maxParticipants: formValues.maxParticipants,
      gender: formValues.gender,
      address: {
        number: '1', // ou un champ à ajouter si tu veux être complet
        street: formValues.street,
        postalCode: formValues.zip, // <-- clé corrigée
        city: formValues.city,
        country: formValues.country,
      },
    };

    try {
      if (this.eventId) {
        await firstValueFrom(this.eventsService.update(this.eventId, data));
      } else {
        await firstValueFrom(this.eventsService.create(data));
      }
      this.router.navigateByUrl('/organizer/dashboard');
    } catch (err) {
      alert("Erreur lors de l'enregistrement du tournoi.");
    }
  }
}
