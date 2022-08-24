/*ingreso() = Función de control de usuarios , por el momento controla el ingreso de dos usuarios con su contraseña asociada */

function ingreso(){
    let usuario
    let contraseña 

    usuario = document.getElementById("usuario").value
    
    contraseña = document.getElementById("contraseña").value

    if (usuario == "Ariel" && contraseña == "1234" || usuario == "Ignacio" && contraseña == "1234"){
        window.location="paginaPrincipal.html"
        sessionStorage.setItem("usuario",usuario)
    } else {
        alert("Contraseña o Usuario Incorrectos")
    }    

}

mostrarUsuario();

/* mostrarUsuario() = Muestro el usuario que está almacenado dentro del SesionStorage como mensaje de bienvenida, este 
quedará almacenado mientras duré la sesión*/

function mostrarUsuario(){
    let userPresentacion = document.getElementById("nombreUser")
    userPresentacion.innerText = sessionStorage.getItem("usuario")    
}

/*ARRAY DE OBJETOS*/

/*Aquí utilizo la funcion de localStorage para almacenar los productos que previamente ingreso el usuario 
los cuales serán persistentes hasta que el usuario lo indique */

if (localStorage.getItem('productosNuevos')){
    productos = JSON.parse(localStorage.getItem('productosNuevos'))
} else {
    productos = [ 
        {id:1, nombre:"Vincha",precio: 250},
        {id:2, nombre:"Cartera",precio: 3000},
        {id:3, nombre:"Campera", precio:1200}
    ]
}


/*Ocultameinto de Botones*/
document.getElementById("agregarProductos").style.display = 'none'; 
document.getElementById("listaProductos").style.display = 'none'; 
document.getElementById("productoAgregado").style.display = 'none'; 
document.getElementById("listaDeProductosParaSeleccion").style.display = 'none'; 
document.getElementById("incluirIVA").style.display = 'none'; 
document.getElementById("incluirEnvio").style.display = 'none'; 
document.getElementById("nuevoProducto").style.display = 'none'; 
document.getElementById("mensajeFinalProducto").style.display = 'none'; 
document.getElementById("botoneraProductos").style.display = 'none'; 
document.getElementById("precioEnvio").style.display = 'none'; 
document.getElementById("noIncluirIVA").style.display = 'none'; 






/*Generación de Eventos*/

let btnMostrarProductos = document.getElementById("mostrarProductos") 
btnMostrarProductos.addEventListener("click",respuestaClick)

let btnAgregarProductos = document.getElementById("agregarProductos") 
btnAgregarProductos.addEventListener("click",respuestaClickAgregar)

let btnSeleccionarProductos = document.getElementById("seleccionarProductos") 
btnSeleccionarProductos.addEventListener("click",respuestaSeleccionar)

/*Funciones de Eventos*/

function respuestaClickAgregar(){
    document.getElementById("seleccionarProductos").style.display = ''; /*Habilito Botón Seleccionar*/
    document.getElementById("nuevoProducto").style.display = ''; 
}

function respuestaSeleccionar(){
    mostrarProductosParaSeleccion()
    document.getElementById("incluirIVA").style.display = ''; /*Habilito Botón IVA*/
    document.getElementById("noIncluirIVA").style.display = ''; /*Habilito Botón No IVA*/
    document.getElementById("incluirEnvio").style.display = ''; /*Habilito Botón Envio*/

    document.getElementById("botoneraProductos").style.display = ''; 

    /*Muestro solo el primer producto almacenado*/
    let listaPrd = document.getElementById("listaDeProductosParaSeleccion")
    listaPrd.innerText = (`Producto N°: ${productos[0].id}. Nombre: ${productos[0].nombre}. Precio: \$${productos[0].precio}.`)
}


function respuestaClick(){
    console.log(productos)
    document.getElementById("agregarProductos").style.display = ''; 
    document.getElementById("listaProductos").style.display = ''; 

    let listado = document.getElementById("listaProductos")
   
    /*Muestra de Productos Almacenados*/

    for (contProd = 0 ; contProd < productos.length ; contProd++){
        listado.innerText += (`Producto N°: ${productos[contProd].id}. Nombre: ${productos[contProd].nombre}. Precio: \$${productos[contProd].precio}. 
        `)
    }

    
}

/*agregarProductos() Dicha función le permitirá al usuario agrergar productos a la 
lista para luego simular su compra. */

function agregarProductos(){

    productoIngresadoNombre = document.getElementById("productoIngresadoNombre").value
    productoIngresadoPrecio = document.getElementById("productoIngresadoPrecio").value

    let producto = {
        id:productos[productos.length - 1].id+1 , nombre: productoIngresadoNombre , precio: productoIngresadoPrecio
    }

    productos.push(producto)
    localStorage.setItem("productosNuevos" ,JSON.stringify(productos));

    document.getElementById("productoAgregado").style.display = ''; 

    let avisoEnviado = document.getElementById("productoAgregado")


    avisoEnviado.innerText = (`Producto Agregado!!`)
    let listado = document.getElementById("listaProductos")
    listado.innerText = ("")
}

function mostrarProductosParaSeleccion(){
    let finalCompra = 0
   
    document.getElementById("listaDeProductosParaSeleccion").style.display = ''; 

    let btnIncluirIva = document.getElementById("incluirIVA") 
    btnIncluirIva.addEventListener("click",respuestaIVA)

    let btnNoIncluirIva = document.getElementById("noIncluirIVA") 
    btnNoIncluirIva.addEventListener("click",respuestaNoIVA)
    
    
    function respuestaIVA(){
        incluirIva(finalCompra)
        document.getElementById("precioEnvio").style.display = ''; 
    }

    function respuestaNoIVA(){
        sinIva(finalCompra)
        document.getElementById("precioEnvio").style.display = ''; 

    }
}


let finalCompra = 0;
let cont = 0;

function alCarrito(){
    alert("¡¡Producto Agregado!!")
    cantidad = document.getElementById("productoIngresadoCantidad").value
    
    let acumulado = calcularSubTotal(productos[cont].precio,cantidad) 
    finalCompra = finalCompra + acumulado
    
    

    let totalSinIVA = document.getElementById("totalSinIVA")
    totalSinIVA.innerText = `\$${finalCompra}`
    
    /*Verifico si es el último elemento para mostrar*/

    if (cont == productos.length){
        let finalLista = document.getElementById("mensajeFinalProducto")
        document.getElementById("mensajeFinalProducto").style.display = ''; 
    
        finalLista.innerText = "NO HAY MAS PRODUCTOS"
    
    }

    cont++
    siguienteProducto(cont)
    
}

function omitirProducto(){
    cont++
    if (cont == productos.length){
        let finalLista = document.getElementById("mensajeFinalProducto")
        document.getElementById("mensajeFinalProducto").style.display = ''; 
        finalLista.innerText = "NO HAY MAS PRODUCTOS"
    }
    siguienteProducto(cont)
  
}
  


function siguienteProducto(cont){
    
    let listaPrd = document.getElementById("listaDeProductosParaSeleccion")
    listaPrd.innerText = (`Producto N°: ${productos[cont].id}. Nombre: ${productos[cont].nombre}. Precio: \$${productos[cont].precio}.`)


}

/*incluirIva(finalCompra)
Una vez que el usuario selecciono sus productos y tiene un Total final de la compra
se le consultará si desea incluir el IVA seteado en el 21% de la compra.*/

function incluirIva(){

    
        let finalConIva = calcularIVA(finalCompra)

        let totalConIVA = document.getElementById("totalConIVA")
        totalConIVA.innerText = `\$${finalConIva}`

        let btnIncluirEnvio = document.getElementById("incluirEnvio") 
        btnIncluirEnvio.addEventListener("click",respuestaEnvio)

        function respuestaEnvio(){
            incluirEnvio(finalConIva)
        }

}

function sinIva(){

    let finalConIva = calcularSinIVA(finalCompra)

    let totalConIVA = document.getElementById("totalConIVA")
    totalConIVA.innerText = `\$${finalConIva}`

    let btnIncluirEnvio = document.getElementById("incluirEnvio") 
    btnIncluirEnvio.addEventListener("click",respuestaEnvio)

    function respuestaEnvio(){
        incluirEnvio(finalConIva)
    }
}

/*incluirEnvio() =
Dicha función le permitirá al usuario ingresar el costo del envió*/

function incluirEnvio(finalConIva){

    precioEnvio = parseInt(document.getElementById("precioEnvio").value)

    let totalConEnvio = document.getElementById("totalConEnvio")
    totalConEnvio.innerText = `\$${parseInt(calcularEnvio(finalConIva,precioEnvio))}`
}


/*calcularSubTotal(precio,cantidad)
Dicha función recibirá el precio y la cantidad de los productos seleccionados
y calculará el total multiplicando el precio con la cantidad.*/

function calcularSubTotal(precio,cantidad){
    return(precio * cantidad)
}

/*calcularIVA(cont)
Dicha función recibirá el total de la compra del usuario y le incluirá el IVA 
en caso de ser llamada *0.21 representa el 21% de IVA teniendo en cuenta el índice actual
en Argentina.*/

function calcularIVA (finalCompra){
    return (finalCompra + (finalCompra* 0.21))
}

function calcularSinIVA (finalCompra){
    return (finalCompra)
}

/*calcularEnvio(cont,precioEnvio)
Dicha función recibirá el total final de la compra y le añadirá el precio del envio.*/

function calcularEnvio(finalConIva,precioEnvio){
    return(finalConIva+precioEnvio)
}





