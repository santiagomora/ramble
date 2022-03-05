#include "Persona.h"
#include "Str.h"
#define MAXSTR 19

Persona::Persona( const char* nombre, const char* apellido, unsigned int dni ) {
    this->nombre = Str( Str::Strcpy( new char [MAXSTR], nombre, MAXSTR ) );
    this->apellido = Str( Str::Strcpy( new char [MAXSTR], apellido, MAXSTR ) );
    this->dni = dni;
}

Persona::~Persona() {

}

const Str& Persona::gnombre() const {
    return this->nombre;
}

const Str& Persona::gapellido() const {
    return this->apellido;
}

int Persona::gdni() const {
    return this->dni;
}

ostream& operator<< ( ostream& out, const Persona &z ){
    cout << "Nombre: " << z.gnombre() <<  "\nApellido: " << z.gapellido() << "\nDNI: " << z.gdni();
    return out;
}

