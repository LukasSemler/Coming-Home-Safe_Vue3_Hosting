import{u as k,r as d,U as B,V,a1 as D,a2 as E,W as j,a as h,c as v,b as a,e as t,k as A,w as i,g as e,H as C,I as F,p as M,F as P,a3 as T,M as N,f as x,j as R,x as m,X as $,A as z,l as G,D as p}from"./vendor.e8263742.js";import{_ as L}from"./index.8a98d230.js";const S=e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"},null,-1),I={class:"fixed z-10 inset-0 overflow-y-auto"},U={class:"flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"},q={class:"mt-3 text-center sm:mt-5"},H={class:"mt-2"},W={class:"text-sm text-gray-500 mb-3"},X={class:"mt-5 sm:mt-6 bg-chsBlue"},J={class:"min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"},K=e("div",{class:"sm:mx-auto sm:w-full sm:max-w-md"},[e("img",{class:"mx-auto h-12 w-auto",src:L,alt:"Electronic City"}),e("h2",{class:"mt-6 text-center text-3xl font-extrabold text-gray-900"},"Passwort vergessen"),e("h4",{class:"mx-16 mt-6 text-center text-sm font-small text-gray-900 sm:mx-0"}," Falls du dein Passwort vergessen hast, kannst du hier deinen Account wiederherstellen! ")],-1),O={class:"mt-8 sm:mx-auto sm:w-full sm:max-w-md"},Q={class:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"},Y={class:"space-y-6"},Z=e("label",{for:"email",class:"block text-sm font-medium text-gray-700"}," Email-Adresse ",-1),ee={class:"mt-1"},te={key:0,class:"mt-2 text-sm text-red-600",id:"email-error"},ne={setup(se){const w=k(),l=d(!1),r=d("Titel"),u=d("Text"),s=d(!1);let n=B({email:""});const g=V(()=>({email:{required:D,email:E}})),c=j(g,n);async function y(){if(console.log("VALID: "+await c.value.$validate()),await c.value.$validate()){const{status:o}=await T.post("/sendNewPassword",{email:n.email});o==200?(r.value="Ein voller Erfolg!",u.value="Du wirst binnen weniger Sekunden eine neue Email von uns in deinem Postfach erhlaten! Mit diesem Passwort kannst du deinen Account wiederherstellen.",l.value=!0,s.value=!1):(r.value="Da ist was schief gelaufen!",u.value="Leider ist etwas schief gelaufen. Bitte \xFCberpr\xFCfe deine Eingaben und versuch es erneut.",l.value=!0,s.value=!0)}else r.value="Da ist was schief gelaufen!",u.value="Leider ist etwas schief gelaufen. Bitte \xFCberpr\xFCfe deine Eingaben und versuch es erneut.",l.value=!0,s.value=!0}function b(){s.value||w.push("/"),r.value="",u.value="",l.value=!1,s.value=!1,n.email=""}return(_,o)=>(h(),v(P,null,[a(t(A),{as:"template",show:l.value},{default:i(()=>[a(t(N),{as:"div",class:"relative z-10",onClose:o[0]||(o[0]=f=>l.value=!1)},{default:i(()=>[a(t(x),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0"},{default:i(()=>[S]),_:1}),e("div",I,[e("div",U,[a(t(x),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to":"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200","leave-from":"opacity-100 translate-y-0 sm:scale-100","leave-to":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:i(()=>[a(t(R),{class:"relative bg-white w-80 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"},{default:i(()=>[e("div",null,[e("div",{class:m(s.value?"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100":"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100")},[a(t($),{class:m(s.value?"text-chsRed h-6 w-6":"text-chsGreen h-6 w-6"),"aria-hidden":"true"},null,8,["class"])],2),e("div",q,[a(t(z),{as:"h3",class:"text-lg leading-6 font-medium text-gray-900"},{default:i(()=>[G(p(r.value),1)]),_:1}),e("div",H,[e("p",W,p(u.value),1)])])]),e("div",X,[e("button",{type:"button",class:m(s.value?"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-chsRed text-base font-medium text-white hover:bg-chsDarkRed focus:outline-none  sm:col-start-2 sm:text-sm":"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-chsGreen text-base font-medium text-white hover:bg-chsDarkGreen focus:outline-none sm:col-start-2 sm:text-sm"),onClick:b}," Verstanden ",2)])]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"]),e("div",J,[K,e("div",O,[e("div",Q,[e("div",Y,[e("div",null,[Z,e("div",ee,[C(e("input",{"onUpdate:modelValue":o[1]||(o[1]=f=>t(n).email=f),id:"email",name:"email",type:"email",autocomplete:"email",placeholder:"max@mustermann.at",class:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-chsBlue focus:border-chsBlue sm:text-sm"},null,512),[[F,t(n).email]]),t(c).email.$invalid&&t(n).email.length>0?(h(),v("p",te," Bitte gib hier eine g\xFCltige Email-Adresse ein. ")):M("",!0)])]),e("div",null,[e("button",{onClick:y,class:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-chsBlue hover:bg-chsDarkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chsBlue"}," Passwort abrufen ")])])])])])],64))}};export{ne as default};
