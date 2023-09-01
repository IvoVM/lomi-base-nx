import { ComponentRef, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalsService{
    public currentComponent$ = new Subject<{
        component:ComponentRef<any>,
        data:any
    } | null>();

    openModal(component:ComponentRef<any>, data:any){
        this.currentComponent$.next({
            component,
            data: data
        });
    }

    dissmissModal(){
        this.currentComponent$.next(null);
    }

    constructor(){}
}