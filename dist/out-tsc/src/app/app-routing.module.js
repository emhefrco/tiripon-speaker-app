import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
    { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
    { path: 'materials', loadChildren: './pages/materials/materials.module#MaterialsPageModule' },
    { path: 'event-materials', loadChildren: './pages/event-materials/event-materials.module#EventMaterialsPageModule' },
    { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
    { path: 'event-chat', loadChildren: './pages/event-chat/event-chat.module#EventChatPageModule' },
    { path: 'event-chat-general', loadChildren: './pages/event-chat-general/event-chat-general.module#EventChatGeneralPageModule' },
    { path: 'event-chats', loadChildren: './pages/event-chats/event-chats.module#EventChatsPageModule' },
    { path: 'direct-message', loadChildren: './pages/direct-message/direct-message.module#DirectMessagePageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map