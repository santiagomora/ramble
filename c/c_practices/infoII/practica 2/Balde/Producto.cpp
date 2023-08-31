#include "Producto.h"
#include <iostream>

unsigned int Producto::id = -1;

/*
 * constructores
 * */
Producto::Producto( void ){
    Producto::id+=1;
}

Producto::~Producto( void ){
    delete this;
}

/*
 * metodos propios de la clase
 * */
float Producto::get_precio( void ) const{
    return this->precio;
}

void Producto::set_precio( float p ){
    this->precio = p;
}
