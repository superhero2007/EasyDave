import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher, MatAutocompleteModule,
  MatButtonModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatButtonToggleModule,
  MatToolbarModule, MatTooltipModule, ShowOnDirtyErrorStateMatcher, MatCardModule, MatStepperModule, MatTabsModule, MatExpansionModule
} from '@angular/material';

const MAT_MODULE = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatChipsModule,
  MatStepperModule,
  MatCardModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [],
  imports: [
    MAT_MODULE
  ],
  exports: [
    MAT_MODULE
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class MaterialModule { }
