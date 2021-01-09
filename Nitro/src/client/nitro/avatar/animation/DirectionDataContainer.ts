export class DirectionDataContainer 
{
    private _offset: number;

    constructor(k: any)
    {
        this._offset = parseInt(k.offset);
    }

    public get offset(): number
    {
        return this._offset;
    }
}