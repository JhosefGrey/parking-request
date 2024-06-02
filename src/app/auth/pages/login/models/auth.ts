export class Auth {
    constructor(
        public email: string = '',
        public clave: string = '',
        public tipo: number = 3
    ) { }
}

export interface IToken {
    token: string;
    user:  User;
}

export interface User {
    _id:       string;
    nombre:    string;
    apellido:  string;
    idUsuario: string;
    createdAt: Date;
    updatedAt: Date;
}
