import Forms from './components/forms'
import TableList from './components/TableList'
import useData from './hooks/useData'
import { useState } from 'react'

export default function App() {
    const { datos, insertar, actualizar, eliminar } = useData()
    const [registroEditando, setRegistroEditando] = useState(null)

    return (
        <div>
            <Forms
                insertar={insertar}
                actualizar={actualizar}
                registroEditando={registroEditando}
                setRegistroEditando={setRegistroEditando} />
            <TableList
                items={datos}
                actualizar={(item) => setRegistroEditando(item)}
                eliminar={eliminar}
            />
        </div>
    )
}