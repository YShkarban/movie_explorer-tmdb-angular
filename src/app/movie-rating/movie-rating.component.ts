import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-rating',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    StarRatingComponent,
  ],
  templateUrl: './movie-rating.component.html',
  styleUrl: './movie-rating.component.scss',
})
export class MovieRatingComponent {
  readonly dialogRef = inject(MatDialogRef<MovieRatingComponent>);
  readonly data = inject<number>(MAT_DIALOG_DATA);

  cancel() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
