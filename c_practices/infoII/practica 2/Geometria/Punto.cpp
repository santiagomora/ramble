#include "Punto.h"
#include <math.h>


Punto::Punto(){
    this->x = 0;
    this->y = 0;
}

Punto::Punto( double xx, double yy ){
    this->x = xx;
    this->y = yy;
}

Punto::Punto(const Punto &p){
    this->set_x( p.get_x() );
    this->set_y( p.get_y() );
}

Punto::~Punto(){

}

const Punto& Punto::operator=(const Punto &p){
    this->set_x( p.get_x() );
    this->set_y( p.get_y() );
    return *this;
}

Punto Punto::operator+(const Punto &p){
    Punto* res = new Punto;
    res->set_x( this->x + p.get_x() );
    res->set_y( this->y + p.get_y() );
    return *res;
}

Punto Punto::operator-(const Punto &p){
    Punto* res = new Punto;
    res->set_x( this->x - p.get_x() );
    res->set_y( this->y - p.get_y() );
    return *res;
}

double Punto::distancia(const Punto &p) const{
    return sqrt( pow( this->x-p.get_x(),2 ) + pow( this->y-p.get_y(),2 ) );
}

void Punto::operator+=(const Punto &p){
    this->set_x( this->x + p.get_x() );
    this->set_y( this->y + p.get_y() );
}

void Punto::operator-=(const Punto &p){
    this->set_x( this->x - p.get_x() );
    this->set_y( this->y - p.get_y() );
}

bool Punto::operator==(const Punto &p){
    return this->x==p.get_x() && this->y==p.get_y() ? true : false;
}

bool Punto::operator!=(const Punto &p){
    return this->x!=p.get_x() || this->y!=p.get_y() ? true : false;
}
