export interface Marca { id: number; nombre: string; }
export interface Tamano { id: number; volumen: number; }
export interface Sabor { id: number; nombre: string; }
export interface Especialidad { id: number; nombre: string; }
export interface EdicionEspecial { id: number; nombre: string; }
export interface Descripcion { id: number; texto: string; }
export interface Pais { id: number; nombre: string; }
export interface Caja { numeroDeCaja: number; cantidadActual: number; tamañoId: number }

export interface Lata {
    id?: number;
    idMarca: number;
    idTamano: number;
    idSabor: number;
    idEspecialidad: number;
    edicionLimitada: boolean;
    idEdicionEspecial?: number | null;
    idDescripcion?: number | null;
    anio: number;
    idPais: number;
    idCaja: number;
    foto1?: string | null;
    foto2?: string | null;
    foto3?: string | null;
}