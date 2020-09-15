
function quadratic(a, b, c)
{
    if(a==0)
    {
        if(b==0)
        {
            return[];
        }
        else 
        {
            console.log(-c+'/'+b);
            return [-c/b];
        }
    }
    else 
    {
        var delta = b*b-4*a*c;
        if(delta<0)
        {
           return [];
        }
        else 
        {
            if(delta==0 )
            {
                console.log(-b+'/'+(2*a));
                return -b/(2*a);
            }
            else 
            {
                var roots;
                roots=['('+(-b)+'-sqrt('+delta+'))/('+2*a+')', '('+(-b)+'+ sqrt('+delta+'))/('+2*a+')'];
                console.log(roots);
                return roots;
                //console.log(-b-Math.sqrt(delta)/(2*a), -b+Math.sqrt(delta)/(2*a));
                //return [-b-Math.sqrt(delta)/(2*a), -b+Math.sqrt(delta)/(2*a)];
            }
        }
    }
}

function cuberoot(x)
{
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}
