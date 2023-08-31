#include <iostream>
#include <Lista.h>

using namespace std;

int main() {

    Lista<int> l;
    int busqueda = 5;
    int id;

    l.append(10);
    l.append(100);
    l.append(1);
    l.append(16);
    l.append(20);
    l.prepend(5);
    l[-1] = 4;

    cout << "lista" << endl << l;

    l.search(busqueda,id,false);

    cout << "removido:" << l.remove(3) << endl;

    cout << "lista" << endl << l;
}
