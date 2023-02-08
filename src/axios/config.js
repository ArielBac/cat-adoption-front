import axios from "axios"

const catAdoptionFetch = axios.create({
    baseURL: "https://localhost:7218"
})

export default catAdoptionFetch