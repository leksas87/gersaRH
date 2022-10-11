import { iEmpleado } from '../actions/usersActions/usersActionTypes';


export const sortEmployees = (
    empleados:iEmpleado[],
    tipo: string,
    isAscending: boolean
    ) => {
        switch (tipo) {
            case "Nombre":
                if(isAscending){
                    console.log(isAscending);
                    
                    empleados.sort(( a:any, b:any ) => 
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
                    console.log(isAscending)
                    empleados.sort(( a:any, b:any ) => 
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
            case "Apellidos":
                if(isAscending){
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

            case "Correo":
                if(isAscending){
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
            case "Telefono":
                if(isAscending){
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
