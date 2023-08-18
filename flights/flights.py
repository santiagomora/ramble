
# todas las destinaciones en vuelo arreglo de la forma [(d1,d2),(d1,d3),(d2,d4),(d2,d3),(d4,d5)]
# d1 d2 d3 d4 d5
# dest/dest | d1 d2 d3 d4 d5
# ----------+---------------
# d1    | 0  1  1  0  0
# d2    | 0  0  1  1  0
# d3    | 0  0  0  0  0
# d4    | 0  0  0  0  1
# d5    | 0  0  0  0  0
#
# cada par en la matriz representa una conexion de un vuelo
# quiero encontrar la ruta desde d1 hasta d5
# entro en cada fila y empiezo a evaluar los elementos:
# indice: evalua fila, subindice evalua columna
# - si el elemento es 1:
# - si el subindice no corresponde a la fila que estoy buscando, me voy a la fila del subindice. por ejemplo en (d1,d2) = (0,1) hay 1, evaluo la fila 1
# - si el elemento no es 1, no hago nada.
# - si llego a la fila destino partiendo desde la origen, ya termino
def extract_single_values(value_pairs : list[tuple[str, str]]) -> list[str]:
	res = []
	for pair in value_pairs:
		if not pair[0] in res:
			res.append(pair[0])
		if not pair[1] in res:
			res.append(pair[1])
	return res

def generate_directed_graph(value_pairs : list[tuple[str, str]]) -> list[list[int]]:
	single_values = extract_single_values(value_pairs); graph = []
	for sv in single_values:
		row = []
		for _sv in single_values:
			row.append(1 if (sv, _sv) in value_pairs else 0)
		graph.append(row)
	return graph;

def get_route(v1: str, v2: str, value_pairs : list[tuple[str, str]]) -> list[list[str]]:
	single_values : list[str] = extract_single_values(value_pairs);
	graph : list[list[int]] = generate_directed_graph(value_pairs);
	candidates : list[list[str]] = [];
	def get_route_internal(at : int, candidate : list[str]):
		nonlocal single_values, graph, v2, candidates
		for dx, d in enumerate(graph[at]):
			dest = single_values[dx]
			if d == 1 and not dest in candidate:
				_candidate = candidate.copy()
				_candidate.append(dest)
				if v2 in _candidate:
					candidates.append(_candidate)
				else: 
					get_route_internal(dx, _candidate)
	get_route_internal(single_values.index(v1), [v1])
	return candidates

pairs = [('d1','d2'),('d1','d3'),('d2','d6'),('d2','d4'),('d4','d5'), ('d1','d7'), ('d7','d8'), ('d1', 'd5'), ('d8', 'd5')]
print(get_route('d1', 'd5', pairs))
