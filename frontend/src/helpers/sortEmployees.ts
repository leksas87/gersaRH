//import React from 'react'

import { iEmpleado } from '../actions/usersActions/usersActionTypes';


export const sortEmployees = (
    empleados:iEmpleado[],
    tipo: number,
    bandera: boolean
    ) => {
        switch (tipo) {
            case 1:
                if(bandera){
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.firstName.toLocaleLowerCase();
                        const segundo = b.firstName.toLocaleLowerCase();
                        if(primero < segundo){
                            return -1;
                        }
                        if(primero > segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                else{
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.firstName.toLocaleLowerCase();
                        const segundo = b.firstName.toLocaleLowerCase();
                        if(primero > segundo){
                            return -1;
                        }
                        if(primero < segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                
                break;
            case 2:
                if(bandera){
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.lastName.toLocaleLowerCase();
                        const segundo = b.lastName.toLocaleLowerCase();
                        if(primero < segundo){
                            return -1;
                        }
                        if(primero > segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                else{
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.lastName.toLocaleLowerCase();
                        const segundo = b.lastName.toLocaleLowerCase();
                        if(primero > segundo){
                            return -1;
                        }
                        if(primero < segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                break;

            case 3:
                if(bandera){
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.username.toLocaleLowerCase();
                        const segundo = b.username.toLocaleLowerCase();
                        if(primero < segundo){
                            return -1;
                        }
                        if(primero > segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                else{
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.username.toLocaleLowerCase();
                        const segundo = b.username.toLocaleLowerCase();
                        if(primero > segundo){
                            return -1;
                        }
                        if(primero < segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                
                break;
            case 4:
                if(bandera){
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.phone.toLocaleLowerCase();
                        const segundo = b.phone.toLocaleLowerCase();
                        if(primero < segundo){
                            return -1;
                        }
                        if(primero > segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                else{
                    empleados.sort(( a, b ) => 
                    { 
                        const primero = a.phone.toLocaleLowerCase();
                        const segundo = b.phone.toLocaleLowerCase();
                        if(primero > segundo){
                            return -1;
                        }
                        if(primero < segundo){
                            return 1;
                        }
                        return 0
                    });
                }
                
                break;
            default:
                break;
        }
}
