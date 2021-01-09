import { AssetManager } from './asset/AssetManager';
import { IAssetManager } from './asset/IAssetManager';
import { Disposable } from './common/disposable/Disposable';
import { CommunicationManager } from './communication/CommunicationManager';
import { ICommunicationManager } from './communication/ICommunicationManager';
import { INitroCore } from './INitroCore';

export class NitroCore extends Disposable implements INitroCore
{
    private _asset: IAssetManager;
    private _communication: ICommunicationManager;

    constructor()
    {
        super();

        window.console.log.apply(console, [
            `\n %c Nitro HTML5 v0.0.1 %c https://discord.gg/D2rPMAf %c\n`,
            'color: #FFFFFF; background: #000000; padding:5px 0;',
            'color: #000000; background: #FFFFFF; padding:5px 0;',
            'background: #000000; padding:5px 0;' ]);

        this._asset         = new AssetManager();
        this._communication = new CommunicationManager();
    }

    protected onDispose(): void
    {
        if(this._asset)
        {
            this._asset.dispose();

            this._asset = null;
        }

        if(this._communication)
        {
            this._communication.dispose();

            this._communication = null;
        }
    }

    public get asset(): IAssetManager
    {
        return this._asset;
    }

    public get communication(): ICommunicationManager
    {
        return this._communication;
    }
}