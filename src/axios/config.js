import axios from "axios"

const catAdoptionFetch = axios.create({
    baseURL: "https://localhost:7218",
    headers: {
        "Content-Type": "application/json"
    }
})

export default catAdoptionFetch