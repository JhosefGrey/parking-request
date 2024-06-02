export interface CasaVista {
    _id: string;
    codigo: string;
    direccion: string;
    bloqueId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CasaCrear {
    codigo: string;
    direccion: string;
    bloqueId: string;
}

export interface CasaEditar {
    idCasa: string;
    codigo: string;
    direccion: string;
    bloqueId: string;
}
