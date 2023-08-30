#include "Matriz.h"

void Matriz::deleteMatriz(){
    for ( unsigned int i=0; i<this->rows; i++ )
        delete [] this->elems[i];
    delete [] this->elems;
}

void Matriz::initMatriz( unsigned int rows, unsigned int cols ){
    this->rows = rows;
    this->cols = cols;
    this->elems = new double*[this->rows];
    for( unsigned int i = 0; i<this->rows; i++ )
        this->elems[i] = new double[this->cols];
}


Matriz::Matriz( unsigned int r, unsigned int c ) {
    if ( r==0 && c==0 )
        throw Matriz::ErrorDimensional();
    this->initMatriz( r,c );
}

Matriz::Matriz( Matriz &m ) {
    this->initMatriz( m.grows(), m.gcols() );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->elems[i][j] = m.at( i,j );
        }
    }
}

Matriz::~Matriz( ) {
    this->deleteMatriz();
}

unsigned int Matriz::grows() const{
    return this->rows;
}

unsigned int Matriz::gcols() const{
    return this->cols;
}

void Matriz::asignar( double value ){
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->elems[i][j] = value;
        }
    }
}

void Matriz::checkErrorRango(  unsigned int row, unsigned int col  ) const {
    if ( row > this->rows || col > this->cols )
        throw Matriz::ErrorRango();
}

void Matriz::checkCrossErrorRango(  unsigned int row, unsigned int col  ) const {
    if ( row != this->cols && col != this->rows )
        throw Matriz::ErrorRango();
}

double Matriz::at( unsigned int row, unsigned int col ) const {
    this->checkErrorRango(row,col);
    return this->elems[row][col];
}


void Matriz::set( unsigned int row, unsigned int col, double value ) {
    this->checkErrorRango(row,col);
    this->elems[row][col] = value;
}

Matriz& Matriz::operator=( const Matriz &m ){
    this->deleteMatriz();
    this->initMatriz( m.grows(),m.gcols() );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->elems[i][j] = m.at( i,j );
        }
    }
    return *this;
}

Matriz Matriz::operator+(const Matriz &m) const {
    const unsigned int rows = m.grows();
    const unsigned int cols = m.gcols();
    this->checkErrorRango( rows,cols );
    Matriz res( rows,cols );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            res.set( i,j, this->elems[i][j] + m.at( i,j ) );
        }
    }
    return res;
}

Matriz Matriz::operator+(double v) const {
    Matriz res ( this->grows(),this->gcols() );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            res.set( i,j, this->elems[i][j] + v );
        }
    }
    return res;
}

void Matriz::operator+=(const Matriz & m){
    this->checkErrorRango( m.grows(),m.gcols() );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->set( i,j, this->elems[i][j] + m.at(i,j) );
        }
    }
}

void Matriz::operator+=(double v){
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->set( i,j, this->elems[i][j] + v );
        }
    }
}

Matriz Matriz::operator-(const Matriz &m) const{
    const unsigned int rows = m.grows();
    const unsigned int cols = m.gcols();
    this->checkErrorRango( rows,cols );
    Matriz res( rows,cols );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            res.set( i,j, this->elems[i][j] - m.at( i,j ) );
        }
    }
    return res;
}

Matriz Matriz::operator-(double v) const{
    Matriz res( rows,cols );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            res.set( i,j, this->elems[i][j] - v );
        }
    }
    return res;
}

void Matriz::operator-=(const Matriz & m){
    const unsigned int rows = m.grows();
    const unsigned int cols = m.gcols();
    this->checkErrorRango( rows,cols );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->set( i,j, this->elems[i][j] - m.at( i,j ) );
        }
    }
}

void Matriz::operator-=(double v){
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->set( i,j, this->elems[i][j] - v );
        }
    }
}

Matriz Matriz::operator*(const Matriz &m) const{
    double sum =0;
    this->checkCrossErrorRango( m.grows(),m.gcols() );
    Matriz res( this->grows(),m.gcols() );
    for (unsigned int k = 0; k < m.gcols(); k++) {
        for (unsigned int i = 0; i < this->grows(); i++) {
            sum = 0;
            for (unsigned int j = 0; j < m.gcols(); j++)
                sum += this->at(i,j) * m.at(j,k);
            res.set( i,k,sum );
        }
    }
    return res;
}

Matriz Matriz::operator*(double v) const{
    Matriz res( rows,cols );
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            res.set( i,j, this->elems[i][j] * v );
        }
    }
    return res;
}

void Matriz::operator*=(const Matriz & m){
    double suma =0;
    this->checkCrossErrorRango( m.grows(),m.gcols() );
    for (unsigned int k = 0; k < m.gcols(); k++) {
        for (unsigned int i = 0; i < this->grows(); i++) {
            suma = 0;
            for (unsigned int j = 0; j < m.gcols(); j++)
                suma += this->at(i,j) * m.at(j,k);
            this->set(i,k,suma);
        }
    }
}

void Matriz::operator*=(double v){
    for( unsigned int i = 0; i<this->rows; i++ ){
        for( unsigned int j = 0; j<this->cols; j++ ){
            this->set( i,j, this->elems[i][j]*v );
        }
    }
}


ostream& operator<< (ostream& out, const Matriz& z){
    for( unsigned int i = 0; i<z.grows(); i++ ){
        out << "(";
        for( unsigned int j = 0; j<z.gcols(); j++ ){
            out << z.at( i,j );
            if ( j<z.gcols()-1 )
                out << ",";
        }
        out << ")" << endl;
    }
    return out;
}
