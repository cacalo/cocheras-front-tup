import { Estacionamiento } from "./estacionamiento";

export interface Cochera{
    id: number;
    descripcion: string;
    deshabilitada: number;
    eliminada: number;
    estacionamiento: Estacionamiento | undefined;
}