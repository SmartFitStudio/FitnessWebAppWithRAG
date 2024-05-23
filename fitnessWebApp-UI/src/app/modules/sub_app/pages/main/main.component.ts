import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TokenService } from '../../../../services/token/token.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [
        MenuComponent,
        NotificationListComponent,
        RouterOutlet,
        ChatbotComponent,
        AvatarModule, BadgeModule],
})

export class MainComponent {
    private username = this.tokenService.getuserFullName();
    constructor(
        private tokenService: TokenService,
    ) { }

    get username_firstLetter() {
        return this.username.charAt(0);
    }
}
