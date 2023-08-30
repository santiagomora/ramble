#ifndef PRODUCTO_H
#define PRODUCTO_H

class Producto {
    protected:
        static unsigned int id;
        float precio;

    public:
        Producto();
        ~Producto();

        float get_precio( void ) const;
        void set_precio( float p );
};

#endif // PRODUCTO_H
