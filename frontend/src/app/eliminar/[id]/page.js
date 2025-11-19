import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function EliminarCoctel({ params }) {
    const router = useRouter()
    const { id } = params

    useEffect(() => {
        const eliminarCoctel = async () => {
            if (!id) return

            const confirmar = window.confirm('¿Estás seguro de eliminar este cóctel?')
            
            if (confirmar) {
                try {
                    const response = await fetch(`http://localhost:4000/cocteles/${id}`, {
                        method: 'DELETE',
                    })

                    if (response.ok) {
                        alert('Cóctel eliminado exitosamente')
                        router.push('/')
                    } else {
                        alert('Error al eliminar el cóctel')
                        router.push('/')
                    }
                } catch (error) {
                    console.error('Error:', error)
                    alert('Error de conexión')
                    router.push('/')
                }
            } else {
                router.push('/')
            }
        }

        eliminarCoctel()
    }, [id, router])

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Eliminando cóctel...</p>
        </div>
    )
}