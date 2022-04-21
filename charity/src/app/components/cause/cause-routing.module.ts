import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CauseCreateComponent } from './cause-create/cause-create.component';
import { CausesComponent } from './causes/causes.component';
import { CauseDetailsComponent } from './cause-details/cause-details.component';
import { CauseEditComponent } from './cause-edit/cause-edit.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const causeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'create', component: CauseCreateComponent },
    { path: 'all', component: CausesComponent },
    { path: 'details/:id', component: CauseDetailsComponent, canActivate:[AuthGuard] },
    { path: 'edit/:id', component: CauseEditComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(causeRoutes)
    ],
    exports: [RouterModule]
})
export class CauseRoutingModule { }