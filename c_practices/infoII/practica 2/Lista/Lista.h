#ifndef LISTA_H
#define LISTA_H

#include <iostream>
#include <Nodo.h>

using namespace std;

template<typename T>
class Lista {
    private:
        class ErrorIndice {
            private:
                const char* msj;

            public:
                ErrorIndice() {
                    this->msj = "¡El indice ingresado no existe!";
                }
                const char* getMsj(){
                    return this->msj;
                }
        };
        Nodo<T> * elems;
        int size;

    public:
        Lista();
        ~Lista();

        void append( T data );
        void prepend( T data );

        int getsize();
        T remove( int pos );

        Nodo<T>& operator[]( int pos );
        Nodo<T>* searchLast();
        void checkIndexError( int pos );
        bool search(const T &item, int &idx, bool from_start = true);

    friend ostream& operator<< (ostream& out, const Lista<T>& z){
        Nodo<T>* aux = z.elems;
        while ( aux!=nullptr ){
            out << aux->data << endl;
            aux = aux->next;
        }
        return out;
    }
};

#include <Lista.tpp>

#endif // LISTA_H
