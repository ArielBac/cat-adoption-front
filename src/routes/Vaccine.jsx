import { useState, useEffect } from 'react'
import catAdoptionFetch from '../axios/config'
import moment from 'moment/moment'


const Vaccine = () => {
    const [vaccines, setVaccines] = useState([])
    const getVaccines = async () => {
        try {
            const response = await catAdoptionFetch.get("/vaccine")
            const data = response.data

            setVaccines(data)
        } catch (error) {
            console.log(error)
        }
    }

    const [catId, setCatId] = useState("")
    const [applied_at, setAppliedAt] = useState("")
    const [name, setName] = useState(0)
    const [producer, setProducer] = useState("")

    const createVaccine = async (e) => {
        const vaccine = { catId, applied_at, name, producer }
        const vaccineJson = JSON.stringify(vaccine)

        await catAdoptionFetch.post("/vaccine", vaccineJson)
    }

    const [id, setId] = useState(0)
    const editVaccine = (e, id) => {   
         
        const vaccine = vaccines.find(vaccine => vaccine.id == id)

        setId(vaccine.id)
        setName(vaccine.name)
        setAppliedAt(vaccine.applied_at)
        setProducer(vaccine.producer)
    }

    const updateVaccine = async (e) => {  
        const vaccine = { name, applied_at, producer }
        const vaccineJson = JSON.stringify(vaccine)

        console.log(vaccineJson)

        await catAdoptionFetch.put(`/vaccine/${id}`, vaccineJson)
    }

    const deleteVaccine = async (e, id) => {
        const vaccine = vaccines.find(vaccine => vaccine.id == id)

        await catAdoptionFetch.delete(`/vaccine/${vaccine.id}`)

        window.location.reload()
    }

    useEffect(() => {
        getVaccines()
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        Vacinas aplicadas
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewVaccineModal">
                            Nova aplicação
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Vacina (Kg)</th>
                                <th scope="col">Fabricante</th>
                                <th scope="col">Data da aplicação</th>
                                <th scope="col">Gatinho</th>
                                <th scope="col">ID do gatinho</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vaccines.map((vaccine) => (
                                    <tr key={vaccine.id}>
                                        <th scope="row">{vaccine.name}</th>
                                        <td>{vaccine.producer}</td>
                                        <td>{moment(vaccine.applied_at).format('DD/MM/YYYY [às] h:mm a')}</td>
                                        <td>{vaccine.cat.name}</td>
                                        <td>{vaccine.cat.id}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editVaccineModal"
                                                onClick={(e) => editVaccine(e, vaccine.id)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" onClick={(e) => deleteVaccine(e, vaccine.id)}>Remover</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de cadastro de gato */}
            <div className="modal fade" id="addNewVaccineModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cadastrar nova aplicação de vacina</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="newVaccineForm" onSubmit={(e) => createVaccine(e)}>
                                <div className="mb-3">
                                    <label htmlFor="catIdIpunt" className="form-label">ID do Gatinho</label>
                                    <input onChange={(e) => setCatId(e.target.value)} type="number" className="form-control" id="nameInput" aria-describedby="nameHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Nome da Vacina</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" aria-describedby="nameHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="producerInput" className="form-label">Fabricante</label>
                                    <input onChange={(e) => setProducer(e.target.value)} type="text" className="form-control" id="producerInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="applied_atInput" className="form-label">Data da Aplicação</label>
                                    <input onChange={(e) => setAppliedAt(e.target.value)} type="datetime" className="form-control" id="applied_atInput" placeholder="0000-00-00T00:00:00"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button form="newVaccineForm" className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de edição de gato */}
            <div className="modal fade" id="editVaccineModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Vacina</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="editVaccineForm" onSubmit={(e) => updateVaccine(e)}>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Nome da Vacina</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" aria-describedby="nameHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="producerInput" className="form-label">Fabricante</label>
                                    <input value={producer} onChange={(e) => setProducer(e.target.value)} type="text" className="form-control" id="producerInput" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="applied_atInput" className="form-label">Data da Aplicação</label>
                                    <input value={applied_at} onChange={(e) => setAppliedAt(e.target.value)} type="datetime" className="form-control" id="applied_atInput" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button form="editVaccineForm" className="btn btn-primary">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vaccine