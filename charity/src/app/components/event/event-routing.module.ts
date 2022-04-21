import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';


const eventRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'create', component: EventCreateComponent },
    { path: 'all', component: EventsComponent },
    { path: 'details/:id', component: EventDetailsComponent },
    { path: 'edit/:id', component: EventEditComponent },
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