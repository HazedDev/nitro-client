import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RoomComponent } from './component';
import { RoomAvatarInfoAvatarComponent } from './widgets/avatarinfo/avatar/component';
import { RoomAvatarInfoComponent } from './widgets/avatarinfo/component';
import { RoomAvatarInfoNameComponent } from './widgets/avatarinfo/name/component';
import { RoomAvatarInfoOwnAvatarComponent } from './widgets/avatarinfo/ownavatar/component';
import { RoomChatInputComponent } from './widgets/chatinput/component';
import { RoomChatInputStyleSelectorComponent } from './widgets/chatinput/styleselector/component';
import { RoomInfoStandBotComponent } from './widgets/infostand/bot/component';
import { RoomInfoStandComponent } from './widgets/infostand/component';
import { RoomInfoStandFurniComponent } from './widgets/infostand/furni/component';
import { RoomInfoStandPetComponent } from './widgets/infostand/pet/component';
import { RoomInfoStandRentableBotComponent } from './widgets/infostand/rentablebot/component';
import { RoomInfoStandUserComponent } from './widgets/infostand/user/component';
import { RoomChatItemComponent } from './widgets/roomchat/chatitem/component';
import { RoomChatComponent } from './widgets/roomchat/component';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        RoomComponent,
        RoomChatInputComponent,
        RoomChatComponent,
        RoomChatItemComponent,
        RoomChatInputStyleSelectorComponent,
        RoomInfoStandComponent,
        RoomInfoStandBotComponent,
        RoomInfoStandFurniComponent,
        RoomInfoStandPetComponent,
        RoomInfoStandRentableBotComponent,
        RoomInfoStandUserComponent,
        RoomAvatarInfoComponent,
        RoomAvatarInfoAvatarComponent,
        RoomAvatarInfoNameComponent,
        RoomAvatarInfoOwnAvatarComponent
    ],
    providers: [
    ],
    declarations: [
        RoomComponent,
        RoomChatInputComponent,
        RoomChatComponent,
        RoomChatItemComponent,
        RoomChatInputStyleSelectorComponent,
        RoomInfoStandComponent,
        RoomInfoStandBotComponent,
        RoomInfoStandFurniComponent,
        RoomInfoStandPetComponent,
        RoomInfoStandRentableBotComponent,
        RoomInfoStandUserComponent,
        RoomAvatarInfoComponent,
        RoomAvatarInfoAvatarComponent,
        RoomAvatarInfoNameComponent,
        RoomAvatarInfoOwnAvatarComponent
    ]
})
export class RoomModule {} 