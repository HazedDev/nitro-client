import { RoomWidgetPetInfostandUpdateEvent } from '../../events/RoomWidgetPetInfostandUpdateEvent';

export class InfoStandPetData 
{
    private _level: number;
    private _levelMax: number;
    private _experience: number;
    private _experienceMax: number;
    private _energy: number;
    private _energyMax: number;
    private _nutrition: number;
    private _nutritionMax: number;
    private _petRespect: number;
    private _name: string = "";
    private _petId: number = -1;
    private _type: number;
    private _race: number;
    private _image: PIXI.Texture;
    private _isOwnPet: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _canRemovePet: boolean;
    private _roomIndex: number;
    private _age: number;
    private _breedId: number;
    private _skillTresholds: string[];
    private _accessRights: number;
    private _rarityLevel: number;
    private _hasBreedingPermission: boolean;
    private _maxWellBeingSeconds: number;
    private _remainingWellBeingSeconds: number;
    private _remainingGrowingSeconds: number;

    public get name(): string
    {
        return this._name;
    }

    public get id(): number
    {
        return this._petId;
    }

    public get type(): number
    {
        return this._type;
    }

    public get race(): number
    {
        return this._race;
    }

    public get image(): PIXI.Texture
    {
        return this._image;
    }

    public get _Str_5175(): boolean
    {
        return this._isOwnPet;
    }

    public get _Str_2481(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get _Str_5114(): boolean
    {
        return this._canRemovePet;
    }

    public get age(): number
    {
        return this._age;
    }

    public get unknownRarityLevel(): number
    {
        return this._breedId;
    }

    public get _Str_3307(): string[]
    {
        return this._skillTresholds;
    }

    public get publiclyRideable(): number
    {
        return this._accessRights;
    }

    public get level(): number
    {
        return this._level;
    }

    public get _Str_4276(): number
    {
        return this._levelMax;
    }

    public get experience(): number
    {
        return this._experience;
    }

    public get _Str_4095(): number
    {
        return this._experienceMax;
    }

    public get energy(): number
    {
        return this._energy;
    }

    public get _Str_3966(): number
    {
        return this._energyMax;
    }

    public get happyness(): number
    {
        return this._nutrition;
    }

    public get _Str_4448(): number
    {
        return this._nutritionMax;
    }

    public get _Str_6943(): number
    {
        return this._petRespect;
    }

    public get _Str_2707(): number
    {
        return this._roomIndex;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public get maximumTimeToLive(): number
    {
        return this._maxWellBeingSeconds;
    }

    public get remainingTimeToLive(): number
    {
        return this._remainingWellBeingSeconds;
    }

    public get remainingGrowTime(): number
    {
        return this._remainingGrowingSeconds;
    }

    public get publiclyBreedable(): boolean
    {
        return this._hasBreedingPermission;
    }

    public populate(k: RoomWidgetPetInfostandUpdateEvent): void
    {
        this._name = k.name;
        this._petId = k.id;
        this._type = k._Str_4355;
        this._race = k._Str_14767;
        this._image = k.image;
        this._isOwnPet = k._Str_5175;
        this._ownerId = k.ownerId;
        this._ownerName = k.ownerName;
        this._canRemovePet = k._Str_5114;
        this._level = k.level;
        this._levelMax = k.maximumLevel;
        this._experience = k.experience;
        this._experienceMax = k.levelExperienceGoal;
        this._energy = k.energy;
        this._energyMax = k.maximumEnergy;
        this._nutrition = k.happyness;
        this._nutritionMax = k.maximumHappyness;
        this._petRespect = k.respect;
        this._roomIndex = k._Str_2707;
        this._age = k.age;
        this._breedId = k.unknownRarityLevel;
        this._skillTresholds = k._Str_3307;
        this._accessRights = k.publiclyRideable;
        this._maxWellBeingSeconds = k.maximumTimeToLive;
        this._remainingWellBeingSeconds = k.remainingTimeToLive;
        this._remainingGrowingSeconds = k.remainingGrowTime;
        this._rarityLevel = k.rarityLevel;
        this._hasBreedingPermission = k.publiclyBreedable;
    }
}