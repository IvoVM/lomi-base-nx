import { moduleMetadata } from "@storybook/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterModule, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ENVIRONMENT_INITIALIZER, inject } from "@angular/core";

const globalModuleImports = moduleMetadata({
    imports: [RouterTestingModule, RouterModule, HttpClientModule],
    providers: [Router],
  });
  
  
  const setRoutesMetadata = (fn, c) => {
    const story = fn();
    story.moduleMetadata.providers.push(
      {
        provide: ENVIRONMENT_INITIALIZER, multi: true, useValue() {
          inject(Router).resetConfig(c.parameters?.routes || [
            { 
                path: '', 
                children: [],
                pathMatch: 'full',
                data: {
                    navData: {
                        title: 'Pedidos',
                    }
                }
            },
            { 
                path: 'home', 
                pathMatch: 'full' ,
                children: [],
                data:{
                    navData: {
                        title: 'Historial de pedidos',
                    }
                }
            
            },
            {
                path: 'home/:id',
                pathMatch: 'full',
                children: [],
                data:{
                    navData: {
                        title: 'Detalle de pedido',
                    }
                }
            }
          ])
        }
      }
    )
    return story;
  }
  
  export const decorators = [
    globalModuleImports,
    setRoutesMetadata
  ];
  