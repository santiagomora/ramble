#include "Lista.h"

using namespace std;

template <typename T>
Lista<T>::Lista(){
    this->elems = nullptr;
    this->size = 0;
}

template <typename T>
Lista<T>::~Lista(){
    Nodo<T>* aux = this->elems;
    Nodo<T>* del = aux;
    while ( aux ){
        del = aux;
        aux = aux->next;
        delete del;
    }
}

template<typename T>
void Lista<T>::checkIndexError( int pos ){
    if ( pos>this->size || pos<0 )
        throw Lista::ErrorIndice();
}

template<typename T>
void Lista<T>::append( T data ){
    Nodo<T>*  n = new Nodo<T>{data};
    Nodo<T>** aux = &this->elems;
    if ( *aux==nullptr ){
        *aux = n;
    } else {
        while( (*aux)->next != nullptr )
            aux = &(*aux)->next;
        (*aux)->next = n;
        n->prev = *aux;
    }
    this->size+=1;
}

template<typename T>
void Lista<T>::prepend( T data ){
    Nodo<T>* n = new Nodo<T>{data};
    Nodo<T>** aux = &this->elems;
    if ( *aux==nullptr ){
        *aux = n;
    } else {
        n->next = *aux;
        *aux = n;
    }
    this->size+=1;
}

template<typename T>
T Lista<T>::remove( int pos ){

    Nodo<T>** aux = &this->elems;
    Nodo<T>* del;

    int src = pos<0
        ? this->size+pos
        : pos;
    T data;

    this->checkIndexError( src );

    for( int i=0; i<src; i++ ){
        aux = &(*aux)->next;
    }

    del = *aux;
    data = del->data;

    if( src==0 ){
        this->elems = this->elems->next;
    }

    if( (*aux)->next != nullptr ){
        (*aux)->next->prev = (*aux)->prev;
    }

    if( (*aux)->prev != nullptr ) {
        (*aux)->prev->next = (*aux)->next;
    }

    delete del;
    this->size-=1;

    return data;
}

template<typename T>
int Lista<T>::getsize(){
    return this->size;
}

template<typename T>
Nodo<T>& Lista<T>::operator[]( int pos ){
    Nodo<T>* aux = this->elems;
    int src = pos<0
        ? this->size+pos
        : pos;
    this->checkIndexError( src );
    for( int i=0; i<src; i++ )
        aux = aux->next;
    return *aux;
}

template<typename T>
Nodo<T>* Lista<T>::searchLast(){
    Nodo<T> * aux = this->elems;
    while ( aux->next!=nullptr ){
        aux = aux->next;
    }
    return aux;
}

template<typename T>
bool Lista<T>::search(const T &item, int &idx, bool from_start) {

    Nodo<T>* aux = from_start
        ? this->elems
        : this->searchLast();

    for ( int i=0; i<this->size; i++ ){
        aux = from_start
            ? aux->next
            : aux->prev;
        if ( item == aux->data ){
            idx = i;
            return true;
        }
    }

    return false;
};
