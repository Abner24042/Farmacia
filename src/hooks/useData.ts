import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"



function useData() {
    const [datos, setDatos] = useState([])

    const traer = async () => {

        const { data } = await supabase.from("medicamentos").select("*")
        if (data) {
            setDatos(data)
        }
    }
    const insertar = async (nombre, descripcion, precio, stock, tipo) => {
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

    const actualizar = async (id, nombre, descripcion, precio, stock, tipo) => {
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
    const eliminar = async (id) => {
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
        traer()
    }, [])

    return {
        datos,
        insertar,
        actualizar,
        eliminar
    }
}

export default useData