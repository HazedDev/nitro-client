import { IFurnitureData } from './IFurnitureData';
import { IFurnitureDimension } from './IFurnitureDimension';

export class FurnitureData implements IFurnitureData
{
    private _type: string;
    private _id: number;
    private _fullName: string;
    private _className: string;
    private _colorId: number;
    private _name: string;
    private _description: string;
    private _furniLine: string;
    private _colors: number[];
    private _dimensions: IFurnitureDimension;
    private _canStandOn: boolean;
    private _canSitOn: boolean;
    private _canLayOn: boolean;
    private _offerId: number;
    private _adUrl: string;
    private _excludeDynamic: boolean;
    private _specialType: number;
    private _customParams: string;

    constructor(type: string, id: number, className: string, name: string, description: string, furniLine: string, colors: number[], dimensions: IFurnitureDimension, canStandOn: boolean, canSitOn: boolean, canLayOn: boolean, offerId: number, adUrl: string, excludeDynamic: boolean, specialType: number, customParams: string)
    {
        const [ splitClass, splitColor ] = className.split('*');

        this._type              = type;
        this._id                = id;
        this._fullName          = className;
        this._className         = splitClass;
        this._colorId           = (parseInt(splitColor) || 0);
        this._name              = name;
        this._description       = description;
        this._furniLine         = furniLine;
        this._offerId           = offerId;
        this._adUrl             = adUrl;
        this._excludeDynamic    = excludeDynamic;
        this._specialType       = specialType;
        this._customParams      = customParams;
        this._dimensions        = dimensions;
        this._canStandOn        = canStandOn;
        this._canSitOn          = canSitOn;
        this._canLayOn          = canLayOn;
    }

    public get type(): string
    {
        return this._type;
    }

    public get id(): number
    {
        return this._id;
    }

    public get fullName(): string
    {
        return this._fullName;
    }

    public get className(): string
    {
        return this._className;
    }

    public get colorId(): number
    {
        return this._colorId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get furniLine(): string
    {
        return this._furniLine;
    }

    public get colors(): number[]
    {
        return this._colors;
    }

    public get dimensions(): IFurnitureDimension
    {
        return this._dimensions;
    }

    public get canStandOn(): boolean
    {
        return this._canStandOn;
    }

    public get canSitOn(): boolean
    {
        return this._canSitOn;
    }

    public get canLayOn(): boolean
    {
        return this._canLayOn;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get adUrl(): string
    {
        return this._adUrl;
    }

    public get excludeDynamic(): boolean
    {
        return this._excludeDynamic;
    }

    public get specialType(): number
    {
        return this._specialType;
    }

    public get customParams(): string
    {
        return this._customParams;
    }
}