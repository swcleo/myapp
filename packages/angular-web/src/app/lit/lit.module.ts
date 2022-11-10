import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LitRoutingModule } from './lit-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LitRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LitModule {}
