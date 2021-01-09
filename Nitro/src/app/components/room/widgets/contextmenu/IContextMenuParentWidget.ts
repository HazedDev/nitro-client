import { ComponentRef } from "@angular/core";
import { ContextInfoView } from "./ContextInfoView";

export interface IContextMenuParentWidget {
    messageListener: any;
    removeView(componentRef: ComponentRef<ContextInfoView>, arg1: boolean): void;
}