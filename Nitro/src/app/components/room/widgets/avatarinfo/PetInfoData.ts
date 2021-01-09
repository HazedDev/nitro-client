import { RoomWidgetPetInfostandUpdateEvent } from '../events/RoomWidgetPetInfostandUpdateEvent';

export class PetInfoData 
{
    public age: number = 0;
    public rarityLevel: number = 0;
    public _Str_5114: boolean = false;
    public energy: number = 0;
    public maximumEnergy: number = 0;
    public experience: number = 0;
    public levelExperienceGoal: number = 0;
    public id: number = 0;
    public _Str_5175: boolean = false;
    public level: number = 0;
    public maximumLevel: number = 0;
    public name: string = "";
    public happyness: number = 0;
    public maximumHappyness: number = 0;
    public ownerId: number = 0;
    public ownerName: string = "";
    public _Str_14767: number = 0;
    public respect: number = 0;
    public _Str_2985: number = 0;
    public _Str_4355: number = 0;
    public saddle: boolean = false;
    public rider: boolean = false;
    public breedable: boolean = false;
    public fullyGrown: boolean = false;
    public dead: boolean = false;
    public _Str_3307: string[];
    public publiclyRideable: number = 0;
    public maximumTimeToLive: number = 0;
    public remainingTimeToLive: number = 0;
    public remainingGrowTime: number = 0;
    public publiclyBreedable: boolean = false;

    constructor()
    {
        this._Str_3307 = [];
    }

    public populate(k: RoomWidgetPetInfostandUpdateEvent): void
    {
        this.age = k.age;
        this.rarityLevel = k.rarityLevel;
        this._Str_5114 = k._Str_5114;
        this.energy = k.energy;
        this.maximumEnergy = k.maximumEnergy;
        this.experience = k.experience;
        this.levelExperienceGoal = k.levelExperienceGoal;
        this.id = k.id;
        this._Str_5175 = k._Str_5175;
        this.level = k.level;
        this.maximumLevel = k.maximumLevel;
        this.name = k.name;
        this.happyness = k.happyness;
        this.maximumHappyness = k.maximumHappyness;
        this.ownerId = k.ownerId;
        this.ownerName = k.ownerName;
        this._Str_14767 = k._Str_14767;
        this.respect = k.respect;
        this._Str_2985 = k._Str_2985;
        this._Str_4355 = k._Str_4355;
        this.saddle = k.saddle;
        this.rider = k.rider;
        this.breedable = k.breedable;
        this.dead = k.dead;
        this.fullyGrown = k.fullyGrown;
        this._Str_3307 = k._Str_3307;
        this.publiclyRideable = k.publiclyRideable;
        this.maximumTimeToLive = k.maximumTimeToLive;
        this.remainingTimeToLive = k.remainingTimeToLive;
        this.remainingGrowTime = k.remainingGrowTime;
        this.publiclyBreedable = k.publiclyBreedable;
    }
}