import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const o=document.querySelector(".form");document.querySelector('button[type="submit"]');const n=document.querySelector('input[value="fulfilled"]'),c=document.querySelector('input[value="rejected"]'),l=document.querySelector("input[name='delay']");o.addEventListener("submit",r=>{r.preventDefault();const t=parseInt(l.value);new Promise((e,s)=>{setTimeout(()=>{n.checked?e(t):c.checked&&s(t)},t)}).then(e=>{i.show({title:"✅",message:`Fulfilled promise in ${e}ms`,color:"green",position:"topRight",timeout:5e3}),o.reset()}).catch(e=>{i.show({title:"❌",message:`Rejected promise in ${e}ms`,color:"red",position:"topRight",timeout:5e3}),o.reset()})});
//# sourceMappingURL=commonHelpers2.js.map
