from queue import Queue
from typing import Dict, List, Union

# El tipo de fila debería ser Queue[int], pero la versión de python del CMS no lo soporta. Usaremos en su lugar simplemente "Queue"
comportamiento_cajas: Dict[str, Dict[str, Union[int, Dict[str, Union[str, int]]]]] = {
	'1': {'empieza': 1, 'intervalo':10},
	'2': {'empieza': 3, 'intervalo':4},
	'3': {'empieza': 2, 'intervalo':4, 'post_despacho':{'accion':'reingreso', 'luego_de':3}}
};

intervalo_llegada_persona: int = 4

def procesar_post_despacho(fila: Queue[int], pendientes: List[Dict[str, Union[str, int]]]):
	for pd in pendientes:
		pd['luego_de'] -= 1
		if pd['luego_de'] == 0:
			if pd['accion'] == 'reingreso':
				fila.put(pd['cliente'])
			pendientes.remove(pd)
	
def avanzarFila(fila: Queue[int], min: int):
	#implementar función
	post_despacho_pendiente = []
	total_fila = fila.qsize()
	for i in range(0, min+1):
		if i%intervalo_llegada_persona == 0: # llega una nueva persona
			total_fila+=1
			fila.put(total_fila)
		procesar_post_despacho(fila, post_despacho_pendiente)
		for caja in comportamiento_cajas:
			empieza = comportamiento_cajas[caja]['empieza']
			intervalo = comportamiento_cajas[caja]['intervalo']
			if (i-empieza)%intervalo == 0 and not fila.empty(): # atiende la caja
				cliente = fila.get()
				post_despacho = comportamiento_cajas[caja].get('post_despacho', None)
				if not post_despacho is None:
					post_despacho = post_despacho.copy()
					post_despacho['cliente'] = cliente
					post_despacho_pendiente.append(post_despacho)

if __name__ == '__main__':
	fila: Queue[int] = Queue()
	fila_inicial: int = int(input())
	for numero in range(1, fila_inicial+1):
		fila.put(numero)
	min: int = int(input())
	avanzarFila(fila, min)
	res = []
	for i in range(0, fila.qsize()):
		res.append(fila.get())
	print(res)


# Caja1: Empieza a atender 10:01, y atiende a una persona cada 10 minutos
# Caja2: Empieza a atender 10:03, atiende a una persona cada 4 minutos
# Caja3: Empieza a atender 10:02, y atiende una persona cada 4 minutos, pero no le resuelve el problema y la persona debe volver a la fila (se va al final y tarda 3 min en llegar. Es decir, la persona que fue atendida 10:02 vuelve a entrar a la fila a las 10:05)
# La fila empieza con las n personas que llegaron antes de que abra el banco. Cuando abre (a las 10), cada 4 minutos llega una nueva persona a la fila (la primera entra a las 10:00)

