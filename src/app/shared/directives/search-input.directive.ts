import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[searchInput]',
  standalone: true
})
export class SearchInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = this.el.nativeElement.value;
    if (input && input.startsWith(' ')) {
      this.el.nativeElement.value = input.trimStart();
      // Manually trigger the input event after trimming to update the model
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }  
}
