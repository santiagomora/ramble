#ifndef STR_H
#define STR_H

#include <iostream>
#include <cstring>
#include <iomanip>
#include <cstdlib>
#include <cstdio>
#include <string.h>

using namespace std;

class Str {
    private:
       char *p;
       int len;
       int deleteStr();
       void reinicia( char*,int );

    public:
        Str(void);
        Str (char *);
        Str (const Str&);
        ~Str();

        Str& operator=  (const Str&);     //1
        Str& operator=  (char *);            //2
        Str  operator+  (const Str&);    //3   A=B+C
        Str  operator+ ( char* );
        Str& operator+= (const Str&);     //4   A+=B
        Str& operator+= (char* s);           //5   A+="yyyyy"
        bool operator ==(Str&);              //6
        void mostrar(void);                     //7
        int Strcmp(const char *);            //8  comparar : *this->p con char*
        int Strcmp(Str &);                //9  comparar : *this->p con B.p
        int getlen();

    static  char*  Strcat( const char* dest, const char* tar );
    static  int    Strlen(const char* p );              //10
    static  char*  Strcpy( char* d ,const char* o, unsigned int n  );    //11
    static  int    Strcmp(const char *, const char* );  //16

    friend Str operator+ (const char*, const Str&);     //12 C="xyxy"+B;
    friend ostream& operator<< (ostream& , const Str& );   //13
    friend int operator== (const Str&, const Str&);     //14
    friend int operator!= (const Str&, const Str&);     //15   (A!=B)

};

#endif // STR_H
