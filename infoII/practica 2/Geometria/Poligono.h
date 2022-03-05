#ifndef POLIGONO_H
#define POLIGONO_H


class Poligono
{
    unsigned int cantidad_vertices;
    Punto *vertices;
    Errores públicos:
    class ErrorNoDefinePoligono{};
    class ErrorRango{};
    Constructores/Destructor:
    Poligono(unsigned int n_vertices);
    Poligono(const Poligono &p);
    ~Poligono();
    En caso de que se intente instanciar un objeto Poligono con menos de tres vértices, se deberá
    generar un error de tipo ErrorNoDefinePoligono.
    Operadores:
    bool operator==(const Poligono &p) const;
    bool operator!=(const Poligono &p) const;
    Página 23 de 27Augusto Santini - Informática II
    UTN - FRBA
    Métodos de acceso:
    void set_vertice(unsigned int n_vertice, const Punto &p);
    const Punto & get_vertice(unsigned int n_vertice) const;
    unsigned int get_cantidad_vertices() const;
    En caso de que se intente acceder/fijar un vértice fuera de rango, se deberá generar un error de
    tipo ErrorRango.
    Cálculo de perímetro:
    double perimetro() const;
    Para calcular el perímetro de cualquier polígono, simplemente basta con sumar la distancia entre
    todos los vértices que conforman el polígono.
    Esta método asume que el polígono está definido de forma tal que el mismo no tiene intersec-
    ciones en los segmentos que lo conforman. Asumiremos que siempre se generan polígonos con
    esta característica.
    Cálculo de área:
    double area() const;
};

#endif // POLIGONO_H
