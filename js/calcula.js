
window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
}

x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.
tipobase = 0;

//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
         if (x=="0" || xi==1  ) {	// inicializar un número, 
            pantalla.innerHTML=xx; //mostrar en pantalla
    
            x=xx; //guardar número
            if (xx==".") { //si escribimos una coma al principio del número
               pantalla.innerHTML="0."; //escribimos 0.
               x=xx; //guardar número
               coma=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
                   pantalla.innerHTML+=xx;
                   x+=xx;
                   coma=1; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (xx=="." && coma==1) {} 
               //Resto de casos: escribir un número del 0 al 9: 	 
               else {
                   pantalla.innerHTML+=xx;
                   x+=xx;
               }
            }
            xi=0; //el número está iniciado y podemos ampliarlo.
}


function operar(s) {
         igualar(); //si hay operaciones pendientes se realizan primero
         ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operación.
         xi=1; //inicializar pantalla.
         }	

function igualar() {
         if (op=="no") { //no hay ninguna operación pendiente.
            pantalla.innerHTML=x;	//mostramos el mismo número	
            }
         else { //con operación pendiente resolvemos
            sl=ni+op+x; // escribimos la operación en una cadena
            sol=eval(sl); //convertimos la cadena a código y resolvemos
            pantalla.innerHTML=sol; //mostramos la solución
            x=sol; //guardamos la solución
            op="no"; //ya no hay operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
            }
        }
function raizc() {
         x=Math.sqrt(x) //resolver raíz cuadrada.
         pantalla.innerHTML=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 
         }
function porcent() { 
         x=x/100 //dividir por 100 el número
         pantalla.innerHTML=x; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }
function opuest() { 
         nx=Number(x); //convertir en número
         nx=-nx; //cambiar de signo
         x=String(nx); //volver a convertir a cadena
         pantalla.innerHTML=x; //mostrar en pantalla.
         }
function inve() {
         nx=Number(x);
         nx=(1/nx);
         x=String(nx);		 
         pantalla.innerHTML=x;
         xi=1; //reiniciar pantalla al pulsar otro número.
         }

function retro(){ //Borrar sólo el último número escrito.
         cifras=x.length; //hayar número de caracteres en pantalla
         br=x.substr(cifras-1,cifras) //describir último caracter
         x=x.substr(0,cifras-1) //quitar el ultimo caracter
         if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
         pantalla.innerHTML=x; //mostrar resultado en pantalla	
         cambiarResultado(tipobase);
         }
function borradoParcial() {
        pantalla.innerHTML=0; //Borrado de pantalla;
        textoConvertido.innerHTML='';//poner pantalla de conversion vacia
        x=0; //Borrado indicador número pantalla.
        coma=0;	//reiniciamos también la coma	
        tipobase=0;	//quita la base
        }
function borradoTotal() {
         pantalla.innerHTML=0; //poner pantalla a 0
         textoConvertido.innerHTML='';//poner pantalla de conversion vacia
         x="0"; //reiniciar número en pantalla
         coma=0; //reiniciar estado coma decimal 
         ni=0 //indicador de número oculto a 0;
         op="no" //borrar operación en curso.
         tipobase = 0;//quita la base
         }

function cambiarResultado (base){
    tipobase =base; //almacena la base ocupada
    
    //-------------Si es un numero decimal-----------------------------
    if  (coma == 1) {//se compruena si es decimal con la variable coma utlizada en el código anterior
        
        var entero = Math.trunc(x);//obtener solo la parte entera
        var decimal= x - entero;// obtener la parte decimal restanto la parte entera
        
        decimal = decimal.toFixed(10);//reducir a 10 decimales
        var conversion='';//variable que almacenara la conversion

        switch (base){
            case 2://binario
                //parte entera
                for ( i=entero; i > 0;) {
                    ope = i % 2;
                    if (ope == 0){
                        conversion+= '0';
                    }else{
                        conversion+= '1';
                    }
                    i=parseInt(i/2);
                }
                conversion = invertirCadena(conversion)+".";//invertimos la cadena ya que la concatenamos al reves por facilidad
                //parte decimal
                var  aux = 0.0;
                for ( i= decimal, j=1 ; i != 1.0 && j <= 15 ;j++) {
                    aux = i *2;
                    if (aux >=1){
                        conversion+= '1';
                        i = aux -1;
                    }else{
                        conversion+= '0';
                        i = aux;
                    }
                }
                textoConvertido.innerHTML = conversion;//escribimos el resultado
            break;
                
            case 8: // Octal
                //parte entera
                for ( i=entero; i > 0;) {
                    ope = i % 8;
                        conversion+= ope;
                    i=parseInt(i/8);
                }
                conversion = invertirCadena(conversion)+".";//invertimos la cadena ya que la concatenamos al reves por facilidad
                
                //parte decimal
                var  aux = 0.0;
                for ( i= decimal; i!=0;) {
                    aux = i *8;
                    
                    if (aux%2 == 0){
                        conversion+= aux;
                        i = 0;
                    }else{
                        conversion+= Math.trunc(aux);
                        i =aux - Math.trunc(aux) ;
                    } 
                }
                textoConvertido.innerHTML = conversion;
            break;
        
            case 16://Hexadecimal
                //parte entera
                for ( i = entero; i > 0;) {
                    ope = i % 16;
                        
                        if (ope >= 10){
                            switch (ope){
                                case 10:
                                    conversion+= 'A';
                                break;
                                case 11:
                                    conversion+= 'B';
                                break;
                                case 12:
                                    conversion+= 'C';
                                break;
                                case 13:
                                    conversion+= 'D';
                                break;
                                case 14:
                                    conversion+= 'E';
                                break;
                                case 15:
                                    conversion+= 'F';
                                break;
                            }
                        }else{
                            conversion+= ope;
                        } 
                    i=parseInt(i/16);
                }
                conversion = invertirCadena(conversion)+".";//invertimos la cadena ya que la concatenamos al reves por facilidad
                
                //parte decimal
                var  aux = 0.0;
                for ( i= decimal; i!=0;) {
                    aux = i *16;
                    if (aux%2 == 0){
                        if (aux>=10){
                            switch (ope){
                                case 10:
                                    conversion+= 'A';
                                break;
                                case 11:
                                    conversion+= 'B';
                                break;
                                case 12:
                                    conversion+= 'C';
                                break;
                                case 13:
                                    conversion+= 'D';
                                break;
                                case 14:
                                    conversion+= 'E';
                                break;
                                case 15:
                                    conversion+= 'F';
                                break;
                            }
                        }else{
                            conversion+= aux;
                        } 
                        i = 0;
                    }else{
                        aux2 = Math.trunc(aux);
                        
                            if (aux2>=10){
                                switch (ope){
                                    case 10:
                                        conversion+= 'A';
                                    break;
                                    case 11:
                                        conversion+= 'B';
                                    break;
                                    case 12:
                                        conversion+= 'C';
                                    break;
                                    case 13:
                                        conversion+= 'D';
                                    break;
                                    case 14:
                                        conversion+= 'E';
                                    break;
                                    case 15:
                                        conversion+= 'F';
                                    break;
                                }
                            }else{
                                conversion += aux2;
                            } 
                        i =aux - aux2 ;
                    } 
                }
                textoConvertido.innerHTML = conversion;
            break;
           }//fin de switch

        }// fin decimal

        //--------Si es un numero entero-----------------------------------------
        else{
            switch (base){
            
            case 2://binario
                conversion='';
                entero = parseInt(x.toString(),10);//parte entera
                
                for ( i=entero; i > 0;) {
                    ope = i % 2;
                    if (ope == 0){
                        conversion += '0';
                    }else{
                        conversion += '1';
                    }
                    i=parseInt(i/2);
                }
                conversion = invertirCadena(conversion);//invertimos la cadena ya que la concatenamos al reves por facilidad
                textoConvertido.innerHTML= conversion;
            break;
                
            case 8:
                //parte entera
                conversion='';
                entero = x;
                for ( i=entero; i > 0;) {
                    ope = i % 8;
                        conversion+= ope;
                    i=parseInt(i/8);
                }
                conversion = invertirCadena(conversion);//invertimos la cadena ya que la concatenamos al reves por facilidad
                textoConvertido.innerHTML= conversion;        
            break;
        
            case 16:///Hexadecimal
            conversion = '';
            entero = x;
            var i = 0.0;
            for ( i = entero; i > 0;) {
                ope = i % 16;     
                    if (ope >= 10){
                        switch (ope){
                            case 10:
                                conversion+= 'A';
                            break;
                            case 11:
                                conversion+= 'B';
                            break;
                            case 12:
                                conversion+= 'C';
                            break;
                            case 13:
                                conversion+= 'D';
                            break;
                            case 14:
                                conversion+= 'E';
                            break;
                            case 15:
                                conversion+= 'F';
                            break;
                        }
                    }else{
                        conversion+= ope;
                    } 
                i=parseInt(i/16);
            }

            conversion = invertirCadena(conversion);//invertimos la cadena ya que la concatenamos al reves por facilidad
            textoConvertido.innerHTML= conversion;
            break;
        }//fin de switch
    }//fin entero
}// fin funcion

function invertirCadena (cadena){
    inversa='';
    for(i=cadena.length-1; i >= 0; i--){
        inversa += cadena.charAt(i);
    }
    return inversa;
}

//1 rad × 180/π = 57.296°

function seno (){
    var seno = Math.sin(x);
    seno = convertir_A_Grados(seno);
    x = seno;
    op="no"; //ya no hay operaciones pendientes
    xi=1; //se puede reiniciar la pantalla.
    pantalla.innerHTML=x;
}

function coseno (){
    var cos = Math.cos(x);
    cos = convertir_A_Grados(cos);
    x = cos;
    op="no"; //ya no hay operaciones pendientes
    xi=1; //se puede reiniciar la pantalla.
    pantalla.innerHTML=x;
}

function tangente (){
    var tangente = Math.tan(x);
    tangente = convertir_A_Grados(tangente);
    x = tangente;
    op="no"; //ya no hay operaciones pendientes
    xi=1; //se puede reiniciar la pantalla.
    pantalla.innerHTML=x;
}


function convertir_A_Grados (radianes){
    return grados = radianes * (180/Math.PI);
}

function logN (){
    x= Math.log(x);
    op="no"; //ya no hay operaciones pendientes
    xi=1; //se puede reiniciar la pantalla.
    pantalla.innerHTML=x;
}

function e (){
    numero(Math.E);
}

function pi (){
    numero(Math.PI);
}

function factorial(){
    if(x >= 0){
        var fac=x;
        for (i=x-1; i>=1; i--)
            fac = fac * i;
       
        x = fac;
        op="no"; //ya no hay operaciones pendientes
        xi=1; //se puede reiniciar la pantalla.
        pantalla.innerHTML=x;
    }
    else
        alert('Números negativos no validos');
}

function exponente (potencia){
    x= Math.pow(x,potencia);
    op="no"; //ya no hay operaciones pendientes
    xi=1; //se puede reiniciar la pantalla.
    pantalla.innerHTML=x;
}

function exponenteY (){
    exponente(parseInt(prompt("Ingresa el exponente")));
}