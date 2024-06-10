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
import { Subscription, filter } from 'rxjs';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
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
        BreadcrumbModule,
        TieredMenuModule,
        ButtonModule],
})

export class MainComponent implements OnInit, OnDestroy {
    items: MenuItem[] = [];
    home: MenuItem | undefined;
    toogle_menu_items: MenuItem[] = [];

    private username = this.tokenService.getuserFullName();
    private subscription!: Subscription;

    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe({
                next: (event) => this.updateBreadcrumb()
            });

        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.toogle_menu_items = [
            {
                label: 'Il tuo profilo',
                icon: 'pi pi-user-edit',
                routerLink: this.profile_settings_path
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                routerLink: this.logout_path
            }
        ]
        this.updateBreadcrumb();
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    updateBreadcrumb() {
        {
            let temp_items = [];
            let snapshot = this.router.routerState.snapshot.root;

            while (snapshot.firstChild) {
                snapshot = snapshot.firstChild;
            }

            if (snapshot.data['breadcrumb']) {
                for (let page of snapshot.data['breadcrumb']) {
                    temp_items.push({ label: page['label'], RouterLink: page['url'] });
                }
            }

            this.items = temp_items;
        }
    }


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
