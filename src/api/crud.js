import axios from "axios"
const port = '3004'
const BASE_URL = `http://localhost:${port}`

const crud = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
});

crud.interceptors.response.use(function (res) {
    return [res.data, null];
}, function (error) {
    return [null, error]
});

//READ
export async function getTodo(id) {
    return await crud.get(`/todos/${id}`)
}
export async function getTodos() {
    return await crud.get(`/todos`)
}
//CREATE
export async function addTodo(todoData) {
    return await crud.post(`/todos`, todoData)
}
//DELETE
export async function deleteTodo(id) {
    return await crud.delete(`/todos/${id}`)
}
//UPDATE
export async function updateTodo(id, todoData) {
    return await crud.patch(`/todos/${id}`, todoData)
}