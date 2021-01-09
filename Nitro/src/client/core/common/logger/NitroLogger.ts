import { INitroLogger } from './INitroLogger';

export class NitroLogger implements INitroLogger
{
    private static LAST_TIMESTAMP: number = Date.now();

    private _name: string;
    private _description: string | number;
    private _print: boolean;
    
    constructor(name: string, description: string | number = null)
    {
        this._name          = name;
        this._description   = description;
        this._print         = true;
    }
    
    public log(message: any): void
    {
        this.printMessage(message);
    }
    
    public error(message: any, trace?: any): void
    {
        this.printMessage(trace || message);
    }
    
    public warn(message: any): void
    {
        this.printMessage(message);
    }
    
    public printMessage(message: any): void
    {
        if(!this._print) return;

        NitroLogger.log(message, this._name);
    }

    public static log(message: string, name: string = 'Nitro'): void
    {
        console.log(`[Nitro] ${ new Date().toDateString() } [${ name }] ${ message } ${ this.getTimestamp() }`);
    }

    public static getTimestamp(): string
    {
        const now = Date.now();

        const result = ` +${ now - NitroLogger.LAST_TIMESTAMP || 0 }ms`;
        
        this.LAST_TIMESTAMP = now;

        return result;
    }

    public get description(): string | number
    {
        return this._description;
    }

    public set description(description: string | number)
    {
        this._description = description;
    }

    public get print(): boolean
    {
        return this._print;
    }

    public set print(flag: boolean)
    {
        this._print = flag;
    }
}