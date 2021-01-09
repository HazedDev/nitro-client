import { IAssetAnimation, IAssetAnimationLayer, IAssetAnimationSequenceFrame } from '../../../../../core/asset/interfaces/visualization';
import { AnimationFrame } from './AnimationFrame';
import { AnimationLayerData } from './AnimationLayerData';
import { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationData 
{
    private static TRANSITION_TO_ANIMATION_OFFSET: number   = 1000000;
    private static TRANSITION_FROM_ANIMATION_OFFSET: number = 2000000;

    public static DEFAULT_FRAME_NUMBER: number              = 0;

    private _layers: Map<number, AnimationLayerData>;
    private _frameCount: number;
    private _randomStart: boolean;
    private _immediateChanges: number[];

    constructor()
    {
        this._layers            = new Map();
        this._frameCount        = -1;
        this._randomStart       = false;
        this._immediateChanges  = null;
    }

    public static getTransitionToAnimationId(animationId: number): number
    {
        return AnimationData.TRANSITION_TO_ANIMATION_OFFSET + animationId;
    }

    public static getTransitionFromAnimationId(animationId: number): number
    {
        return AnimationData.TRANSITION_FROM_ANIMATION_OFFSET + animationId;
    }

    public static isTransitionToAnimation(animationId: number): boolean
    {
        return (animationId >= AnimationData.TRANSITION_TO_ANIMATION_OFFSET) && (animationId < AnimationData.TRANSITION_FROM_ANIMATION_OFFSET);
    }

    public static isTransitionFromAnimation(animationId: number): boolean
    {
        return animationId >= AnimationData.TRANSITION_FROM_ANIMATION_OFFSET;
    }

    public dispose(): void
    {
        for(let layer of this._layers.values())
        {
            if(!layer) continue;

            layer.dispose();
        }

        this._layers.clear();

        this._immediateChanges = null;
    }

    public setImmediateChanges(k: number[]): void
    {
        this._immediateChanges = k;
    }

    public isImmediateChange(k: number): boolean
    {
        if(!this._immediateChanges || (this._immediateChanges.indexOf(k) === -1)) return false;

        return true;
    }

    public getStartFrame(direction: number): number
    {
        if(!this._randomStart) return 0;
        
        return Math.random() * this._frameCount;
    }

    public initialize(k: IAssetAnimation): boolean
    {
        this._randomStart = false;

        // if (int(k.@randomStart) != 0)
        // {
        //     this._randomStart = true;
        // }

        if(k.layers)
        {
            for(let key in k.layers)
            {
                const layer = k.layers[key];

                if(!layer) return false;

                const animationId = parseInt(key);

                let loopCount   = (layer.loopCount !== undefined) ? layer.loopCount : 1;
                let frameRepeat = (layer.frameRepeat !== undefined) ? layer.frameRepeat : 1;
                let isRandom    = ((layer.random !== undefined) && (layer.random !== 0)) ? true : false;

                if(!this.addLayer(animationId, loopCount, frameRepeat, isRandom, layer)) return false;
            }
        }

        return true;
    }

    private addLayer(animationId: number, loopCount: number, frameRepeat: number, isRandom: boolean, layer: IAssetAnimationLayer): boolean
    {
        const layerData = new AnimationLayerData(loopCount, frameRepeat, isRandom);

        if(layer.frameSequences)
        {
            for(let key in layer.frameSequences)
            {
                const animationSequence = layer.frameSequences[key];

                if(!animationSequence) continue;

                let loopCount        = (animationSequence.loopCount !== undefined) ? animationSequence.loopCount : 1;
                let isSequenceRandom = ((animationSequence.random !== undefined) && (animationSequence.random !== 0)) ? true : false;

                const frame = layerData.addFrameSequence(loopCount, isSequenceRandom);

                if(animationSequence.frames)
                {
                    for(let key in animationSequence.frames)
                    {
                        const animationFrame = animationSequence.frames[key];

                        if(!animationFrame)
                        {
                            layerData.dispose();

                            return false;
                        }

                        frame.addFrame(animationFrame.id, animationFrame.x || 0, animationFrame.y || 0, animationFrame.randomX || 0, animationFrame.randomY || 0, this.readDirectionalOffsets(animationFrame));
                    }
                }

                frame.initialize();
            }
        }
        
        layerData.calculateLength();

        this._layers.set(animationId, layerData);

        const frameCount: number = layerData.frameCount;

        if(frameCount > this._frameCount) this._frameCount = frameCount;

        return true;
    }

    private readDirectionalOffsets(frame: IAssetAnimationSequenceFrame): DirectionalOffsetData
    {
        let directionalOffset: DirectionalOffsetData = null;

        if(frame && frame.offsets)
        {
            for(let directionId in frame.offsets)
            {
                const offset = frame.offsets[directionId];

                if(!offset) continue;

                if(!directionalOffset) directionalOffset = new DirectionalOffsetData();

                directionalOffset.setDirection(offset.direction, offset.x, offset.y);
            }
        }

        return directionalOffset;
    }

    public getFrame(direction: number, layerId: number, frameCount: number): AnimationFrame
    {
        const layer = this._layers.get(layerId);

        if(!layer) return null;
        
        return layer.getFrame(direction, frameCount);
    }

    public getFrameFromSequence(direction: number, layerId: number, sequenceId: number, offset: number, frameCount: number): AnimationFrame
    {
        const layer = this._layers.get(layerId);

        if(!layer) return null;
        
        return layer.getFrameFromSequence(direction, sequenceId, offset, frameCount);
    }
}