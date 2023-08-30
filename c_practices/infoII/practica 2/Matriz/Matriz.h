#ifndef MATRIZ_H
#define MATRIZ_H

#include <string.h>
#include <iostream>

using namespace std;

class Matriz {
    private:
        unsigned int rows;
        unsigned int cols;
        double **elems;

    public:
        Matriz( unsigned int r, unsigned int c );
        Matriz( Matriz &m );
        ~Matriz();
        class ErrorDimensional {
            private:
                const char* msj;

            public:
                ErrorDimensional() {
                    this->msj = "¡Se detecto error de dimension!";
                }
                const char* getMsj(){
                    return this->msj;
                }
        };
        class ErrorRango {
            private:
                const char* msj;

            public:
                ErrorRango() {
                    this->msj = "¡Indice fuera de rango!";
                }
                const char* getMsj(){
                    return this->msj;
                }
        };

        unsigned int grows() const;
        unsigned int gcols() const;

        double at( unsigned int row, unsigned int col ) const;

        void set( unsigned int row, unsigned int col, double value );
        void checkErrorRango(  unsigned int row, unsigned int col  ) const;
        void checkCrossErrorRango(  unsigned int row, unsigned int col  ) const;
        void asignar( double value );
        void initMatriz( unsigned int rows, unsigned int cols );
        void deleteMatriz();

        Matriz & operator=(const Matriz &m);
        Matriz operator+(const Matriz &m) const;
        Matriz operator+(double v) const;
        Matriz operator*(const Matriz &m) const;
        Matriz operator*(double v) const;
        Matriz operator-(const Matriz &m) const;
        Matriz operator-(double v) const;

        void operator+=(const Matriz & m);
        void operator+=(double v);
        void operator-=(const Matriz & m);
        void operator-=(double v);
        void operator*=(const Matriz & m);
        void operator*=(double v);

    friend ostream& operator<< (ostream& out, const Matriz& z);
};

#endif // MATRIZ_H
