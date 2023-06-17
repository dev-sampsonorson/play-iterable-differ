import { Directive, DoCheck, ElementRef, Input, IterableDiffers, KeyValueChangeRecord, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, Renderer2 } from '@angular/core';

@Directive({
  selector: '[myNgStyle]',
  standalone: true
})
export class MyNgStyleDirective implements DoCheck {

  private _myNgStyle: { [key: string]: string } | null = null;
  private _differ: KeyValueDiffer<string, string> | null = null;

  constructor(
    // This is the default one
    // private _differStrategies: IterableDiffers,
    private _differStrategies: KeyValueDiffers,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {}

  ngDoCheck(): void {
    if (this._differ && this._myNgStyle) {
      const changes: KeyValueChanges<string, any> | null = this._differ.diff(this._myNgStyle);

      if (changes) {
        // apply changes to DOM
        changes.forEachAddedItem((record: KeyValueChangeRecord<string, any>) => {
          this._setStyle(record.key, record.currentValue);
        });

        changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
          this._setStyle(record.key, record.currentValue);
        });

        changes.forEachRemovedItem((record: KeyValueChangeRecord<string, any>) => {
          this._setStyle(record.key, null);
        });
      }
    }
  }

  @Input() set myNgStyle(value: { [key: string]: string }) {
    this._myNgStyle = value;
    if (!this._differ && value) {
      this._differ = this._differStrategies.find(value).create();
    }
  }

  private _setStyle(nameAndUnit: string, value: string | null) {
    const [name, unit] = nameAndUnit.split('.');
    value = value && unit ? `${value}${unit}` : value;

    this._renderer.setStyle(
      this._elementRef.nativeElement,
      name,
      value
    );
  }

}
