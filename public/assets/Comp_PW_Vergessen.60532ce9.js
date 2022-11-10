import{u as k,r as u,U as V,V as E,_ as j,$ as C,W as D,o as v,j as x,e as a,a as t,y as F,w as i,b as e,H as A,I as B,f as M,F as P,a0 as T,M as $,l as p,q as N,n as c,X as z,x as L,z as S,D as h}from"./vendor.4cc44bb7.js";import{_ as q}from"./index.dfa3c991.js";const I=e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"},null,-1),R={class:"fixed z-10 inset-0 overflow-y-auto"},U={class:"flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"},H={class:"mt-3 text-center sm:mt-5"},W={class:"mt-2"},X={class:"text-sm text-gray-500 mb-3"},G={class:"mt-5 sm:mt-6 bg-teal-500"},J={class:"min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"},K=e("div",{class:"sm:mx-auto sm:w-full sm:max-w-md"},[e("img",{class:"mx-auto h-12 w-auto",src:q,alt:"Electronic City"}),e("h2",{class:"mt-6 text-center text-3xl font-extrabold text-gray-900"},"Passwort vergessen"),e("h4",{class:"mx-16 mt-6 text-center text-sm font-small text-gray-900 sm:mx-0"}," Falls du dein Passwort vergessen hast, kannst du hier deinen Account wiederherstellen! ")],-1),O={class:"mt-8 sm:mx-auto sm:w-full sm:max-w-md"},Q={class:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"},Y={class:"space-y-6"},Z=e("label",{for:"email",class:"block text-sm font-medium text-gray-700"}," Email-Adresse ",-1),ee={class:"mt-1"},te={key:0,class:"mt-2 text-sm text-red-600",id:"email-error"},ne={setup(se){const g=k(),l=u(!1),r=u("Titel"),d=u("Text"),s=u(!1);let n=V({email:""});const w=E(()=>({email:{required:j,email:C}})),m=D(w,n);async function y(){if(console.log("VALID: "+await m.value.$validate()),await m.value.$validate()){const{status:o}=await T.post("/sendNewPassword",{email:n.email});o==200?(r.value="Ein voller Erfolg!",d.value="Du wirst binnen weniger Sekunden eine neue Email von uns in deinem Postfach erhlaten! Mit diesem Passwort kannst du deinen Account wiederherstellen.",l.value=!0,s.value=!1):(r.value="Da ist was schief gelaufen!",d.value="Leider ist etwas schief gelaufen. Bitte \xFCberpr\xFCfe deine Eingaben und versuch es erneut.",l.value=!0,s.value=!0)}else r.value="Da ist was schief gelaufen!",d.value="Leider ist etwas schief gelaufen. Bitte \xFCberpr\xFCfe deine Eingaben und versuch es erneut.",l.value=!0,s.value=!0}function b(){s.value||g.push("/"),r.value="",d.value="",l.value=!1,s.value=!1,n.email=""}return(_,o)=>(v(),x(P,null,[a(t(F),{as:"template",show:l.value},{default:i(()=>[a(t($),{as:"div",class:"relative z-10",onClose:o[0]||(o[0]=f=>l.value=!1)},{default:i(()=>[a(t(p),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0"},{default:i(()=>[I]),_:1}),e("div",R,[e("div",U,[a(t(p),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to":"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200","leave-from":"opacity-100 translate-y-0 sm:scale-100","leave-to":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:i(()=>[a(t(N),{class:"relative bg-white w-80 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"},{default:i(()=>[e("div",null,[e("div",{class:c(s.value?"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100":"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100")},[a(t(z),{class:c(s.value?"text-red-500 h-6 w-6":"text-green-500 h-6 w-6"),"aria-hidden":"true"},null,8,["class"])],2),e("div",H,[a(t(L),{as:"h3",class:"text-lg leading-6 font-medium text-gray-900"},{default:i(()=>[S(h(r.value),1)]),_:1}),e("div",W,[e("p",X,h(d.value),1)])])]),e("div",G,[e("button",{type:"button",class:c(s.value?"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:col-start-2 sm:text-sm":"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:col-start-2 sm:text-sm"),onClick:b}," Verstanden ",2)])]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"]),e("div",J,[K,e("div",O,[e("div",Q,[e("div",Y,[e("div",null,[Z,e("div",ee,[A(e("input",{"onUpdate:modelValue":o[1]||(o[1]=f=>t(n).email=f),id:"email",name:"email",type:"email",autocomplete:"email",placeholder:"max@mustermann.at",class:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"},null,512),[[B,t(n).email]]),t(m).email.$invalid&&t(n).email.length>0?(v(),x("p",te," Bitte gib hier eine g\xFCltige Email-Adresse ein. ")):M("",!0)])]),e("div",null,[e("button",{onClick:y,class:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"}," Passwort abrufen ")])])])])])],64))}};export{ne as default};
