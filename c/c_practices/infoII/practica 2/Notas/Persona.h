#ifndef PERSONA_H
#define PERSONA_H

#include <iostream>
#include "Str.h"

using namespace std;

class Persona {
    protected:
        Str nombre;
        Str apellido;
        unsigned int dni;

    public:
        Persona( const char* nombre, const char* apellido, unsigned int dni );
        ~Persona();
        const Str& gnombre() const ;
        const Str& gapellido() const ;
        int gdni() const ;

    friend ostream& operator<< (ostream& out, const Persona& z);
};

#endif // PERSONA_H
