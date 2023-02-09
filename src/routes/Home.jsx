import { useState, useEffect } from 'react'
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

    // para cadastrar um novo gato
    const [name, setName] = useState([])
    const [age, setAge] = useState([])
    const [weight, setWeight] = useState([])
    const [breed, setBreed] = useState([])
    const [gender, setGender] = useState([])
    const [color, setColor] = useState([])

    const createCat = async (e) => {
        // e.preventDefault()

        const cat = { name, age, weight, breed, gender, color }
        const catJson = JSON.stringify(cat)

        await catAdoptionFetch.post("/cat", catJson)
    }

    useEffect(() => {
        getCats()
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        Gatinhos cadastrados
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewCatModal">
                            Novo gatinho
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Peso (Kg)</th>
                                <th scope="col">Raça</th>
                                <th scope="col">Gênero</th>
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
                                        <td>{cat.gender}</td>
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

            <div className="modal fade" id="addNewCatModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cadastrar novo gatinho</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="newCatForm" onSubmit={(e) => createCat(e)}>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Nome</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" aria-describedby="nameHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ageInput" className="form-label">Idade</label>
                                    <input onChange={(e) => setAge(e.target.value)} type="number" className="form-control" id="ageInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="weightInput" className="form-label">Peso</label>
                                    <input onChange={(e) => setWeight(e.target.value)} type="number" className="form-control" id="weightInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="breedInput" className="form-label">Raça</label>
                                    <input onChange={(e) => setBreed(e.target.value)} type="text" className="form-control" id="breedInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genderInput" className="form-label">Gênero</label>
                                    <input onChange={(e) => setGender(e.target.value)} type="text" className="form-control" id="genderInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="colorInput" className="form-label">Cor</label>
                                    <input onChange={(e) => setColor(e.target.value)} type="text" className="form-control" id="colorInput" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button form="newCatForm" className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home