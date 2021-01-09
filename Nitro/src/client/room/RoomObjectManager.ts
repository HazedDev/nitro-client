import { AdvancedMap } from '../core/utils/AdvancedMap';
import { IRoomObjectManager } from './IRoomObjectManager';
import { IRoomObject } from './object/IRoomObject';
import { RoomObject } from './object/RoomObject';

export class RoomObjectManager implements IRoomObjectManager
{
    private _objects: AdvancedMap<number, IRoomObject>;
    private _objectsPerType: AdvancedMap<string, AdvancedMap<number, IRoomObject>>;

    constructor()
    {
        this._objects           = new AdvancedMap();
        this._objectsPerType    = new AdvancedMap();
    }

    public dispose(): void
    {
        this.removeAllObjects();
    }

    public getObject(id: number): IRoomObject
    {
        const object = this._objects.getValue(id);

        if(!object) return null;

        return object;
    }

    public getObjectByIndex(index: number): IRoomObject
    {
        const object = this._objects.getWithIndex(index);

        if(!object) return null;

        return object;
    }

    public createObject(id: number, stateCount: number, type: string): IRoomObject
    {
        const object = new RoomObject(id, stateCount, type);

        return this.addObject(id, type, object);
    }

    private addObject(id: number, type: string, object: IRoomObject): IRoomObject
    {
        if(this._objects.getValue(id))
        {
            object.dispose();

            return null;
        }

        this._objects.add(id, object);

        const typeMap = this.getTypeMap(type);

        if(typeMap) typeMap.add(id, object);

        return object;
    }

    public removeObject(id: number): void
    {
        const object = this._objects.remove(id);

        if(object)
        {
            const typeMap = this.getTypeMap(object.type);

            if(typeMap) typeMap.remove(object.id);

            object.dispose();
        }
    }

    public removeAllObjects(): void
    {
        let i = 0;

        while(i < this._objects.length)
        {
            const object = this._objects.getWithIndex(i);

            if(object) object.dispose();

            i++;
        }

        this._objects.reset();

        i = 0;

        while(i < this._objectsPerType.length)
        {
            const typeMap = this._objectsPerType.getWithIndex(i);

            if(typeMap) typeMap.dispose();

            i++;
        }

        this._objectsPerType.reset();
    }

    private getTypeMap(k: string, _arg_2: boolean = true): AdvancedMap<number, IRoomObject>
    {
        let existing = this._objectsPerType.getValue(k);

        if(!existing && _arg_2)
        {
            existing = new AdvancedMap();

            this._objectsPerType.add(k, existing);
        }

        return existing;
    }

    public get objects(): AdvancedMap<number, IRoomObject>
    {
        return this._objects;
    }

    public get totalObjects(): number
    {
        return this._objects.length;
    }
}