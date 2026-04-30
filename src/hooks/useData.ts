import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

export interface Medicamento {
    id: number
    nombre: string
    descripcion: string
    precio: number | string
    stock: number | string
    tipo: string
}

function useData() {
    const [datos, setDatos] = useState<Medicamento[]>([])

    const traer = async () => {
        const { data } = await supabase.from("medicamentos").select("*")
        if (data) {
            setDatos(data)
        }
    }

    const insertar = async (nombre: string, descripcion: string, precio: string, stock: string, tipo: string) => {
        try {
            const { error } = await supabase.from("medicamentos").insert([{ nombre, descripcion, precio, stock, tipo }])
            if (error) {
                console.log(error)
            }
            await traer()
        }
        catch (error) {
            console.log(error)
        }
    }

    const actualizar = async (id: number, nombre: string, descripcion: string, precio: string, stock: string, tipo: string) => {
        try {
            const { error } = await supabase.from("medicamentos").update({ nombre, descripcion, precio, stock, tipo }).eq("id", id)
            if (error) {
                console.log(error)
            }
            await traer()
        }
        catch (error) {
            console.log(error)
        }
    }

    const eliminar = async (id: number) => {
        const confirmar = confirm("¿Estas seguro de que quieres eliminar este registro?")
        if (!confirmar) {
            return
        }
        try {
            const { error } = await supabase.from("medicamentos").delete().eq("id", id)
            if (error) {
                console.log(error)
            }
            await traer()
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        supabase.from("medicamentos").select("*").then(({ data }) => {
            if (data) setDatos(data)
        })
    }, [])

    return {
        datos,
        insertar,
        actualizar,
        eliminar
    }
}

export default useData
