import { Component, Output, EventEmitter } from '@angular/core';
import { NavigationHelper } from '../navigation/navigation-helper';

@Component({
  selector: 'ej-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Declaring onHamBurgerClick Event to acheive sidebar toggling from the app component side.
  @Output() hamBurgerClick: EventEmitter<{}> = new EventEmitter();

  get aspNetUrl(): string { return NavigationHelper.getHref(''); }
  get blazorUrl(): string { return NavigationHelper.getHref('blazor'); }
  get angularUrl(): string { return NavigationHelper.getHref('angular'); }
  get reactUrl(): string { return NavigationHelper.getHref('react'); }
  get javascriptUrl(): string { return NavigationHelper.getHref('javascript'); }

  // This will be fired on clicking hamburger icon.
  public onClick(): void {
    // This will fire an event in app component.
    this.hamBurgerClick.emit();
  }
}
