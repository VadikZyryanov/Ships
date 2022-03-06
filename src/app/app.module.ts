import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/main-page/list/list.component';
import { CardComponent } from './components/card-page/card/card.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FilterComponent } from './components/main-page/filter/filter.component';
import { GraphQLModule } from "./gradhgl.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import {LoaderComponent} from "./shared/loader/loader.component";


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    MainPageComponent,
    FilterComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
