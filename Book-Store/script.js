//navbar t oggle event
const btn=document.getElementById('btn')
const ul=document.getElementById('nav')
const check=document.querySelectorAll('input')
btn.addEventListener('click',function(e){
    ul.classList.toggle('hidden');
})
//shopping cart toggle event
const cartBtn=document.getElementById('cart')
const shopCart=document.getElementById('shopping-cart')
cartBtn.addEventListener('click',function(e){
    shopCart.classList.toggle('hidden');
})

// shopping cart section
const grid=document.getElementById("grid");
let cart=[]
let total=0;
let newData;
fetch("data.json").then( (response) => response.json()).then( (data)=>{
    newData=data;
    ProductDisplay(data);
    
})
function ProductDisplay(product){
    product.forEach(function(items){
        const card=document.createElement('div');
        card.className='bg-white rounded-sm shadow-sm'
        card.innerHTML=` <div class="w-full h-[250px] overflow-hidden">
                    <img src="${items.img}" alt="" class="w-full h-full object-cover">
                </div>
                <div class="grid gap-2 py-2 px-4">
                    <h1 class="text-xl font-bold text-slate-700">${items.title}</h1>
                    <h2 class="text-lg font-medium text-slate-700">${items.author}</h2>
                    <div class="flex justify-between items-center px-4 py-2">
                        <h1 class="text-lg font-bold text-slate-600">Price $<span>${items.price}</span></h1>
                        <button class="bg-red-500 flex gap-2 py-2 px-4 rounded-md shadow-sm text-white font-medium cursor-pointer hover:bg-red-400 hover:shadow-md" onclick="AddCarts(${items.id})">
                            <img src="./img/add_shopping_cart_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>`
                grid.appendChild(card)
    })
}

function AddCarts(id){
    const product=newData.find(p=> p.id===id);
    const cartitem=cart.find(item => item.id===id);
    if(cartitem){
        cartitem.qty=1;

    }else{
        cart.push({...product,qty:1});
    }
    UIUpdate()
}

function UIUpdate(){
    let count=0;
    total=cart.reduce( (acc,item) => acc +item.price * item.qty,0)
    const items=document.getElementById("items");
    items.innerHTML=''
    cart.forEach(function(item){
        count +=item.qty
        const list=document.createElement("div");
        list.className='flex items-center p-2 gap-4 bg-white shadow-sm'
        list.innerHTML=`<img src="${item.img}" alt="" class="w-16 h-16">
                                <div class="grid w-full px-2 gap-2">
                                    <div class="flex justify-between w-full">
                                        <p class="text-xl text-slate-800">${item.title}</p>
                                        <h1 class="text-xl text-slate-600 font-medium">Price $<span>${item.price}</span></h1>
                                    </div>
                                    <div class="flex justify-between">
                                        <h1 class="text-lg text-stone-800">Sub Total $<span>${item.price * item.qty}</span></h1>
                                        <div class="flex gap-2">
                                            <button class="border-2 border-red-600 rounded-full w-6 h-6 flex justify-center items-center text-center text-red-700 font-bold" onclick="Minus(${item.id})"> - </button>
                                            <span class="text-red-700" id="qty-show">${item.qty}</span>
                                            <button class="border-2 border-red-600 rounded-full w-6 h-6 flex justify-center items-center text-red-700 text-center font-bold" onclick="Pluse(${item.id})"> + </button>
                                        </div>
                                    </div>
                                </div>`
        items.appendChild(list)
    })
    document.getElementById('count').innerHTML=count;
    document.getElementById('total').innerHTML=total
}

function Minus(id){
    const cartitem=cart.find(item => item.id===id);
    if (cartitem.qty===0){
        removeFromCart(id);
    }else{
        cartitem.qty -=1
        if(cartitem.qty==0){
            removeFromCart(id)
        }
        UIUpdate()
    }
   
}
function Pluse(id){
    const cartiems=cart.find(item => item.id===id);
    if(cartiems){
        cartiems.qty +=1
        document.getElementById("qty-show").innerHTML=cartiems.qty;
        UIUpdate()
    }
}

function removeFromCart(id){
    cart=cart.filter(item => item.id  !==id);
    UIUpdate()
}

function checkout(){
    alert("Thank Your For Shopping Order Will be recive soon!")
    cart=[];
    UIUpdate()
}