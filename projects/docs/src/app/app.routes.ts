import { Routes } from '@angular/router';
import { EXAMPLES, GUIDES } from './nav';
import { HomeComponent } from './pages/home.component';
import { GuidePageComponent } from './pages/guide-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'shark-ng-table: an accessible Angular data table' },
  ...GUIDES.map(guide => ({
    path: `guide/${guide.path}`,
    component: GuidePageComponent,
    data: { markdown: guide.markdown },
    title: `${guide.title} | shark-ng-table`
  })),
  ...EXAMPLES.map(example => ({
    path: example.path,
    loadComponent: example.load,
    title: `${example.title} example | shark-ng-table`
  })),
  {
    path: 'link-target/:id',
    loadComponent: () => import('./samples/link-target.component').then(m => m.LinkTargetComponent),
    title: 'Row link target | shark-ng-table'
  },
  { path: '**', redirectTo: '' }
];
