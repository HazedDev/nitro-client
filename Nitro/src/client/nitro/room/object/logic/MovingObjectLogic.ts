import { RoomObjectUpdateMessage } from '../../../../room/messages/RoomObjectUpdateMessage';
import { IRoomObject } from '../../../../room/object/IRoomObject';
import { RoomObjectLogicBase } from '../../../../room/object/logic/RoomObjectLogicBase';
import { IVector3D } from '../../../../room/utils/IVector3D';
import { Vector3D } from '../../../../room/utils/Vector3D';
import { ObjectMoveUpdateMessage } from '../../messages/ObjectMoveUpdateMessage';
import { RoomObjectVariable } from '../RoomObjectVariable';

export class MovingObjectLogic extends RoomObjectLogicBase
{
    private static TEMP_VECTOR: Vector3D = new Vector3D();

    private _liftAmount: number;

    private _location: Vector3D;
    private _locationDelta: Vector3D;
    private _lastUpdateTime: number;
    private _changeTime: number;
    private _updateInterval: number;

    constructor()
    {
        super();

        this._liftAmount        = 0;

        this._location          = new Vector3D();
        this._locationDelta     = new Vector3D();
        this._lastUpdateTime    = 0;
        this._changeTime        = 0;
        this._updateInterval    = 500;
    }

    public dispose(): void
    {
        this._liftAmount = 0;
        
        super.dispose();
    }

    public update(time: number): void
    {
        super.update(time);

        const locationOffset    = this.getLocationOffset();
        const model             = this.object && this.object.model;

        if(model)
        {
            if(locationOffset)
            {
                if(this._liftAmount !== locationOffset.z)
                {
                    this._liftAmount = locationOffset.z;
    
                    model.setValue(RoomObjectVariable.FURNITURE_LIFT_AMOUNT, this._liftAmount);
                }
            }
            else
            {
                if(this._liftAmount !== 0)
                {
                    this._liftAmount = 0;
    
                    model.setValue(RoomObjectVariable.FURNITURE_LIFT_AMOUNT, this._liftAmount);
                }
            }
        }

        if((this._locationDelta.length > 0) || locationOffset)
        {
            const vector = MovingObjectLogic.TEMP_VECTOR;

            let difference = (this.time - this._changeTime);

            if(difference === (this._updateInterval >> 1)) difference++;

            if(difference > this._updateInterval) difference = this._updateInterval;

            if(this._locationDelta.length > 0)
            {
                vector.assign(this._locationDelta);
                vector.multiply((difference / this._updateInterval));
                vector.add(this._location);
            }
            else
            {
                vector.assign(this._location);
            }

            if(locationOffset) vector.add(locationOffset);

            this.object.setLocation(vector);

            if(difference === this._updateInterval)
            {
                this._locationDelta.x = 0;
                this._locationDelta.y = 0;
                this._locationDelta.z = 0;
            }
        }

        this._lastUpdateTime = this.time;
    }

    public setObject(object: IRoomObject): void
    {
        super.setObject(object);

        if(object) this._location.assign(object.getLocation());
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(!message) return;

        super.processUpdateMessage(message);

        if(message.location) this._location.assign(message.location);

        if(message instanceof ObjectMoveUpdateMessage) return this.processMoveMessage(message);
    }

    private processMoveMessage(message: ObjectMoveUpdateMessage): void
    {
        if(!message || !this.object || !message.location) return;

        this._changeTime = this._lastUpdateTime;

        this._locationDelta.assign(message.targetLocation);
        this._locationDelta.subtract(this._location);
    }

    protected getLocationOffset(): IVector3D
    {
        return null;
    }

    protected get lastUpdateTime(): number
    {
        return this._lastUpdateTime;
    }
}