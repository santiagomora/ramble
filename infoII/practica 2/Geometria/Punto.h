#ifndef PUNTO_H
#define PUNTO_H


class Punto
{
    private:
        double x;
        double y;

    public:
        Punto();
        Punto( double xx, double yy );
        Punto( const Punto &p );
        ~Punto();

        const Punto & operator=(const Punto &p);
        Punto operator+(const Punto &p);
        Punto operator-(const Punto &p);

        double get_x() const { return x; }
        double get_y() const { return y; }
        double distancia(const Punto &p) const;

        void set_x(double xx) { x = xx; }
        void set_y(double yy) { y = yy; }

        void operator+=(const Punto &p);
        void operator-=(const Punto &p);
        bool operator==(const Punto &p);
        bool operator!=(const Punto &p);

};

#endif // PUNTO_H
