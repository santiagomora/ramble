#include "Balde.h"

using namespace std;
/*
 * metodos propios de la clase
 * */
Balde::Balde( unsigned int l, float p ){
    this->litros = l;
    this->set_precio( p );
    this->id = Producto::id;
}

Balde::Balde(  ){
    this->litros = 0;
    this->set_precio( 0 );
    this->id = Producto::id;
}

Balde::~Balde( void ){
    delete this;
}

Balde::Balde( const Balde &b ){
    this->set_precio( b.precio );
    this->litros = b.litros;
    this->id = Producto::id;
}

/*
 * metodos propios de la clase
 * */
void Balde::set_litros( unsigned int l ){
    this->litros = l;
}
unsigned int Balde::get_litros( void ) const {
    return this->litros;
}

unsigned int Balde::get_id( void ) const{
    return this->id;
}

/*
 * sobrecarga operadores
 * */
ostream& operator<<( ostream &o, const Balde &a ){
    o << "Balde con ID: " << a.get_id() << "\nContenido por balde: " << a.get_litros() << "L\n" << "Precio por litro: " << a.get_precio() <<"$\n";
    return o;
}
