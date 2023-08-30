#include <iostream>
#include <Alumno.h>

using namespace std;

int main(){
    Alumno a{"Augusto", "Santini", 37993040, 1491970};

    cout << a << endl;

    a.asignar_nota(0, 5);
    a.asignar_nota(5, 7);

    cout << a << endl;
}
