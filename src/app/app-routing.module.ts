import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { NewCreateComponent } from './new-create/new-create.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout/layout.component'; 

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: '', component: HomeComponent },  
      { path: 'news-logs', component: TableComponent },
      { path: 'create-news', component: NewCreateComponent },  
      { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
