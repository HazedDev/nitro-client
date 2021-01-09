export interface IAssetGesture {
    id: string;
    animationId: number;
}

export interface IAssetPosture {
    id: string;
    animationId: number;
}

export interface IAssetAnimationSequenceFrame {
    offsets: IAssetAnimationSequenceFrame;

}

export interface IAssetAnimation {
    transitionTo: any;
    transitionFrom: any;
    layers: any;
}

export interface IAssetAnimationLayer {
    frameSequences: any;

}

export interface IAssetColor {
    layers: any;

} 

export interface IAssetVisualizationDirection {
    layers: { [index: string]: IAssetVisualizationLayer }

}

export interface IAssetVisualizationLayer {
    ink: any;
    tag: any;
    alpha: number;
    ignoreMouse: boolean;
    x: number;
    y: number;
    z: number;
    
}