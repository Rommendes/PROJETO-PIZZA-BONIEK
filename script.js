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
    //qual é a pizza ->  modalkey -> id
    //tamanho -> size
    //quantas -> modalQt

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')) ;
    
    //JUNTAR OS TAMANHOS com os TIPOS de pizzas --- id + size
    let identificador = pizzaJson[modalkey].id + 'TT' + size;

    //PARA VER SE TEM ÍTEM REPETIDO NO CARRINHO
    let key = carrinho.findIndex((item)=>item.identificador == identificador);

    //se não achou dou o push
    if(key > -1){
    carrinho[key].qt += modalQt
    }else{
        carrinho.push({
        identificador,
        id: pizzaJson[modalkey].id,
        size: size,
        qt: modalQt
    });
    }
    updateCarrinho();
    closeModal();
});

//CARRINHO DE COMPRAS

c('.menu-openner').addEventListener('click', ()=>{
    if(carrinho.length > 0){
        c('aside').style.left = '0';
    };
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});


function updateCarrinho (){
    c('.menu-openner span').innerHTML = carrinho.length;

    if(carrinho.length > 0){
        c('aside').classList.add('show'); //mostra o carrinho
        //A CLASSE SHOW (SIGNIFICA APARECER) ESTÁ DENTRO DO ASIDE 
        c('.cart').innerHTML = '';//Aqui é zerado os valores, caso contrário ela vai repetindo e cumulando----Zera e mostra

        let subtotal = 0;
        let desconto = 0;
        let total = 0

        for(let i in carrinho){
            let pizzaItem = pizzaJson.find((item)=>item.id == carrinho[i].id);// O método find chama a função -> o calback - retorna 
            subtotal += pizzaItem.price * carrinho[i].qt;


            let carrinhoItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName = carrinho[i].size;
             switch(carrinho[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break
            }
            let pizzaName = `${pizzaItem.name } (${pizzaSizeName})`;

            carrinhoItem.querySelector('img').src= pizzaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;
            
            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(carrinho[i].qt > 1){
                    carrinho[i].qt--;
                }else{
                    carrinho.splice(i, 1)// remove
                }
                updateCarrinho();
            });

            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                carrinho[i].qt++;
                updateCarrinho();//atualiza todo o carrinho
            });

            c('.cart').append(carrinhoItem); //O métodos append adiciona um novo valor---mostra
        }
        
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;//last-child é usado para pegar o último ítem.
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}