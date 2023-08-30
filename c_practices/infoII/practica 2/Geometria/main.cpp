
#include <iostream>
#include <Punto.h>

using namespace std;

int main() {
    Punto a{};
    Punto b{1, 1};

    cout << (a + b).get_y() << endl;

    if(a == b)
        cout << "a y b son iguales" << endl;
    else
        cout << "a y b son distintos" << endl;

    Punto c = a - b;
    c += Punto{1, 1};

    if(a == c)
        cout << "a y c son iguales" << endl;
    else

        cout << "a y c son distintos" << endl;
    cout << "Distancia del punto a al punto b: " << a.distancia(b) << endl;
}

