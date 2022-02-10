import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open')
  isOpen: boolean = false;

  // if we want to close dropdown by clicking anywhere in the window
  @HostListener('document:click', ['$event'])
  toggleOpen(event: Event): void {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  // if we want to close dropdown by clicking only on that particular button
  // @HostListener('click')
  // toggleOpen(): void {
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private elementRef: ElementRef) {}
}
