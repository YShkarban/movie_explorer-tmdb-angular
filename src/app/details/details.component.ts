import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { lastValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Categories } from '../../interfaces/categories';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  text: string = '';

  details: any;
  similar: any;
  similarSearch: string = '';

  async ngOnInit() {
    this.text = String(this.route.snapshot.paramMap.get('type'));
    let id = Number(this.route.snapshot.paramMap.get('id'));
    // this.loadDetails(id);

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadDetails(id);
    });
  }

  async loadDetails(id: number) {
    if (this.text == 'movie') {
      this.details = await lastValueFrom(this.tmdbService.movieDetails(id));
      this.similar = await lastValueFrom(this.tmdbService.movieSimilar(id));
      
    } else if (this.text == 'tv') {
      this.details = await lastValueFrom(this.tmdbService.tvDetails(id));
      this.similar = await lastValueFrom(this.tmdbService.tvSimilar(id));

    }
  }
}
