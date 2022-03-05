#ifndef ALUMNO_H
#define ALUMNO_H

#include <Persona.h>

#define SIZENOTAS 10

class Alumno : public Persona {
    private:
        unsigned int legajo;
        int *notas;

    public:
        Alumno( const char* nom, const char* ap, unsigned int dni, unsigned int leg )
            : Persona{ nom, ap, dni } {
            this->legajo = leg;
            this->notas = new int[SIZENOTAS];
            this->iniciaNotas();
        };
        ~Alumno();
        void iniciaNotas();
        void imprimeNotas();
        unsigned int glegajo() const;
        void imprimeNotas() const;
        void asignar_nota( unsigned int pos, unsigned int val );
        void invalidar_nota( unsigned int pos );
        void asignar( unsigned int pos, int val );

        double promedio(bool *ok) const;
        unsigned int nota_minima(bool *ok) const;
        unsigned int nota_maxima(bool *ok) const;

    friend ostream& operator<< (ostream& out, const Alumno& z);
};

#endif // ALUMNO_H
