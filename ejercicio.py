def pedir_entero (mensaje,min,max):
    numero = input(mensaje.format(min,max))
    if type(numero)==int:
        while numero <= min or numero>=max:
            numero = input("el numero debe estar entre {:d} y {:d} ".format(min,max))
        return numero
    else: 
        return "debes introducir un entero"

valido = pedir_entero("Cual es tu numero favorito entre {:d} y {:d}? ",-25,25)
if type(valido)==int:
    print("Has introducido un numero valido: {:d}".format(valido))
else :
    print(valido)