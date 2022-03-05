#include "Str.h"

/*
 * constructor por defecto
 * */
Str::Str (void) {
    this->p = NULL;
    this->len = 0;
}

/*
 * constructor de copia
 * */
Str::Str (const Str& z){
    this->len = z.len;
    p = new char [this->len];
    Strcpy (p, z.p, this->len);
   // cout << "\nConstructor de copia "<< endl;
}

/*
 * constructor parametrizado.
 * */
Str::Str (char *cad){ //
   this->len = Strlen(cad);
   this->p = new char [this->len+1];
   Strcpy( this->p, cad, this->len+1 );
   //cout <<"\nConstructor parametrizado : " << endl;
}

/*
 * Destructor.
 * */
Str::~Str (){
    this->deleteStr();      // libero memoria pedida
}

/*
 * liberar recursos
 * */
int Str::deleteStr(){
    if (this->p)
        delete this->p;
    return 0;
}

/*
 * reinicia el Str
 * */
void Str::reinicia( char* tar, int nsize ){
    this->deleteStr();
    this->p = new char [nsize+1];
    Strcpy( this->p,tar,nsize+1 );
}

/*
 * Imprimir
 * */
void Str::mostrar(){
    cout<<"\t"<<p<<endl;
}

// SOBRECARGA OPERADORES-------------------------------------------------------------------------
/*
 * operador de asignación: Un objeto igual a otro objeto
 * */
Str& Str::operator= (const Str& z){
    this->reinicia( z.p,Strlen(z.p) );
    return *this;  // devuelvo el propio objeto para poder
                   // hacer múltiples (a=b=c=d)
}

/*
 * operador de asignación: Un objeto igual a una cadena
 * */
Str& Str::operator= ( char *cad ){
    this->reinicia( cad,Strlen(cad) );
    return *this;    //devuelvo el propio objeto garantizando operaciones
                     //múltiples (a=b=c=d)
}

/*
 * Operador suma: Un objeto + otro objeto
 * agrega un espacio entre las dos cadenas a concatenar
 * */
Str Str::operator+ ( const Str& z ){
    char* ns = Strcat( this->p,z.p );
    return Str(ns);
}

/*
 * Operador suma: Un objeto + otro objeto
 * agrega un espacio entre las dos cadenas a concatenar
 * */
Str Str::operator+ ( char* z ){
    char* ns = Strcat( this->p,z );
    return Str(ns);
}

/*
 * Operador suma-igual (entre dos objetos)
 * por modificar el argumento implícito, aquí SI devuelvo una referencia
 * */
Str& Str::operator+= (const Str& z){ //x ejemplo b+=a
    char* ns = Strcat( this->p,z.p );
    this->reinicia( ns,Strlen(ns) );
    return *this;
}

 /*
  * Operador suma-igual (un objeto += una cadena)
  * */
Str& Str::operator+= (char* cad){
    char* ns = Strcat( this->p,cad );
    this->reinicia( ns,Strlen(ns) );
    return *this;
}

/*
 * Igualdad
 * */
bool Str::operator==( Str& S) {
    int i=0;
    while ((p[i]) && ( S.p[i])&& (p[i])==(S.p[i]))
         i++;

    if (((p[i])==('\0')) && ((S.p[i])==('\0'))){
        cout<<"las cadenas son iguales";
        return 1;
    }

    cout<<"las cadenas son diferentes";
    return 0;
}

// SOBRECARGA OPERADORES FRIEND-----------------------------------------------------------------
/*
 * Sobrecarga '!=' como friend
 * */
int operator!= (const Str& z1, const Str& z2){
    if ( Str::Strcmp(z1.p,z2.p)==0 )
        return 0;
    return 1;
}

/*
 * SOBRECARGA DEL '+' COMO friend
 * */
Str operator+ (const char *cad, const Str& z){
    char* ns = z.Strcat( cad,z.p );
    return Str(ns);
}

/*
 * SOBRECARGA DE cout COMO friend
 * */
ostream& operator<< (ostream& out, const Str& z){
    out << z.p;
    return out;
}

/*
 * SOBRECARGA DE '==' COMO friend
 * */
int operator== (const Str& z1, const Str& z2){
   return ( Str::Strcmp(z1.p, z2.p)==0 )
           ? 1
           : 0;
}

// METODOS ESTATICOS-----------------------------------------------------------------------------
/*
 *  comparo el objeto con una cadena
 *  Retorna 0 si son iguales
 *         1 si el obj implicito es mayor
 *        -1 si el obj implicito es menor
 * */
int Str::Strcmp(const char *s){
    int i=0;
    while((p[i]) && (s[i]) && (p[i]==s[i]))
       i++;
    if (((p[i])==('\0')) && ((s[i])==('\0'))) {
        cout<<"las cadenas son iguales";
        return 0;
    } else
        if((p[i])>(s[i])) {
            cout<<"las cadena implicita es mayor";
            return 1;
        }
    cout<<"las cadena implicita es menor";
    return -1;
}

/*
 *  comparo el objeto con otro objeto
 *  Retorna 0 si son iguales
 *          1 si el obj implicito es mayor
 *         -1 si el obj implicito es menor
 * */
int Str::Strcmp(Str &S){
    int i=0;

    while((p[i]) && (S.p[i]) && (p[i]==S.p[i]))
       i++;

    if (((p[i])==('\0')) && ((S.p[i])==('\0'))) {
        cout<<"Los objetos Str son iguales";
        return 0;
    } else
        if((p[i])>(S.p[i])) {
            cout<<"las cadena implicita es mayor";
            return 1;
        }
    cout<<"las cadena implicita es menor";
    return -1;
}

/*
 * A = B;   A.operator=(B)
 * */
int Str::Strlen(const char * p ) {
    int cont = 0;
    const char* aux;
    aux=p;
    while ( *aux ){
        cont++;
        aux++;
    }
    return cont;
}

/*
 * Str copy
 * */
char * Str::Strcpy( char * d ,const char * o, unsigned int n ){
    for (unsigned int i=0; i<n; i++ )
        d[i] = o[i];
    d[n-1] = '\0';
    return d;
}


/*
 * Str concatenate
 * */
char* Str::Strcat( const char* dest, const char* tar ){
    int dlen = Strlen(dest),
        tlen = Strlen(tar),
        nl = tlen+dlen;
    char* res = new char[nl+1];
    for ( int i=0; i<nl; i++ ){
        res[i] = ( i<dlen )
                ? dest[i]
                : tar[i-dlen];
    }
    res[nl] = '\0';
    return res;
}

/*
 * Comparar Strs
 * */
int Str::Strcmp(const char* s1, const char*  s2){
    int i=0;
    while(s1[i] && s2[i] && s1[i]==s2[i])
       i++;

    if (s1[i]<s2[i])
        return -1;
    else if (s1[i]>s2[i])
        return 1;
    return 0;
}
