let modalQt = 1;

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

            let key = e.target.closest('.pizza-item').getAttribute('data-key');//CLOSEST QUER DIZER ACHE O ELEMENTO + PROXIMO apartir do a que é o link
//AO CLICARMOS PECISAMOS DESTA INFORMÇÕES ABAIXO
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

            c('.pizzaWindowArea').style.opacity = 0;
            c('.pizzaWindowArea').style.display = 'flex';
                setTimeout(()=>{
                }, 200);
            c('.pizzaWindowArea').style.opacity = 1;
        })
        

        c('.pizza-area').append(pizzaItem);
})