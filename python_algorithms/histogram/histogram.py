# !/usr/bin/python3
import sys
from typing import List
from binary_search import bin_search
import re
import functools 

def softerase(words,w) -> List[str]:
    return ['' if i==w else i for i in words];

def countoccurrences( words : List[str] ,hist : dict ) -> dict:
    for w in words:
        if len(w)<=0:
            continue;
        hist[w] = hist.get(w,0) + bin_search(words,w);
        words = softerase(words,w)
    return hist

def histogram( text ) -> dict:
    words: List[str];
    hist: dict = {}
    for line in text:
        countoccurrences( re.compile('\W+').split(line.lower()),hist ) 
    return hist; 

fname: str = sys.argv[1]

try: 
    text = open(fname,'r')
except:
    print('cant open',fname);

hist = histogram(text)
totalwords = functools.reduce(lambda a,b : a+b,hist.values()) 
mostcommon = sorted( [(val,key) for key,val in hist.items()],reverse=True  )

print(mostcommon[:10])
