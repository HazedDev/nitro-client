import { RoomWidgetUpdateEvent } from '../../../../../client/nitro/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetInfostandUpdateEvent extends RoomWidgetUpdateEvent
{
    public static PET_INFO: string = "RWPIUE_PET_INFO";

    private _level: number;
    private _maximumLevel: number;
    private _experience: number;
    private _levelExperienceGoal: number;
    private _energy: number;
    private _maximumEnergy: number;
    private _happyness: number;
    private _maximumHappyness: number;
    private _Str_3973: number;
    private _respect: number;
    private _age: number;
    private _name: string;
    private _id: number;
    private _image: PIXI.Texture;
    private _Str_6689: number;
    private _Str_20932: number;
    private _Str_10121: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _Str_11149: boolean;
    private _Str_2775: number;
    private _unknownRarityLevel: number;
    private _saddle: boolean;
    private _rider: boolean;
    private _breedable: boolean;
    private _Str_4460: string[];
    private _publiclyRideable: number;
    private _fullyGrown: boolean;
    private _dead: boolean;
    private _rarityLevel: number;
    private _maximumTimeToLive: number;
    private _remainingTimeToLive: number;
    private _remainingGrowTime: number;
    private _publiclyBreedable: boolean;

    constructor(k: number, _arg_2: number, _arg_3: string, _arg_4: number, _arg_5: PIXI.Texture, _arg_6: boolean, _arg_7: number, _arg_8: string, _arg_9: number, _arg_10: number)
    {
        super(RoomWidgetPetInfostandUpdateEvent.PET_INFO);

        this._Str_6689 = k;
        this._Str_20932 = _arg_2;
        this._name = _arg_3;
        this._id = _arg_4;
        this._image = _arg_5;
        this._Str_10121 = _arg_6;
        this._ownerId = _arg_7;
        this._ownerName = _arg_8;
        this._Str_2775 = _arg_9;
        this._unknownRarityLevel = _arg_10;
    }

    public get name(): string
    {
        return this._name;
    }

    public get image(): PIXI.Texture
    {
        return this._image;
    }

    public get id(): number
    {
        return this._id;
    }

    public get _Str_4355(): number
    {
        return this._Str_6689;
    }

    public get _Str_14767(): number
    {
        return this._Str_20932;
    }

    public get _Str_5175(): boolean
    {
        return this._Str_10121;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get _Str_5114(): boolean
    {
        return this._Str_11149;
    }

    public get _Str_2707(): number
    {
        return this._Str_2775;
    }

    public get age(): number
    {
        return this._age;
    }

    public get unknownRarityLevel(): number
    {
        return this._unknownRarityLevel;
    }

    public get saddle(): boolean
    {
        return this._saddle;
    }

    public get rider(): boolean
    {
        return this._rider;
    }

    public get breedable(): boolean
    {
        return this._breedable;
    }

    public get fullyGrown(): boolean
    {
        return this._fullyGrown;
    }

    public get dead(): boolean
    {
        return this._dead;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public get _Str_3307(): string[]
    {
        return this._Str_4460;
    }

    public get publiclyRideable(): number
    {
        return this._publiclyRideable;
    }

    public get level(): number
    {
        return this._level;
    }

    public get maximumLevel(): number
    {
        return this._maximumLevel;
    }

    public get experience(): number
    {
        return this._experience;
    }

    public get levelExperienceGoal(): number
    {
        return this._levelExperienceGoal;
    }

    public get energy(): number
    {
        return this._energy;
    }

    public get maximumEnergy(): number
    {
        return this._maximumEnergy;
    }

    public get happyness(): number
    {
        return this._happyness;
    }

    public get maximumHappyness(): number
    {
        return this._maximumHappyness;
    }

    public get _Str_2985(): number
    {
        return this._Str_3973;
    }

    public get respect(): number
    {
        return this._respect;
    }

    public set level(k: number)
    {
        this._level = k;
    }

    public set maximumLevel(k: number)
    {
        this._maximumLevel = k;
    }

    public set experience(k: number)
    {
        this._experience = k;
    }

    public set levelExperienceGoal(k: number)
    {
        this._levelExperienceGoal = k;
    }

    public set energy(k: number)
    {
        this._energy = k;
    }

    public set maximumEnergy(k: number)
    {
        this._maximumEnergy = k;
    }

    public set happyness(k: number)
    {
        this._happyness = k;
    }

    public set maximumHappyness(k: number)
    {
        this._maximumHappyness = k;
    }

    public set _Str_2985(k: number)
    {
        this._Str_3973 = k;
    }

    public set _Str_5114(k: boolean)
    {
        this._Str_11149 = k;
    }

    public set respect(k: number)
    {
        this._respect = k;
    }

    public set age(k: number)
    {
        this._age = k;
    }

    public set saddle(k: boolean)
    {
        this._saddle = k;
    }

    public set rider(k: boolean)
    {
        this._rider = k;
    }

    public set breedable(k: boolean)
    {
        this._breedable = k;
    }

    public set _Str_3307(k: string[])
    {
        this._Str_4460 = k;
    }

    public set publiclyRideable(k: number)
    {
        this._publiclyRideable = k;
    }

    public set fullyGrown(k: boolean)
    {
        this._fullyGrown = k;
    }

    public set dead(k: boolean)
    {
        this._dead = k;
    }

    public set rarityLevel(k: number)
    {
        this._rarityLevel = k;
    }

    public get maximumTimeToLive(): number
    {
        return this._maximumTimeToLive;
    }

    public set maximumTimeToLive(k: number)
    {
        this._maximumTimeToLive = k;
    }

    public get remainingTimeToLive(): number
    {
        return this._remainingTimeToLive;
    }

    public set remainingTimeToLive(k: number)
    {
        this._remainingTimeToLive = k;
    }

    public get remainingGrowTime(): number
    {
        return this._remainingGrowTime;
    }

    public set remainingGrowTime(k: number)
    {
        this._remainingGrowTime = k;
    }

    public get publiclyBreedable(): boolean
    {
        return this._publiclyBreedable;
    }

    public set publiclyBreedable(k: boolean)
    {
        this._publiclyBreedable = k;
    }
}