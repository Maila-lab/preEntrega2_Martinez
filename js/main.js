// SEGUNDA PRE ENTREGA //
// SIMULADOR DE UN CARRITO DE COMPRAS ONLINE
// EL SERVICIO CUENTA CON DOS OPCIONES PARA LOS CLIENTES
    // ASOSIADOS TENDRAN UN DESCUENTO
// DANDO LA OPCION DE COMPRAR LIBREMENTE, Y SIN OBLIGAR A REGISTRARSE AL CLIENTES NO FRECUENTES

//MENSAJE DE BIENBENIDA AL CARRITO DE COMPRAS ONLINE
alert("         Bienvenidas/os al simulador de un carrito de compras");

// SECTOR DE LOS CLIENTES
class Cliente{
    constructor(nombre,dni){
        this.nombre=nombre;
        this.dni=dni;
    }
}
// DECLARACION E INICIALIZACION DE VARIABLES
const arrClientes=[];
let nuevoUsuario="";
let opcion = "",opcion2="";
let esSocio=undefined;
let dni="";

// GENERACION DE ARRAY E INICIALIZACION DE OBJETOS
arrClientes.push(new Cliente("dario","1111"));
arrClientes.push(new Cliente("emilia","2222"));

// BUCLE DEL PRIMER MENU
opcion = prompt("Ingrese una Opción:\n1 Soy socio\n2 No me quiero asociar \n3 Quiero asociarme\n00 Salir del Programa");
while(opcion!="00"&&opcion2!="111"){
    switch (opcion) {
        case "1":
            dni = prompt("Ingrese su DNI:");
            esSocio= arrClientes.find((e)=>(e.dni==dni));// BUSCA EN EL ARRAY DE CLIENTE, SI ESTA REGISTRADO EL DNI
            if(esSocio==undefined){
                alert("usuario no encontrado!");
            }else{
                alert("Por ser socio tiene un 20%");
                opcion2="111"; //es para que salga del while
            }
            break;
        case "2":
            alert("-_-usted se pierde los beneficios-_-");
            opcion2="111";  //es para que salga del while
            break;
        case "3":
            nuevoUsuario= new Cliente(prompt("Excelente, complete los datos necesario: \nIngrese su nombre: "),prompt("Ingrese su dni: "))
            arrClientes.push(nuevoUsuario);
            dni=nuevoUsuario.dni;
            alert("Bienvenida/o "+nuevoUsuario.nombre);
            opcion2="111";  //es para que salga del while
            break;
        default:            
            alert("opcion incorrecta!") ;
            opcion = prompt("Vuelva a ingresar una Opción:\n1 Soy socio\n2 No me quiero asociar \n3 Quiero asociarme\n00 Salir del Programa");
    }
}

// SECTOR DE LOS PRODUCTOS
class Producto{
    constructor(categoria,nombre,precio){
        this.categoria=categoria;
        this.nombre=nombre;
        this.precio=precio;
    }
}
// DECLARACION E INICIALIZACION DE VARIABLES
const arrproductos=[];

// GENERACION DE ARRAY E INICIALIZACION DE OBJETOS
arrproductos.push(new Producto("golosinas","alfajor","160"));
arrproductos.push(new Producto("snacks","rex","350"));
arrproductos.push(new Producto("snacks","papas fritas ","950"));
arrproductos.push(new Producto("bebidas","agua 500L","700"));
arrproductos.push(new Producto("bebidas","coca cola 500L","800"));
arrproductos.push(new Producto("golosinas","chicles seven","210"));
arrproductos.push(new Producto("golosinas","caramelos de miel","15"));

// SECTOR DE LA COMPRA
class Compra {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

// DECLARACION E INICIALIZACION DE VARIABLES
const carritoDeCompras=[];


// SECTOR DE FUNCIONES
function buscarCategoria(arr, nombreCategoria){
    return arr.find((el)=>el.categoria.includes(nombreCategoria))
}

function validarProductosEncontrados(arr,productoBuscado){
    return arr.find((el)=> el.nombre.includes(productoBuscado))
}

function mostrarCategoria(categoria){
    const arrCategoria=[];
    for (const p of arrproductos) {
        if(p.categoria==categoria){
            arrCategoria.push(p.nombre);
         }
    }
    return arrCategoria;
}

function totalDeCompras(){
    let total=0;
    for(const i of carritoDeCompras){
        for (const y of i.producto){
            total+=i.cantidad*y.precio;
        }
    }
    return total;
}

function mostrarCarrito(){
    const auxCarrito=[];
    for(const i of carritoDeCompras){
        for (const y of i.producto){
            auxCarrito.push("\n"+"producto: "+y.nombre+" --cantidad: "+i.cantidad+" --precio: $"+y.precio);  
        }
    }
    return auxCarrito;
}

function aplicarDescuento(total){
    let descuento=0.20;
    let x = parseFloat(total)*descuento;
    return parseFloat(total)-x;
}


// BUCLE DEL SEGUNDO MENU
let sectorCategoria="";
let opcSalir="";
// OPCION2 ES PARA SABER SI QUIERE SEGUIR EN EL SITIO O YA SE RETIRO
if(opcion2 =="111"){
    opcSalir = prompt("                  Menu: \n 1 Ver el carrito de compras \n 2 Agregar otro producto \n 00 Salir ");
    while(opcSalir != "00"){
        switch (opcSalir) {
            case "1":
                if(carritoDeCompras.length==0){
                    alert("Error, el carrito esta vacio");
                    break;
                }
                let totalDelCarrito=totalDeCompras();
                esSocio=arrClientes.find((e)=>(e.dni==dni));
                if (esSocio) {
                    alert("Carrito: \n"+mostrarCarrito()+"\nTotal: $"+totalDelCarrito+"\nY aplicando el descuento de socio, quedaria un total: $"+aplicarDescuento(totalDelCarrito));
                }else
                    alert("Carrito: \n"+mostrarCarrito()+"\n el precio total es de: $"+totalDelCarrito);
                break;
            case "2":
                sectorCategoria = prompt("Por que sector del mercado desea buscar:\n      snacks \n      golosinas \n      bebidas");
                encontrado=buscarCategoria(arrproductos,sectorCategoria);// FIND USADO PARA CORROBORAR QUE EXISTA ESA TAL CATEGORIA
                if(encontrado){
                    let nomProducto = prompt("Ingrese el nombre del producto a agregar: "+"\n"+mostrarCategoria(sectorCategoria).join("      \n"));
                    let productoSeleccionado = arrproductos.filter((el)=>{
                         return el.nombre.includes(nomProducto);
                    });
                    if(validarProductosEncontrados(arrproductos,nomProducto)){
                        let cantidad = prompt("Ingrese la cantidad que desea comprar: ");
                        carritoDeCompras.push(new Compra(productoSeleccionado,cantidad));
                        alert("Se agrego con exito al carrito!");
                    }else{
                        alert("ERROR, SE DEBE INGRESA EL NOMBRE TAL CUAL COMO ESTA ESCRITO!");
                    }
                }else{
                    alert("ERROR, NO EXISTE LA CATEGORIA");
                }
                break;
            default:
                alert("Opcion incorrecta!");
                break;
        }
        opcSalir = prompt("                  Menu: \n 1 Ver el carrito de compras \n 2 Agregar otro producto \n 00 Salir ");              
    }
}

alert("Adios, vuelva pronto!");