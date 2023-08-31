#include <iostream>
#include <Matriz.h>

using namespace std;

int main() {
    Matriz m{2, 2};
    for( unsigned int i = 0; i < 2; i++ ) {
        for(unsigned int j = 0; j < 2; j++)
            m.set(i, j, i + 7);
    }
    cout << "Matriz m: " << endl;
    cout << m << endl;

    Matriz e{m};

    e.set(0, 0, 5);
    e.set(1, 1, 10);

    cout << "Matriz e: " << endl;
    cout << e << endl;

    Matriz f{ m };

    f = m*e;

    cout << "Matriz f = m * e: " << endl;
    cout << f << endl;

    f += f;

    cout << "f += f: " << endl;
    cout << f << endl;

    return 0;
}

