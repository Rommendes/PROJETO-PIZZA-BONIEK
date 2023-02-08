let carrinho =[];
let modalQt = 1;
let modalkey = 0;//sabemos qual é a pizza
const c = (elementos) => document.querySelector(elementos);
const cs = (elementos) => document.querySelectorAll(elementos);

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item' ).cloneNode(true);

//AQUI É INSERIDA A CHAVE ESPECIFICA PARA CADA PIZZA 
        pizzaItem.setAttribute('data-key', index);

        pizzaItem.querySelector('.pizza-item--img img').src = item.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)} `;
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
        pizzaItem.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault();
//agora vamos abrir o MODAL ---- 
            modalQt = 1;
            
            let key = e.target.closest('.pizza-item').getAttribute('data-key');//CLOSEST QUER DIZER ACHE O ELEMENTO + PROXIMO apartir do a que é o link
            modalkey = key;
//AO CLICARMOS PRECISAMOS DESTA INFORMaÇÕES ABAIXO que são:

//LISTAGEM DAS PIZZAS  
 
            c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
            c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
            c('.pizzaBig img').src = pizzaJson[key].img;
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)} `;
            
//É NECESSÁRIO REMOVER A SELEÇÃO, POIS NORMALMENTE A ÚLTIMA DO CARRINHO FICA SELECIONADA => DESCELECIONEI
            c('.pizzaInfo--size.selected').classList.remove('selected');

// "forEach"faz percorrer cada um dos itens dos quereySelectorall = cs
            cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
           //variavel para acionar a classList e add -> adicionar a classe ('selected')
                if(sizeIndex == 2){
                    size.classList.add('selected');
                }
                size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
                 });

            c('.pizzaInfo--qt').innerHTML = modalQt;

            c('.pizzaWindowArea').style.opacity = 0;

            c('.pizzaWindowArea').style.display = 'flex';
                setTimeout(()=>{
                }, 200);

            c('.pizzaWindowArea').style.opacity = 1;
        })
        

        c('.pizza-area').append(pizzaItem);
})

//EVENTOS DO MODAL
function closeModal (){//fechar o modal
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
       c('.pizzaWindowArea').style.display = 'none'
    }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

//IREMOS SELECIONAR OS TAMANHOS -> sempre será necessário remover 0 item selecionado para acrescentar outro
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })    
});
//ADICIONAR AO CARRINHO
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //INFORMAÇÕES PARA ADICIONAR: qual a pizza?(modalkey) tamanho? quantas?
    console.log('Pizza: ' + modalkey)

})