export interface ISessionDataManager {
    clubLevel: number;
    getWallItemData(typeId: any): import("./furniture/IFurnitureData").IFurnitureData;
    realName: string;
    isAmbassador: boolean;
    isUserIgnored(name: string): boolean;
    isSystemShutdown: any;
    userName: any;
    getFloorItemData(typeId: any);
    loadGroupBadgeImage(badgeId: string);
    loadBadgeImage(badgeId: string);
    events: any;
    getGroupBadgeImage(badgeId: string);
    getBadgeImage(badgeId: string);
    init();
    dispose();
    userId: any;
    isModerator: any;
    removePendingFurniDataListener(arg0: any);
    getAllFurnitureData(arg0: any);

}