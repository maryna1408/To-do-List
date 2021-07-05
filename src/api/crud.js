import axios from "axios"
const port = '3004'
const BASE_URL = `http://localhost:${port}/`

const crud = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
});

//READ
export async function fetchById(path, id) {
    const {data} = await crud.get(`${path}/${id}`)
    return data
}
export async function fetchByPath(path) {
    const {data} = await crud.get(`${path}`)
    return data
}

//CREATE
export async function fetchAdd(path, newData) {
    const {data} = await crud.post(`${path}`, newData)
    return data
}

//DELETE
export async function fetchRemove(path, id) {
    const {data} 
}