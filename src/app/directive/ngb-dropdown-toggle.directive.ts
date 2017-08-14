// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[ngb-dropdown-toggle]'
// })
// export class NgbDropdownToggle {

//   constructor() { }

// }


import {Directive, Input, HostListener} from '@angular/core';

@Directive({selector: 'ngb-dropdown', host: {'class': 'dropdown', '[class.open]': 'open'}})
export class NgbDropdown {
  @Input() open = false;
}

@Directive({
  selector: '[ngb-dropdown-toggle]',
  host: {'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': '_dropdown.open'}
})
export class NgbDropdownToggle {
  constructor(private _dropdown: NgbDropdown) {}

  @HostListener('click')
  toggleOpen() {
    this._dropdown.open = !this._dropdown.open;
  }
}

