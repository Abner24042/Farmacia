import { useState, useMemo } from "react"
import "./table.css"

export function stockCant(stock: number): string {
    if (stock < 25) return "red"
    if (stock < 45) return "orange"
    return "green"
}

export function precioStock(stock: number, precio: number): string {
    const total = stock * precio
    return total.toFixed(2)
}

interface Props {
    items: {
        id: number,
        nombre: string,
        descripcion: string,
        precio: number,
        stock: number,
        tipo: string
    }[]
    actualizar: (item: any) => void
    eliminar: (id: number) => void
}

function TableList({ items, actualizar, eliminar }: Props) {
    const [categoriaActiva, setCategoriaActiva] = useState<string>('Todos');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const categorias = useMemo(() => {
        const cats = Array.from(new Set(items.map(p => p.tipo)));
        return ['Todos', ...cats];
    }, [items]);

    const productosFiltrados = useMemo(() => {
        let filtrados = items;
        if (categoriaActiva !== 'Todos') {
            filtrados = filtrados.filter(p => p.tipo === categoriaActiva);
        }
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtrados = filtrados.filter(p =>
                p.nombre.toLowerCase().includes(query)
            );
        }
        return [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }, [items, categoriaActiva, searchQuery]);

    if (!items || items.length === 0) {
        return (
            <main className="main-content">
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            </main>
        );
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="filter-bar">
                {categorias.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn${categoriaActiva === cat ? ' active' : ''}`}
                        onClick={() => setCategoriaActiva(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Tipo</th>
                            <th>Valor total de Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(item => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.precio}</td>
                                <td style={{ color: stockCant(item.stock), fontWeight: 900 }}>{item.stock}</td>
                                <td>{item.tipo}</td>
                                <td>${precioStock(item.stock, item.precio)}</td>
                                <td>
                                    <button onClick={() => actualizar(item)}>Editar</button>
                                    <button onClick={() => eliminar(item.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableList
