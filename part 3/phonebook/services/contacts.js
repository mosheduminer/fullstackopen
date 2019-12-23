import axios from 'axios'


const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => {
        return response.data
    })
}

const add = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => {
        return response
    })
}

const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(
        response => {
            console.log(response)
        }
    )
}

const updateOne = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, {...newPerson})
}

export default { getAll, add, deleteOne, updateOne }