import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/feature-modules/main-page/components/login-form/login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/model/message/message';
import { shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
  userID;
  messageForm: FormGroup;
  accessToken = '123';
  messages;
  messages$: Observable<Message[]> = this.route.paramMap.pipe(
    switchMap(param => this.getMessages(param.get('id'))),
    shareReplay(0)
  );

  myEmail = this.loginService.getUserDetails().email;

  constructor(private route: ActivatedRoute, private loginService: LoginService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.accessToken = this.loginService.getAccessToken();
    this.route.paramMap.subscribe((param: Params) => {
      this.userID = param.get('id');
    });
    this.messageForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
    console.log(this.userID);
  }

  sendMessage() {
    const body = {
      'receiverId': `${this.userID}`,
      'message': `${this.messageForm.controls.text.value}`
    };
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
    if (this.messageForm.valid) {
      return this.httpClient.post('http://localhost:8080/conversation', body, { headers }).subscribe(
        data => {
          this.messages$ = this.route.paramMap.pipe(
            switchMap(param => this.getMessages(param.get('id'))),
            shareReplay(0)
          );
          this.messageForm.reset();
        },
          error => {
            console.log('error = ' + error);
          }
      );
    }
  }

  getMessages(id): Observable<Message[]> {
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };
      return this.httpClient.get<Message[]>('http://localhost:8080/conversation/' + id, { headers });
    }
}
