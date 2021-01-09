import { Component, NgZone } from '@angular/core';
import { Nitro } from '../../../../client/nitro/Nitro';
import { IVector3D } from '../../../../client/room/utils/IVector3D';
import { RoomGeometry } from '../../../../client/room/utils/RoomGeometry';
import { Vector3D } from '../../../../client/room/utils/Vector3D';

@Component({
	selector: '[nitro-toolbar-cameracontrols-component]',
    template: `
    <div *ngIf="visible" class="nitro-toolbar-cameracontrols-component">
        <div class="card">
            <div class="card-header">
                <div class="header-title">Camera</div>
            </div>
            <div class="card-body">
                <ul #navigationList class="list-group">
                    <li class="list-group-item" (click)="rotateLeft()">Rotate Left</li>
                    <li class="list-group-item" (click)="rotateRight()">Rotate Right</li>
                    <li class="list-group-item" (click)="tiltUp()">Tilt Up</li>
                    <li class="list-group-item" (click)="tiltDown()">Tilt Down</li>
                    <li class="list-group-item" (click)="zoomIn()">Zoom In</li>
                    <li class="list-group-item" (click)="zoomOut()">Zoom Out</li>
                </ul>
            </div>
        </div>
    </div>`
})
export class CameraControlsComponent
{
    public visible = false;

    constructor(
        private ngZone: NgZone) {}

    private adjustDirection(x: number, y: number): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            const geometry  = this.getGeometry();

            if(!geometry) return;

            const adjustment        = new Vector3D(x, y, 0);
            const adjustedDirection = Vector3D.sum(geometry.direction, adjustment);

            this.setDirection(adjustedDirection);
        });
    }

    private setDirection(direction: IVector3D): void
    {
        if(!direction) return;

        this.ngZone.runOutsideAngular(() =>
        {
            const geometry  = this.getGeometry();

            if(!geometry) return;

            geometry.direction = direction;
        });
    }

    public rotateLeft(): void
    {
        this.adjustDirection(-1, 0);
    }

    public rotateRight(): void
    {
        this.adjustDirection(1, 0);
    }

    public tiltUp(): void
    {
        this.adjustDirection(0, -1);
    }

    public tiltDown(): void
    {
        this.adjustDirection(0, 1);
    }

    public zoomIn(): void
    {

    }

    public zoomOut(): void
    {

    }

    public topDown(): void
    {
        
    }

    private getGeometry(): RoomGeometry
    {
        const geometry = (Nitro.instance.roomEngine.getRoomInstanceGeometry(Nitro.instance.roomEngine.activeRoomId) as RoomGeometry);

        if(!geometry) return null;

        return geometry;
    }
}