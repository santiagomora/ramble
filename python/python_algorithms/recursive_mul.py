# !/usr/bin/python3
import math
from typing import Tuple
import sys
#incompleto
def len(num:int)->int:
    return 1 if num == 0 else int(math.log10(num))+1;

def break_num(num:int) -> Tuple[int,int]: 
    len_num:int = len(num);
    half: int = int(len_num/2);
    return ( num if len_num==1 else int(num/(10**half)), 
             0 if len_num==1 else num%(10**(len_num-half)) );

def join(a:int,b:int,c:int,d:int) -> int:
    len_a = len(a);
    len_c = len(c);
    return (10**(len_a+len_c))*rec_mul(a,c) + (10**(len_a))*rec_mul(a,d) + (10**(len_c))*rec_mul(b,c) + rec_mul(b,d);

def rec_mul(a:int,b:int) -> int:
    if len(a)==1 and len(b)==1:
        return a*b;
    (ma, mb) = break_num(a); # 3,0
    (mc, md) = break_num(b); # 1,0
    return join(ma,mb,mc,md)

print(rec_mul(int(sys.argv[1]),int(sys.argv[2])));
