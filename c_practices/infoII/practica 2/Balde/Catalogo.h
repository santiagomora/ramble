#include <Balde.h>

#ifndef CATALOGO_H
#define CATALOGO_H

class Catalogo {
    public:
        Catalogo( unsigned int largo );
        ~Catalogo();
        Balde& operator[]( unsigned int idx );
        const Balde& operator[]( unsigned int idx ) const;
        unsigned int get_len( void ) const;

    private:
        unsigned int len;
        Balde *elems;
        Balde& get_elem( unsigned int id ) const;
};

#endif // CATALOGO_H
