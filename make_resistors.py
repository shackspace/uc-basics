import sys
import re

if __name__=='__main__':
    color = [   '000000', '990000', 'ff0000', 'ff6600', 'ffff00', '00ff00', '0033ff', 'ff00ff', 'c0c0c0', 'ffffff',
                'ffcc00', 'cccccc']

    replacedict = {
        'FILL_RING1': color[int(sys.argv[2])],
        'FILL_RING2': color[int(sys.argv[3])],
        'FILL_RING3': color[int(sys.argv[4])],
        'FILL_RING5': color[int(sys.argv[5])],
    }

    pattern = re.compile(r'\b(' + '|'.join(replacedict.keys()) + r')\b')
    
    with open(sys.argv[1], 'r') as myfile:
        content = myfile.read()
        print pattern.sub(lambda x: replacedict[x.group()], content)
