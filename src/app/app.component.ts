import { Component, IterableDiffer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IterableDiffers } from '@angular/core';
import { DoCheck } from '@angular/core';
import { IterableChanges } from '@angular/core';
import { IterableChangeRecord } from '@angular/core';

/*
  0. Inject repository of iterlabel diffing strategies
  1. Variable to hold your iterable strategy
  2. Use repository to find iterable strategy and create instance of it
  3. Use iterable strategy to compute difference
  4. Subscribe to changes notifying you of differences

*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  a = [1, 2, 3];

  // My differs
  // 1. Variable to hold your iterable strategy
  differ: IterableDiffer<number>;

  constructor(
    // IterableDiffer*s* gotten from Angular
    // A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
    // 0. Inject repository of iterlabel diffing strategies
    private differs: IterableDiffers
  ) {
    // 2. Use repository to find iterable strategy and create instance of it
    this.differ = this.differs.find(this.a).create();
  }
  ngDoCheck(): void {
    console.clear();
    // The `.diff(this.a) returns an object describing the difference.
    // The return value is only valid until the next diff() invocation.
    // 3. Use iterable strategy to compute difference
    const changes: IterableChanges<number> | null = this.differ.diff(this.a);

    if (changes) {
      // 4. Subscribe to changes notifying you of differences
      changes.forEachAddedItem((record: IterableChangeRecord<number>) => {
        console.log('added => ', record);
      });

      changes.forEachMovedItem((recored: IterableChangeRecord<number>) => {
        console.log('moved => ', recored);
      });

      changes.forEachRemovedItem((record: IterableChangeRecord<number>) => {
        console.log('removed => ', record);
      });
    }
  }

  onClick() {
    this.a = [1, 3, 4];
  }
}
