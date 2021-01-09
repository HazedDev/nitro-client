import { IFurnitureDimension } from './IFurnitureDimension';

export interface IFurnitureData
{
    type: string

    id: number

    fullName: string

    className: string

    colorId: number

    name: string

    description: string

    furniLine: string

    colors: number[]

    dimensions: IFurnitureDimension

    canStandOn: boolean

    canSitOn: boolean

    canLayOn: boolean

    offerId: number

    adUrl: string

    excludeDynamic: boolean

    specialType: number

    customParams: string
}