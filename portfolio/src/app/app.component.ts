import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    PortfolioComponent,
    ServicesComponent,
    // No need to import RouterLink or RouterLinkActive here unless you use them directly in this component's template
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
}
