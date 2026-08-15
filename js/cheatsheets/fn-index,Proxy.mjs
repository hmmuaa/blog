import'#g'
///proxy indexed-getter 用在fs.samples
var
a=new Proxy({},{get:function(target,v){return v**2}})
eq(a[3],9)
a=new Proxy({},{get(target,v){return v**2}})
eq(a[3],9)
a=new Proxy({},{get:(target,v)=>v**2})
eq(a[3],9)

///给数组做proxy
///Redu 2026-08-11 stackoverflow.com/a/40030158
function ProxyMaker(a){
    return new Proxy(a, {
        get: function(target, property, receiver) {
            console.log(target+"'s "+property+" property has been accessed");
            return target[property];
        },
        set: function(target, property, value, receiver) {
            console.log(target+"'s "+property+" property has been modified");
            return target[property] = value;
        },
        has: function(target, property) {
            console.log(target+"'s "+property+" property has been checked");
            return Reflect.has(target, property); // 10x to @Bergi
        }
    });
}

var p = ProxyMaker([]);
p[0] = 1;
p[0];
p.push(10);
p.unshift(7);
console.log(JSON.stringify(p))

///@Santiago M. 2026-08-11 stackoverflow.com/a/77911065
class List {    
    constructor() {
        const isIndex = input => !!input.match(/^\d+$/)
        return new Proxy({}, {
            // also available: "delete", "has", ...
            get: (target, prop, receiver) => {
                if (isIndex(prop)) {
                    console.log(`getting List[${prop}]`)
                    return `value${prop}`
                } else {
                    return Reflect.get(target, prop, receiver)
                }
            },
            set: (target, prop, receiver) => {
                if (isIndex(prop)) {
                    console.log(`setting List[${prop}]`)
                    return 1
                    // ...
                } else {
                    return Reflect.set(target, prop, receiver)
                }
            }
        })
    }
}
const list = new List()
list[3] === "value3" // "getting List[3]"
list[3] = 9 // "setting List[3]"
