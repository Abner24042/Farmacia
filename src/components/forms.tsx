import { useState } from "react"
import type { FormEvent } from "react"
import "./forms.css"
import type { Medicamento } from "../hooks/useData"

interface FormularioProps {
    insertar: (nombre: string, descripcion: string, precio: string, stock: string, tipo: string) => void
    actualizar: (id: number, nombre: string, descripcion: string, precio: string, stock: string, tipo: string) => void
    registroEditando: Medicamento | null
    setRegistroEditando: (registro: Medicamento | null) => void
}

function Formulario({ insertar, actualizar, registroEditando, setRegistroEditando }: FormularioProps) {
    const [nombre, setNombre] = useState(registroEditando?.nombre ?? "")
    const [descripcion, setDescripcion] = useState(registroEditando?.descripcion ?? "")
    const [precio, setPrecio] = useState(registroEditando ? String(registroEditando.precio) : "")
    const [stock, setStock] = useState(registroEditando ? String(registroEditando.stock) : "")
    const [tipo, setTipo] = useState(registroEditando?.tipo ?? "")

    const manejarSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (registroEditando) {
            actualizar(registroEditando.id, nombre, descripcion, precio, stock, tipo)
            setRegistroEditando(null)
        } else {
            insertar(nombre, descripcion, precio, stock, tipo)
        }

        setNombre('')
        setDescripcion('')
        setPrecio('')
        setStock('')
        setTipo('')
    }

    const cancelarEdicion = () => {
        setRegistroEditando(null)
    }

    return (
        <div>
            <form className="mi-formulario" onSubmit={manejarSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="tel" placeholder="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input type="number" placeholder="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <input type="number" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                <input type="text" placeholder="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                <button type="submit">
                    {registroEditando ? "Guardar Cambios" : "Guardar"}
                </button>
                {registroEditando && (
                    <button type="button" onClick={cancelarEdicion}>Cancelar</button>
                )}
            </form>
        </div>
    )
}

export default Formulario
