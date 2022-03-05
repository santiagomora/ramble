#include "Nodo.h"

template<typename T>
Nodo<T>::Nodo(){
    this->data = 0;
    this->next = nullptr;
    this->prev = nullptr;
}

template<typename T>
Nodo<T>::Nodo( Nodo& n ){
    this->data = n.data;
    this->next = n.next;
    this->prev = n.prev;
}

template<typename T>
Nodo<T>::Nodo( T data ){
    this->data = data;
    this->next = nullptr;
    this->prev = nullptr;
}

template<typename T>
Nodo<T>& Nodo<T>::operator=( T dato ) {
    this->data = dato;
    return *this;
};

template<typename T>
ostream& operator<< (ostream& out, const Nodo<T>& z){
    out << z.data;
    return out;
}
