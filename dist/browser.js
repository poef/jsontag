(()=>{let e=JSON.stringify,t=new WeakMap,r=e=>{if(t.has(e)){let r=t.get(e);if(r.type)return r.type}return Array.isArray(e)?"array":typeof e},a=["object","array","string","number","boolean","decimal","money","uuid","url","link","date","time","datetime","duration","timestamp","text","blob","color","email","hash","phone","int","int8","int16","int32","int64","uint","uint8","uint16","uint32","uint64","float","float32","float64"],n=(e,r)=>{if("object"!=typeof e)throw TypeError("JSONTag can only add attributes to objects, convert literals to objects first");let n={};if(t.has(e)&&(n=t.get(e)),!a.includes(r))throw TypeError("unknown type "+r);n.type=r,void 0===n.attributes&&(n.attributes={}),t.set(e,n)},o=(e,r,a)=>{if("object"!=typeof e)throw TypeError("JSONTag can only add attributes to objects, convert literals to objects first");if(Array.isArray(a)&&(a=a.join(" ")),"string"!=typeof a)throw TypeError("attribute values must be a string or an array of strings");if(-1!==a.indexOf('"'))throw TypeError('attribute values must not contain " character');-1!==a.indexOf(" ")&&(a=a.split(" "));let n=t.get(e)||{attributes:{}};n.attributes[r]=a,t.set(e,n)},i=(e,t)=>{if("object"!=typeof e)throw TypeError("JSONTag can only add attributes to objects, convert literals to objects first");if("object"!=typeof t)throw TypeError("attributes param must be an object");Object.keys(t).forEach(r=>{o(e,r,t[r])})},s=(e,r)=>(t.get(e)||{attributes:{}}).attributes[r],u=e=>Object.assign({},(t.get(e)||{attributes:{}}).attributes),c=e=>{let t=r(e),a=Object.entries(u(e)).map(([e,t])=>(Array.isArray(t)&&(t=t.join(" ")),e+'="'+t+'"')).join(" ");return(a||-1===["object","array","string","number","boolean"].indexOf(t)||(t=""),t||a)?"<"+[t,a].filter(Boolean).join(" ")+">":""};class l{constructor(){return new Proxy(this,{get:(e,t)=>{if(void 0!==e[t])return e[t];if("then"!=t)throw console.error("Attempting to get from Null",t,typeof t,JSON.stringify(t)),Error("Attempting to get "+t+" from Null")},set:(e,t,r)=>{throw console.error("Attempting to set "+t+" in Null to",r),Error("Attempting to set "+t+" in Null")}})}}class f extends l{isNull=!0;toString(){return""}toJSON(){return"null"}toJSONTag(){return c(this)+this.toJSON()}}window.JSONTag={Null:f,stringify:(t,a=null,n="")=>{let i=new WeakMap,u="",l="";if("number"==typeof n?u+=" ".repeat(n):"string"==typeof n&&(u=n),a&&"function"!=typeof a&&("object"!=typeof a||"number"!=typeof a.length))throw Error("JSONTag.stringify");let f=e=>{let t=l;l+=u;let r="",n="",o=Object.keys(e);Array.isArray(a)&&(o=o.filter(e=>-1!==a.indexOf(e))),l&&(r="\n"+l,n="\n"+t);let i=r+o.map(t=>'"'+t+'":'+b(t,e)).join(","+r)+n;return l=t,i},d=e=>{let t=l,r="",a="";(l+=u)&&(r="\n"+l,a="\n"+t);let n=r+e.map((t,r)=>b(r,e)).join(","+r)+a;return l=t,n},b=(t,u)=>{let l=u[t];if("function"==typeof a&&""!==t&&(l=a.call(u,t,l)),"object"==typeof l&&i.has(l)){let e=s(l,"id");return e||(e=function(e){if("undefined"==typeof crypto)throw console.error("JSONTag: cannot generate uuid, crypto support is disabled."),Error("Cannot create links to resolve references, crypto support is disabled");if("function"==typeof crypto.randomUUID)var t=crypto.randomUUID();else var t="10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16));return o(e,"id",t),t}(l)),'<link>"'+e+'"'}if(null==l)return"null";if("object"==typeof l&&i.set(l,!0),"function"==typeof l.toJSONTag)return l.toJSONTag(i,a,n);if(Array.isArray(l))return c(l)+"["+d(l)+"]";if(!(l instanceof Object))return e(l,a,n);switch(r(l)){case"string":case"decimal":case"money":case"link":case"text":case"blob":case"color":case"email":case"hash":case"duration":case"phone":case"url":case"uuid":case"date":case"time":case"datetime":return c(l)+e(""+l,a,n);case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float":case"float32":case"float64":case"timestamp":case"number":case"boolean":return c(l)+e(l,a,n);case"array":let b=d(l);return c(l)+"["+b+"}";case"object":if(null===l)return"null";let y=f(l);return c(l)+"{"+y+"}";default:throw Error(r(l)+" type not yet implemented")}};return b("",{"":t})},parse:function(e,t,a){let o,s,u,c;a||(a={}),a.index||(a.index={}),a.index.id||(a.index.id=new Map),a.unresolved||(a.unresolved=new Map),a.baseURL||(a.baseURL="http://localhost/");let l={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},d=function(t){let r=e.substring(o-100,o+100);throw{name:"SyntaxError",message:t,at:o,input:r}},b=function(t){return t&&t!==s&&d("Expected '"+t+"' instead of '"+s+"'"),s=e.charAt(o),o+=1,s},y=function(e){let t="";for("-"===s&&(t="-",b("-"));s>="0"&&s<="9";)t+=s,b();if("."===s)for(t+=".";b()&&s>="0"&&s<="9";)t+=s;if("e"===s||"E"===s)for(t+=s,b(),("-"===s||"+"===s)&&(t+=s,b());s>="0"&&s<="9";)t+=s,b();let r=new Number(t).valueOf();if(e)switch(e){case"int":h(t);break;case"uint":h(t,[0,1/0]);break;case"int8":h(t,[-128,127]);break;case"uint8":h(t,[0,255]);break;case"int16":h(t,[-32768,32767]);break;case"uint16":h(t,[0,65535]);break;case"int32":h(t,[-2147483648,2147483647]);break;case"uint32":h(t,[0,4294967295]);break;case"timestamp":case"int64":h(t,[-0x8000000000000000,0x7fffffffffffffff]);break;case"uint64":h(t,[0,18446744073709552e3]);break;case"float":m(t);break;case"float32":m(t,[-34e37,34e37]);break;case"float64":m(t,[-17e307,17e307]);break;case"number":break;default:p(e,t)}return r},p=function(e,t){d("Syntax error, expected "+e+", got: "+t)},g={color:/^(rgb|hsl)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i,email:/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,uuid:/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,decimal:/^\d*\.?\d*$/,money:/^[A-Z]+\$\d*\.?\d*$/,duration:/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,phone:/^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/,time:/^(\d{2}):(\d{2})(?::(\d{2}(?:\.\d+)?))?$/,date:/^-?[1-9][0-9]{3,}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])$/,datetime:/^(\d{4,})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}(?:\.\d+)?))?$/,range:/^\[-?(\d+\.)?\d+\,-?(\d+\.)?\d+\]$/},m=function(e,t){let r=new Number(parseFloat(e)),a=r.toString();e!==a&&d("Syntax Error: expected float value"),t&&("number"==typeof t[0]&&r<t[0]&&d("Syntax Error: float value out of range"),"number"==typeof t[1]&&r>t[1]&&d("Syntax Error: float value out of range"))},h=function(e,t){let r=new Number(parseInt(e)),a=r.toString();e!==a&&d("Syntax Error: expected integer value"),t&&("number"==typeof t[0]&&r<t[0]&&d("Syntax Error: integer value out of range"),"number"==typeof t[1]&&r>t[1]&&d("Syntax Error: integer value out of range"))},x=function(e){let t=!1;return"#"===e.charAt(0)?(t=[3,4,6,8].indexOf((e=e.substring(1)).length)>-1&&!isNaN(parseInt(e,16))).toString(16)!==e&&p("color",e):t=g.color.test(e),t||p("color",e),!0},S=function(e){try{return new URL(e,a.baseURL),!0}catch(t){console.log(t),p("url",e)}},w=function(e,t){if(e){switch(e){case"object":case"array":case"boolean":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"int":case"uint":case"float32":case"float64":case"float":case"timestamp":p(e,t);break;case"uuid":return g.uuid.test(t)||p("uuid",t),!0;case"decimal":return g.decimal.test(t)||p("decimal",t),!0;case"money":return g.money.test(t)||p("money",t),!0;case"url":return S(t);case"link":case"string":case"text":case"blob":case"hash":return!0;case"color":return x(t);case"email":return g.email.test(t)||p("email",t),!0;case"duration":return g.duration.test(t)||p("duration",t),!0;case"phone":return g.phone.test(t)||p("phone",t),!0;case"range":return g.range.test(t)||p("range",t),!0;case"time":return g.time.test(t)||p("time",t),!0;case"date":return g.date.test(t)||p("date",t),!0;case"datetime":return g.datetime.test(t)||p("datetime",t),!0}d("Syntax error: unknown tagName "+e)}},k=function(e){let t="",r,a,n;for('"'!==s&&d("Syntax Error"),b('"');s;){if('"'===s)return b(),w(e,t),t;if("\\"===s){if(b(),"u"===s){for(a=0,n=0;a<4&&isFinite(r=parseInt(b(),16));a++)n=16*n+r;t+=String.fromCharCode(n),b()}else if("string"==typeof l[s])t+=l[s],b();else break}else t+=s,b()}d("Syntax error: incomplete string")},v=function(){let e,t,r={attributes:{}};for("<"!==s&&d("Syntax Error"),b("<"),(e=j())||d("Syntax Error: expected tag name"),r.tagName=e,A();s;){if(">"===s)return b(">"),r;(e=j())||d("Syntax Error: expected attribute name"),A(),b("="),A(),t=k(),r.attributes[e]=t,A()}d("Syntax Error: unexpected end of input")},A=function(){for(;s;)switch(s){case" ":case"	":case"\r":case"\n":b();break;default:return}},j=function(){let e="";for(s>="a"&&s<="z"||s>="A"&&s<="Z"?(e+=s,b()):d("Syntax Error: expected word");s>="a"&&s<="z"||s>="A"&&s<="Z"||s>="0"&&s<="9"||"_"==s;)e+=s,b();return e},E=function(e){let t=j();switch(t&&"string"==typeof t||d('Syntax error: expected boolean or null, got "'+t+'"'),t.toLowerCase()){case"true":return e&&"boolean"!==e&&p(e,t),!0;case"false":return e&&"boolean"!==e&&p(e,t),!1;case"null":return null;default:d('Syntax error: expected boolean or null, got "'+t+'"')}},N=function(e,t,n){if("link"===r(e)){let r=""+e,o=a.unresolved.get(r);void 0===o&&(a.unresolved.set(r,[]),o=a.unresolved.get(r)),o.push({src:new WeakRef(t),key:n})}},O=function(){let e,t=[];if("["!==s&&d("Syntax error"),b("["),A(),"]"===s)return b("]"),t;for(;s;){if(e=u(),N(e,t,t.length),t.push(e),A(),"]"===s)return b("]"),t;b(","),A()}d("Input stopped early")},T=function(){let e,t,r={};if("{"!==s&&d("Syntax Error"),b("{"),A(),"}"===s)return b("}"),r;for(;s;){if("__proto__"===(e=k())&&d("Attempt at prototype pollution"),A(),b(":"),t=u(),r[e]=t,N(t,r,e),A(),"}"===s)return b("}"),r;b(","),A()}d("Input stopped early")};u=function(){let e,t,r;switch(A(),"<"===s&&(r=(e=v()).tagName,A()),s){case"{":r&&"object"!==r&&p(r,s),t=T();break;case"[":r&&"array"!==r&&p(r,s),t=O();break;case'"':t=k(r);break;case"-":t=y(r);break;default:t=s>="0"&&s<="9"?y(r):E(r)}if(e){if(null===t&&(t=new f),"object"!=typeof t)switch(typeof t){case"string":t=new String(t);break;case"number":t=new Number(t);break;case"boolean":t=new Boolean(t);break;default:d("Syntax Error: unexpected type "+typeof t)}e.tagName&&n(t,e.tagName),e.attributes&&(i(t,e.attributes),e.attributes?.id&&a.index.id.set(e.attributes.id,new WeakRef(t)))}return t},o=0,s=" ",c=u(),A(),s&&d("Syntax error"),"function"==typeof t&&function e(n,o){var i,s,u=n[o];if(null!==u&&"object"==typeof u&&!(u instanceof String||u instanceof Number||u instanceof Boolean))for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(void 0!==(s=e(u,i))&&(void 0===u[i]||u[i]!==s)?(u[i]=s,"link"===r(s)&&N(s,u,i)):void 0===s&&delete u[i]);return t.call(n,o,u,a)}({"":c},"");let J=function(e,t){if(void 0!==t){let a=e.src.deref();if(void 0!==a&&"link"===r(a[e.key]))return a[e.key]=t,!0}};return a.index.id.size>a.unresolved.size?a.unresolved.forEach((e,t)=>{let r=a.index.id.get(t)?.deref();void 0!==r&&e.forEach((t,a)=>{J(t,r)&&delete e[a]})}):a.index.id.forEach((e,t)=>{let r=e.deref(),n=a.unresolved.get(t);void 0!==r&&void 0!==n&&(n.forEach((e,t)=>{J(e,r)}),a.unresolved.delete(t))}),c},getType:r,setType:n,getTypeString:c,setAttribute:o,getAttribute:s,addAttribute:(e,r,a)=>{if("string"!=typeof a)throw TypeError("attribute values must be a string");if(-1!==a.indexOf('"'))throw TypeError('attribute values must not contain " characters');let n=t.get(e)||{attributes:{}};void 0===n.attributes[r]?o(e,r,a):(Array.isArray(n.attributes[r])||(n.attributes[r]=[n.attributes[r]]),a=-1!==a.indexOf(" ")?a.split(" "):[a],n.attributes[r]=n.attributes[r].concat(a),t.set(e,n))},removeAttribute:(e,r)=>{let a=t.get(e)||{attributes:{}};void 0!==a.attributes[r]&&(delete a.attributes[r],t.set(e,a))},getAttributes:u,setAttributes:i,getAttributesString:e=>Object.entries(u(e)).map(([e,t])=>(Array.isArray(t)&&(t=t.join(" ")),e+'="'+t+'"')).join(" "),isNull:e=>null===e||void 0!==e.isNull&&e.isNull}})();
//# sourceMappingURL=browser.js.map
