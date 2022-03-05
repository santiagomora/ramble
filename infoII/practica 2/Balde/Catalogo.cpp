#include "Catalogo.h"
#include <iostream>
#include <Balde.h>

using namespace std;

Balde& Catalogo::get_elem( unsigned int id ) const {
    unsigned int ind = id < this->len ? id : this->len-1;
    return this->elems[ind];
}

Catalogo::Catalogo( unsigned int largo ){
    this->len = largo;
    this->elems = new Balde[largo];
}

Catalogo::~Catalogo(  ){
    delete this->elems;
}

Balde& Catalogo::operator[]( unsigned int idx ){
    return this->get_elem(idx);
}

const Balde& Catalogo::operator[]( unsigned int idx ) const {
    return this->get_elem(idx);
}

unsigned int Catalogo::get_len( void ) const{
    return this->len;
};
