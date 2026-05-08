import './App.css'
import Forms from './components/forms'
import TableList from './components/TableList'
import useData from './hooks/useData'
import type { Medicamento } from './hooks/useData'
import { useState } from 'react'

export default function App() {
    const { datos, insertar, actualizar, eliminar } = useData()
    const [registroEditando, setRegistroEditando] = useState<Medicamento | null>(null)

    return (
        <div>
            <Forms
                key={registroEditando?.id ?? 'new'}
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
