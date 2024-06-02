export class Solicitud {
    constructor(
        public idSolicitud: number = 0,
        public parqueo: string = "",
        public usuarioSolicitud: string = "",
        public fechaSolicitud: Date = new Date(),
        public fechaEntregado: Date | null = null,
        public entregado: boolean = false
    ) { }
}