import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { TeaserComponent } from './components/teaser/teaser.component';
import {MatCardModule} from '@angular/material/card';
import { NewsComponent } from './components/news/news.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { NewsSliderComponent } from './components/news-slider/news-slider.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { MatTableModule } from '@angular/material/table'; // Material Table
import { MatFormFieldModule } from '@angular/material/form-field'; // Material Form Field
import { MatInputModule } from '@angular/material/input'; // Material Input
import { MatSelectModule } from '@angular/material/select'; // Material Select Dropdown
import { MatButtonModule } from '@angular/material/button'; // Material Button
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'; // Material Icon
import { MatDatepickerModule } from '@angular/material/datepicker'; // Material Datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Material Date Picker Core
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewCreateComponent } from './new-create/new-create.component'; // Material Date Picker Core
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TeaserComponent,
    NewsComponent,
    QuickLinksComponent,
    NewsSliderComponent,
    ContactUsComponent,
    FooterComponent,
    TableComponent,
    NewCreateComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    BrowserModule,
    NzDrawerModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'arrow-down',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arrow-down.svg')
    );
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/user.svg')
    );

    iconRegistry.addSvgIcon(
      'arrow-right-circled',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arrow-right-circled.svg')
    )

    iconRegistry.addSvgIcon(
      'arrow-right',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arrow-right.svg')
    )

    iconRegistry.addSvgIcon(
      'file',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/file.svg')
    )

    iconRegistry.addSvgIcon(
      'arrow-with-angle',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arrow-with-angle.svg')
    )

   
  }

}
