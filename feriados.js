import { getFetchData, removeLetras } from "./utils.js";

const feriadosForm = document.getElementById("feriadosForm")
const listaFeriadosAno = document.getElementById("listaFeriadosAno")
const anoInput = document.getElementById("ano")

const getUrlFeriados = ano => `https://brasilapi.com.br/api/feriados/v1/${ano}`

function montaListaFeriados(listaFeriados) {
    if (listaFeriados.length < 1) return "Nenhum feriado"

    return `
    <table>
        <thead><tr><td><b>Nome</b></td><td><b>Data</b></td></tr></thead>
        <tbody>
            ${listaFeriados.map(feriado => `
                <tr><td>${feriado.name}</td><td>${(new Date(feriado.date + "T00:00:00")).toLocaleDateString()}</td></tr>`
    ).join('')}
        </tbody>
    </table>`

}

async function mostraFeriados(ano) {
    try {
        const dados = await getFetchData(getUrlFeriados(ano))
        listaFeriadosAno.innerHTML = montaListaFeriados(dados)
        listaFeriadosAno.style.display = "block"
    } catch (error) {
        alert(error.message)
        anoInput.value = ""
        listaFeriadosAno.style.display = "none"
        listaFeriadosAno.innerHTML = ""
        return
    }
}

anoInput.addEventListener("keyup", () => anoInput.value = removeLetras(anoInput.value))
feriadosForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (!anoInput.value) return    

    mostraFeriados(anoInput.value)
})

mostraFeriados(2024)
