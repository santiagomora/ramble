# !/usr/bin/python3
from typing import List,Tuple

def bin_search(words:List[str],find:str) -> int: #List[Tuple[str,int]]:
    ln: int = len(words);
    half : int = int(ln/2);
    if ln==1:
        return 1 if find==words[half] else 0;
    return bin_search(words[:half],find) + bin_search(words[half:],find);
