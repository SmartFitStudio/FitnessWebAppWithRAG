import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TokenService } from '../../../../services/token/token.service';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subscription } from 'rxjs';
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
        AvatarModule, BadgeModule,
        RouterLinkActive, RouterLink,
        BreadcrumbModule],
})

export class MainComponent implements OnInit, OnDestroy{
    items: MenuItem[] = [];
    home: MenuItem | undefined;

    private username = this.tokenService.getuserFullName();
    private subscription!: Subscription;

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this. subscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let temp_items = [];
              var snapshot = this.router.routerState.snapshot.root.children[0].children[0].children[0];
              for (let page of snapshot.data['breadcrumb']) {
                temp_items.push({ label: page['label'], RouterLink: page['url']});
              }
              this.items = temp_items;
            }
          });
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();}

    get username_firstLetter() {
        return this.username.charAt(0);
    }

    get profile_settings_path(): string {
        return sub_appRoutingModule.full_manageProfilePath;
    }

    get logout_path(): string {
      return sub_appRoutingModule.full_logoutPath;
  }
}
