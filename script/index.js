
let main = document.querySelector("main")
let ulCard = document.querySelector("#cards")

let ulCart = document.querySelector(".cart-empty")
let ul = document.createElement("ul")
ul.id = "UlCart"
ulCart.appendChild(ul)

let productCount = 0
let productValue = 0
let total = 0 
if (total == 0) {
    document.querySelector(".cart-details").style.display = 'none'
}
function CreateProductCard(dataBase) {
    document.querySelector("#btnAll").style.color = '#ff0000'

    ulCard.innerHTML = ""
    for (let i = 0; i < dataBase.length; i++) {
        let shopping = dataBase[i]

        let li = document.createElement("li")
        let img = document.createElement("img")
        let name = document.createElement("h2")
        let description = document.createElement("p")
        let values = document.createElement("p")
        let btn = document.createElement("button")
    
        li.id = `p_${shopping.id}`
        li.className = "li"
        img.src = shopping.img
        img.className = "image"
        name.innerHTML = `${shopping.nameItem}`
        name.className = "name"
        description.innerHTML = `${shopping.description}`
        description.className = "descriptions"
        values.innerHTML = `R$ ${shopping.value}`
        values.className = "values"
        btn.innerHTML = `${shopping.addCart}`
        btn.id = `p_${shopping.id}`
        btn.className = "btn"


        btn.addEventListener('click', function(e){
            productCount++;
            let idElement = e.target.id
            let id = parseInt(idElement.substring(2))

 
            let product = SearchProducts(id)
            let elementCart = createCartCard(product)
            document.querySelector(".cart-details").style.display = 'flex'
            document.querySelector(".empty").style.display = 'none'
            document.querySelector("#count").innerHTML = `${productCount}`

            document.querySelector("#UlCart").appendChild(elementCart)

            productValue = product.value
            
            total += productValue
            
            document.querySelector("#countValue").innerHTML = `R$${total},00`
        })
    
        li.appendChild(img)
    
        for (let j = 0; j < shopping.tag.length; j++) {
            let tag = document.createElement("li")
            tag.innerText = shopping.tag[j]
            tag.className = "tag"
            li.appendChild(tag)
        }
    
        li.appendChild(name)
        li.appendChild(description)
        li.appendChild(values)
        li.appendChild(btn)
    
        ulCard.appendChild(li); 
    
    } 
}

function SearchProducts(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i]
        }
        
    }
}

function createCartCard(Cart) {
    let li = document.createElement("li")
    let img = document.createElement("img")
    let name = document.createElement("h2")
    let values = document.createElement("p")
    let btn = document.createElement("button")

    li.id = `l_${Cart.id}`
    li.className = "liCart"
    img.src = Cart.img
    img.className = "imageCart"
    name.innerHTML = `${Cart.nameItem}`
    name.className = "nameCart"
    values.innerHTML = `R$ ${Cart.value}`
    values.className = "valuesCart"
    btn.innerHTML = 'Remover Produto'
    btn.id = `cart  _${Cart.id}`
    btn.className = "btnCart"

    btn.addEventListener('click', function(event){
        productCount--;
        let listPath = event.composedPath();
        console.log(listPath)
        listPath[1].remove();
        document.querySelector("#count").innerHTML = `${productCount}`

        if (productCount == 0) {
            document.querySelector(".empty").style.display = 'flex'
        }

        total = total -= productValue       
        document.querySelector("#countValue").innerHTML = `R$${total},00`

        if (total == -150) {
            total = 0
            document.querySelector("#countValue").innerHTML = `R$${total},00`
        }else if (total == 150) {
            total = 0
            document.querySelector("#countValue").innerHTML = `R$${total},00`
        }
        
        if (total == 0) {
            document.querySelector(".cart-details").style.display = 'none'
        }
    })

    li.appendChild(img)
    li.appendChild(name)
    li.appendChild(values)
    li.appendChild(btn)

    return li
}

function FilterProductsShirt(list) {
    let arrTemp = []

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].tag.length; j++) {
            if (list[i].tag[j] == "Camisetas") {
                arrTemp.push(list[i])
            }
            
        }
        
    }

    return arrTemp
}

function filterAccessory(list) {
    let arrTemp = []

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].tag.length; j++) {
            if (list[i].tag[j] == "Acessórios") {
                arrTemp.push(list[i])
            }
            
        }
        
    }

    return arrTemp

}

let btnSearch = document.querySelector(".search-button")
let inputSearch = document.querySelector(".main-cards")

function search(list) {
    let input = document.querySelector(".search-input")
    let expression = input.value.toLowerCase()
    let temp = []

    for (let i = 0; i < list.length; i++) {
        if (list[i].nameItem.toLowerCase() === expression) {
            temp.push(list[i])
        }
    }

    return temp
}

btnSearch.addEventListener('click', function(){

    let filter = search(data)
    CreateProductCard(filter)

})

CreateProductCard(data)

document.querySelector("#btnAll").addEventListener('click', function(e){
    CreateProductCard(data)
    document.querySelector("#btnAll").style.color = '#ff0000'
    document.querySelector("#btnAccessory").style.color = ''
    document.querySelector("#btnShirt").style.color = ''
})

document.querySelector("#btnAccessory").addEventListener('click', function(e){
    let filter = filterAccessory(data)
    CreateProductCard(filter)
    console.log(filterAccessory(data))
    document.querySelector("#btnAccessory").style.color = '#ff0000'
    document.querySelector("#btnAll").style.color = ''
    document.querySelector("#btnShirt").style.color = ''
})

document.querySelector("#btnShirt").addEventListener('click', function(e){
    let filter = FilterProductsShirt(data)
    CreateProductCard(filter)
    document.querySelector("#btnShirt").style.color = '#ff0000' 
    document.querySelector("#btnAll").style.color = '' 
    document.querySelector("#btnAccessory").style.color = ''
})

