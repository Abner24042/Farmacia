import { useState, useEffect } from "react"
import "./forms.css"

function Formulario({ insertar, actualizar, registroEditando, setRegistroEditando }) {
    const [nombre, setNombre] = useState(registroEditando ? registroEditando.nombre : "")
    const [descripcion, setDescripcion] = useState(registroEditando ? registroEditando.descripcion : "")
    const [precio, setPrecio] = useState(registroEditando ? registroEditando.precio : "")
    const [stock, setStock] = useState(registroEditando ? registroEditando.stock : "")
    const [tipo, setTipo] = useState(registroEditando ? registroEditando.tipo : "")

    useEffect(() => {
        setNombre(registroEditando ? registroEditando.nombre : "")
        setDescripcion(registroEditando ? registroEditando.descripcion : "")
        setPrecio(registroEditando ? registroEditando.precio : "")
        setStock(registroEditando ? registroEditando.stock : "")
        setTipo(registroEditando ? registroEditando.tipo : "")
    }, [registroEditando])

    const manejarSubmit = (e) => {
        e.preventDefault()

        if (registroEditando) {
            // Si estamos editando, usamos la función actualizar
            actualizar(registroEditando.id, nombre, descripcion, precio, stock, tipo)
            setRegistroEditando(null) // Quitamos el modo edición
        } else {
            // Si no estamos editando, es un registro nuevo
            insertar(nombre, descripcion, precio, stock, tipo)
        }

        // Limpiamos los inputs
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setStock('')
        setTipo('')
    }

    const cancelarEdicion = () => {
        setRegistroEditando(null)
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setStock('')
        setTipo('')
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
