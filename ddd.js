import { getFetchData, removeLetras } from "./utils.js"

const dddForm = document.getElementById("dddForm")
const dddInput = document.getElementById("ddd")
const citiesContainer = document.getElementById("citiesContainer")
const cacheFetchDDD = {}

const getUrlDDD = ddd => `https://brasilapi.com.br/api/ddd/v1/${ddd}`

async function montaListaDDD(ddd) {
    let data
    if (!cacheFetchDDD[ddd]) {
        try {
            data = await getFetchData(getUrlDDD(ddd))
            cacheFetchDDD[ddd] = data
        } catch (error) {
            alert(error.message)
            dddInput.value = ""
            citiesContainer.style.display = "none"
            citiesContainer.innerHTML = ""
            return
        }
    } else {
        data = cacheFetchDDD[ddd]
    }

    showDataDDD(data)
}

function showDataDDD(data) {
    const { cities, state } = data;

    citiesContainer.style.display = "block"
    citiesContainer.innerHTML = `
        <h4>Estado: <b>${state}</b></h4>
        <ul>${cities.map(c => `<li>${c}</li>`).join('')}</ul>`
}

dddInput.addEventListener("keyup", () => dddInput.value = removeLetras(dddInput.value))

dddForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (!dddInput.value) return

    montaListaDDD(dddInput.value)
})

montaListaDDD(53)