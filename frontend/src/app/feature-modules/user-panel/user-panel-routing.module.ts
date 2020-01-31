import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { UserContentComponent } from './components/user-content/user-content.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './components/group/group.component';

const routes: Routes = [
  { path: '', component: UserContentComponent,
    children: [
      // { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', children: [
        { path: ':id', component: ProfileComponent },
        // { path: '', component: ProfileComponent },
        ]
      },
      { path: 'group', children: [
          { path: '', component: GroupComponent },
          { path: ':id', component: GroupDetailComponent },
        ]
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
