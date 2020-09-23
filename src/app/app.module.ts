import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './layout/filters/filters.component';
import { FilterReplacementsComponent } from './layout/filter-replacements/filter-replacements.component';

import { Select2Module } from "ng-select2-component";
import { PublishingComponent } from './components/publishing/publishing.component';
import { ReplacementsComponent } from './pages/replacements/replacements.component';
import { ReplacementComponent } from './pages/replacement/replacement.component';
import { PublishingRepComponent } from './components/publishing-rep/publishing-rep.component';
import { ShareComponent } from './components/share/share.component';
import { PublishingMcycleComponent } from './components/publishing-mcycle/publishing-mcycle.component';
import { FilterMcycleComponent } from './layout/filter-mcycle/filter-mcycle.component';
import { McyclesComponent } from './pages/mcycles/mcycles.component';
import { McycleComponent } from './pages/mcycle/mcycle.component';

import {
    AngularImageViewerModule
} from "angular-x-image-viewer";

import { PublishingIndComponent } from './components/publishing-ind/publishing-ind.component';
import { PublishingVanComponent } from './components/publishing-van/publishing-van.component';
import { FilterIndComponent } from './layout/filter-ind/filter-ind.component';
import { IndustrialsComponent } from './pages/industrials/industrials.component';
import { IndustrialComponent } from './pages/industrial/industrial.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { CreateComponent } from './pages/create/create.component';
import { PublishComponent } from './pages/publish/publish.component';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { NgxLoadingModule } from 'ngx-loading';
import { ThousandsPipe } from './pipes/thousands.pipe';
import { FeaturesPipe } from './pipes/features.pipe';
import { MyPublishingComponent } from './pages/my-publishing/my-publishing.component';
import { Select2DataPipe } from './pipes/select2-data.pipe';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FavoritePipe } from './pipes/favorite.pipe';
import { VansComponent } from './pages/vans/vans.component';
import { VanDetailsComponent } from './pages/van-details/van-details.component';
import { FilterVanComponent } from './layout/filter-van/filter-van.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { SearchesComponent } from './pages/searches/searches.component';
import { TimePipe } from './pipes/time.pipe';
import { IsvalidPipe } from './pipes/isvalid.pipe';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ContactComponent } from './layout/contact/contact.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessagesPipe } from './pipes/messages.pipe';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { EquipmentsPipe } from './pipes/equipments.pipe';
import { CheckEquipmentsPipe } from './pipes/check-equipments.pipe';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://bulldogames.com:1234', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FiltersComponent,
    PublishingComponent,
    ReplacementsComponent,
    ReplacementComponent,
    FilterReplacementsComponent,
    PublishingRepComponent,
    ShareComponent,
    PublishingMcycleComponent,
    FilterMcycleComponent,
    McyclesComponent,
    McycleComponent,
    PublishingIndComponent,
    FilterIndComponent,
    IndustrialsComponent,
    IndustrialComponent,
    MyAccountComponent,
    CreateComponent,
    PublishComponent,
    ThousandsPipe,
    FeaturesPipe,
    MyPublishingComponent,
    Select2DataPipe,
    FavoritesComponent,
    FavoritePipe,
    VansComponent,
    VanDetailsComponent,
    FilterVanComponent,
    PublishingVanComponent,
    BannerComponent,
    ProfessionalsComponent,
    FaqsComponent,
    SearchesComponent,
    TimePipe,
    IsvalidPipe,
    ContactComponent,
    MessagesComponent,
    MessagesPipe,
    SanitizerPipe,
    EquipmentsPipe,
    CheckEquipmentsPipe
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxLoadingModule.forRoot({}),
    // SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    Select2Module,
    AngularImageViewerModule,
    HttpClientModule,
    NgxDropzoneModule,
    ShareButtonModule,
    ShareIconsModule,
    CKEditorModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
