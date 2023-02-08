import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import catAdoptionFetch from '../axios/config'

const Home = () => {
    // resgatar dados de gatos em uma variavel
    const [cats, setCats] = useState([])
    const getCats = async () => {
        try {
            const response = await catAdoptionFetch.get("/cat")
            const data = response.data

            setCats(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCats()
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Gatinhos cadastrados
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Peso (Kg)</th>
                                <th scope="col">Raça</th>
                                <th scope="col">Cor</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cats.map((cat) => (
                                    <tr key={cat.id}>
                                        <th scope="row">{cat.name}</th>
                                        <td>{cat.age}</td>
                                        <td>{cat.weight}</td>
                                        <td>{cat.breed}</td>
                                        <td>{cat.color}</td>
                                        <td>
                                            <button className="btn btn-warning me-2">Editar</button>
                                            <button className="btn btn-danger">Remover</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home