#include <Producto.h>
#include <iostream>
#ifndef BALDE_H
#define BALDE_H

using namespace std;

class Balde : public Producto {
    public:
        Balde();
        Balde( unsigned int l, float p );
        Balde( const Balde &b );
        ~Balde( void );

        void set_litros( unsigned int l );
        unsigned int get_litros( void ) const;

        unsigned int get_id( void ) const;

        friend ostream& operator<<( ostream &o, const Balde &a );

    private:
        unsigned int litros;
        unsigned int id;
};

#endif // BALDE_H
