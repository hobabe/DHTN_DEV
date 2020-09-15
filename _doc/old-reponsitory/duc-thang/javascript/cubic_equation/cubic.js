function cubic(a, b, c, d)
{
    if(a==0) //if a=0, solves the quadratic equation 
    {
        quadratic(b, c, d);
    }
    else
    {
        var A=b/a, B=c/a, C=d/a; // put the equation in form of x^3 + ax^2 + bx + c=0
        var p=B-A*A/3, q=C+(2*Math.pow(A, 3)-9*A*B)/27; //put the equation form of t^3 + pt +q =0
        var roots;
        var delta=Math.pow(q, 2)/4+Math.pow(p, 3)/27;
        if (p==0) 
        { 
            roots = [cuberoot(-q)];
        } 
        else if (q ==0)
        { 
            // roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
            roots = [0-A/3].concat(p < 0 ? ['sqrt('+-p+') +'+'('+-A/3+')', '-sqrt('+-p+') + '+'('+-A/3+')'] : []);
        } 
        else 
        {
            var delta=Math.pow(q, 2)/4 + Math.pow(p, 3)/27;
            if (delta==0) // two roots
            {      
                roots = [-2*cuberoot(q/2)-A/3, cuberoot(q/2)-A/3];
            } 
            else if (delta > 0) // one root
            {            
                roots = [-1*cuberoot(q/2 + Math.sqrt(delta))-cuberoot(q/2 - Math.sqrt(delta))-A/3];
            }
            else //three roots includes complex root(s)
            {                        
               var u = 2*Math.sqrt(-p/3);
                //var u = 'sqrt('+-p/3+')';
                var t = Math.acos(3*q/p/u)/3;  
                var k = 2*Math.PI/3;
                root_temp = [u*Math.cos(t)-A/3, u*Math.cos(t-k)-A/3, u*Math.cos(t-2*k)-A/3];
                roots = [2*Math.cos(t)-A/3+'* sqrt('+-p+'/'+3+')', 2*Math.cos(t-k)-A/3+'* sqrt('+-p+'/'+3+')', 2*Math.cos(t-2*k)+'* sqrt('+-p+'/'+3+')'];

            }
        }
       
        // for (var i = 0; i < roots.length; i++)
        // {
        //     roots[i] -= A/3;
        // }
        console.log(roots);
        return roots;
    }
   
}
