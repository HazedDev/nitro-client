export interface IAssetData {
    aliases: IAssetData;
    dimensions: any;
    maskType: any;
    visualizations: IAssetVisualizationData[];
    name: string;
    assets: any;
    palettes: any;
    directions: any;
    logicType: string;
    visualizationType: string;
	type: string;
	
	spritesheet?: Array<any> | any;
}

export interface IAsset {
    x: any;
    y: any;
    usesPalette: boolean;
    source: string;
    flipH: any;

}

export interface IAssetPalette {
    id: any;
    color1: any;
    color2: any;
    rgb: [number, number, number][];

}

export interface IAssetVisualizationData {
    layerCount: any;
    angle: any;
    size: any;
    
}

export interface IAssetAlias {
    link: string;
    fliph: number;
    flipv: number;

}