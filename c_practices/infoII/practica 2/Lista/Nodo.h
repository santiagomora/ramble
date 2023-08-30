#ifndef NODO_H
#define NODO_H

#include <iostream>

using namespace std;

template<typename T>
class Nodo {
    public:
        int data;

        Nodo<T>* next;
        Nodo<T>* prev;

        Nodo();
        Nodo( Nodo<T>& n );
        Nodo( T data );

        Nodo& operator=( T dato );

    friend ostream& operator<< (ostream& out, const Nodo<T>& z);
};

#include <Nodo.tpp>

#endif // NODO_H
