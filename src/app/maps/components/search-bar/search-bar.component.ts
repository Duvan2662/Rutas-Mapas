import { Component, signal } from '@angular/core';
import { SearchResultsComponent } from "../search-results/search-results.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer = signal<ReturnType<typeof setTimeout> | undefined>(undefined);

  onQueryChanged(query: string = '') {

    if (this.debounceTimer()) {
      clearTimeout(this.debounceTimer());
    }

    this.debounceTimer.set(setTimeout(()=>{
      console.log('Mandar este query:', query);

    },350))




  }
}
