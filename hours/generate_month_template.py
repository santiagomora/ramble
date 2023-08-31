import sys 
from os import path,getcwd
from datetime import datetime
from calendar import monthrange

def generate_month_file(month): 

	if month<1 or month>12: 
		raise Exception( 'Invalid month.' ); 
	
	date = datetime.strptime('{0}/{1}'.format(month,datetime.today().year),'%m/%Y');
	filename = date.strftime('%m%y');

	with open( path.join( path.join( path.expanduser('~'),"horas"),filename ),'x') as f:
		(wd,days) = monthrange(date.year,date.month); 

		for day in range(1,days+1): 
			d = datetime.strptime('{0}/{1}/{2}'.format(day,date.month,date.year),'%d/%m/%Y');
			if d.strftime('%A') in ('Sunday', 'Saturday'):
				f.write(d.strftime('%d - finde \n'))
			else: 
				f.write(d.strftime('%d - \n'))


if len(sys.argv) < 2 :
	raise Exception('Invalid argument count.');

args = sys.argv; 
args.pop(0);
generate_month_file(int(args[0]));
