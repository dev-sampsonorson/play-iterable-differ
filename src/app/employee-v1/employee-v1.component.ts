import { Component, DoCheck, IterableChangeRecord, IterableDiffer, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
  0. Inject repository of iterlabel diffing strategies
  1. Variable to hold your iterable strategy
  2. Use repository to find iterable strategy and create instance of it
  3. Use iterable strategy to compute difference
  4. Subscribe to changes notifying you of differences

*/

interface Employee {
  id: number;
  name: string;
}

@Component({
  selector: 'app-employee-v1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-v1.component.html',
  styleUrls: ['./employee-v1.component.scss']
})
export class EmployeeV1Component implements DoCheck {

  employee1: Employee = { id: 1, name: 'John' };
  employee2: Employee = { id: 2, name: 'Fish' };
  employees: Employee[] = [this.employee1, this.employee2];
  employee3: Employee = { id: 1, name: 'John' };

  differStrategy: IterableDiffer<Employee>;

  constructor(
    private differStrategies: IterableDiffers
  ) {
    this.differStrategy = this.differStrategies.find(this.employees).create(this.trackBy);
  }

  ngDoCheck(): void {
    const changes = this.differStrategy.diff(this.employees);

    if (changes) {
      // 4. Subscribe to changes notifying you of differences
      changes.forEachAddedItem((record: IterableChangeRecord<Employee>) => {
        console.log('added => ', record);
      });

      changes.forEachMovedItem((recored: IterableChangeRecord<Employee>) => {
        console.log('moved => ', recored);
      });

      changes.forEachRemovedItem((record: IterableChangeRecord<Employee>) => {
        console.log('removed => ', record);
      });
    }

  }


  onClick() {
    // Swap employee 1 for 3 at index 0
    // This will add John and remove John; they are different instances
    this.employees = [
      this.employee3, this.employee2
    ];
  }

  trackBy(index: number, employee: Employee) {
    return employee.id;
  }
}
