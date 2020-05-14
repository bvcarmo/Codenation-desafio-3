const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const { products } = require('./data/products');

function getShoppingCart(ids , productsList) {

	if(productsList == null || productsList == undefined)
		return {};
	
	let arrayProdutosCarrinho = [];
	let arrayCategoriasProdutos = [];
	productsList.map(produto => {
		if(ids.indexOf(produto.id) != -1){
			arrayProdutosCarrinho.push(produto)
			arrayCategoriasProdutos.push(produto.category)
		}
	})

	arrayCategoriasProdutos = (Array.from(new Set(arrayCategoriasProdutos)))
	let tipoCategoriaLook

	if(arrayCategoriasProdutos.length == 1)
		tipoCategoriaLook = 'SINGLE LOOK'
	else if(arrayCategoriasProdutos.length == 2)
		tipoCategoriaLook = 'DOUBLE LOOK'
	else if(arrayCategoriasProdutos.length == 3)
		tipoCategoriaLook = 'TRIPLE LOOK'
	else
		tipoCategoriaLook = 'FULL LOOK'
	
	let precoTotal = 0;
	let precoTotalComDesconto = 0;
	let arrayProdutos = [];
	let objProduto = {};
	let verificarPreco = false
	arrayProdutosCarrinho.map(produto => {
		
		precoTotal += produto.regularPrice;
		objProduto.name = produto.name;
		objProduto.category = produto.category;

		produto.promotions.map(produto => {
			if(produto.looks.indexOf(tipoCategoriaLook) != -1){
				precoTotalComDesconto += produto.price;
				verificarPreco = true;
			}
		
		})

		if(!verificarPreco)
			precoTotalComDesconto += produto.regularPrice;

		verificarPreco = false;

		arrayProdutos.push(objProduto)
		objProduto = {}

	})

	let objCarrinho = {}
	objCarrinho.products = arrayProdutos;
	objCarrinho.promotion = tipoCategoriaLook;
	objCarrinho.totalPrice = precoTotalComDesconto.toFixed(2);
	objCarrinho.discountValue = (precoTotal - precoTotalComDesconto).toFixed(2);
	objCarrinho.discount = (((precoTotal - precoTotalComDesconto)/precoTotal)*100).toFixed(2)+"%";
	
		
	return objCarrinho;
}

console.log(getShoppingCart([130, 140, 230, 260], products))

module.exports = { getShoppingCart };
