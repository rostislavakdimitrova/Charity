import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const eventRoutes: Routes = [
    { path: '', component: EventsComponent, pathMatch: 'full' },
    { path: 'create', component: EventCreateComponent, canActivate: [AdminGuard] },
    { path: 'all', component: EventsComponent },
    { path: 'details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EventEditComponent, canActivate: [AdminGuard] },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(eventRoutes)
    ],
    exports: [RouterModule]
})
export class EventRoutingModule { }