import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { UserContentComponent } from './components/user-content/user-content.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { FilesComponent } from './components/files/files.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';

const routes: Routes = [
  { path: '', component: UserContentComponent,
    children: [
      { path: 'profile', children: [
        { path: ':id', component: ProfileComponent },
        ]
      },
      { path: 'chat', component: ChatComponent, children: [
         { path: ':id', component: ChatWindowComponent }
        ],
      },
      { path: 'files', component: FilesComponent },
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
