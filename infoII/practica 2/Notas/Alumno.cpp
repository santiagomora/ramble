#include "Alumno.h"

Alumno::~Alumno(){
    delete this->notas;
}

void Alumno::imprimeNotas() const{
    bool invalido = true;
    cout << "\nNotas: ";
    for (int i=0; i<SIZENOTAS; i++){
        if ( this->notas[i]>0 ){
            invalido = false;
            cout << "[" << this->notas[i] << "] ";
        }
    }
    if (invalido)
        cout << "el alumno no tiene notas validas" << endl;
    else
        cout << "\nPromedio: " << this->promedio( &invalido ) << endl;
}

void Alumno::iniciaNotas(){
    for ( int i=0; i<SIZENOTAS; i++ )
        this->notas[i] = -1;
}

unsigned int Alumno::glegajo() const{
    return this->legajo;
}

void Alumno::asignar( unsigned int pos, int val ){
    this->notas[pos] = val;
}

void Alumno::asignar_nota( unsigned int pos, unsigned int val ) {
    this->asignar( pos>SIZENOTAS ? SIZENOTAS-1 : pos, val );
}

void Alumno::invalidar_nota( unsigned int pos ) {
    this->asignar( pos>SIZENOTAS ? SIZENOTAS-1 : pos, -1 );
}


bool calcular( int res[3], int* notas, int size ){
    bool ok = false;
    int ctr=0;
    for ( int i=0; i<size; i++ ){
        if ( notas[i]>0 ){
            ok = true;
            res[0] = notas[i]<res[0] ? notas[i] : res[0];
            res[1] = notas[i]<res[1] ? notas[i] : res[1];
            res[2] += notas[i];
            ctr+=1;
        }
    }
    res[2] = ok ? res[2]/ctr : res[2] ;
    return ok;
}


unsigned int Alumno::nota_minima(bool *ok = nullptr) const {
    int res[3] = {0,0,0};
    *ok = calcular( res,this->notas,SIZENOTAS );
    return res[0];
}

unsigned int Alumno::nota_maxima(bool *ok = nullptr) const {
    int res[3] = {0,0,0};
    *ok = calcular( res,this->notas,SIZENOTAS );
    return res[1];
}

double Alumno::promedio(bool *ok = nullptr) const {
    int res[3] = {0,0,0};
    *ok = calcular( res,this->notas,SIZENOTAS );
    return res[2];
}

ostream& operator<<( ostream& out, const Alumno &z ){
    out << "Nombre y Apellido: " << z.gnombre() << " " << z.gapellido() << "\nLegajo: " << z.glegajo() << "\nDNI: " << z.gdni();
    z.imprimeNotas();
    return out;
}
