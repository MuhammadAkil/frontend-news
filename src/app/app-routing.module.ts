import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { NewCreateComponent } from './new-create/new-create.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout/layout.component'; 
import { NewsDetailsComponent } from './components/news-details/news-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'news-logs', component: TableComponent },
      { path: 'create-news', component: NewCreateComponent },
      {
        path: 'news-details/:id', component: NewsDetailsComponent
      },
      { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
