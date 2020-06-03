function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}


populateUFs()


function getCities(event) {
    const citiesSelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")
    citiesSelect.innerHTML = `<option value="0">Selecione a cidade</option>`

    const ufValue = (event.target.value)

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (city of cities) {
                citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citiesSelect.disabled = false
        })

}



document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)



//itens de coleta
//pegar todos os li's
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
        //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim
    //pegar itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item === itemId
            //isso será true ou fause
        return itemFound
    })
    if (alreadySelected >= 0) {
        //tirar da seleçãoconst 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiffrent = item != itemId //false
            return itemIsDiffrent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }

}

//se já estiver selecionado, tirar da seleção
//se não estiver selecionado, adicionar à seleção
//atualizar o campo escondido com os dados/itens selecionados