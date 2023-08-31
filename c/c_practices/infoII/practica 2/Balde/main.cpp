#include <iostream>
#include <Catalogo.h>

using namespace std;

unsigned int leerLongitud(){
    unsigned int largo = 0;
    cout << "Introduzca el largo del catalogo:" << endl;
    cin >> largo;
    if ( largo<=0 ) {
        cout << "longitud invalida" << endl;
        exit(1);
    }
    return largo;
}

void mostrarCatalogo( Catalogo &c ){
    for ( unsigned int i=0; i< c.get_len(); i++ )
        cout << c[i] << endl;
}

void modificarBalde( Catalogo &c ) {
    unsigned int index, nlitros;
    float nprecio;

    cout << "Elija indice a modificar: ";
    cin >> index;

    cout << "Litros actuales: " << c[index].get_litros() << ". Ingrese litros del elemento: ";
    cin >> nlitros;
    c[index].set_litros(nlitros);

    cout << "Precio actual: " << c[index].get_precio() << ". Ingrese precio del elemento: ";
    cin >> nprecio;
    c[index].set_precio(nprecio);
}

void (*ejecutarOpcion[2]) ( Catalogo &c ) {
    modificarBalde,
    mostrarCatalogo
};

void mostrarMenu( Catalogo &cat ){
    int op = 0;
    while ( op<=1 ) {
        cout << "Introduzca una opcion: \n\
0. Modificar elemento del catálogo\n\
1. Mostrar catálogo actual\n\
2. Cualquier otro valor: Terminar programa\
        "<< endl;
        cin>>op;
        if ( op<=1 )
            ejecutarOpcion[op]( cat );
    }
    return ;
}

int main(){
    unsigned int largo = leerLongitud();
    Catalogo cat(largo);
    mostrarMenu( cat );
    return 0;
}
