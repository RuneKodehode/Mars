(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const E=document.getElementById("date-input");let f=0;E.addEventListener("change",async n=>{const a=`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${n.target.value}&api_key=nbOcqt4gNqe7vaqXhEVlZ2Xu4rHfu2IK68Xdvgov`,e=await(await fetch(a)).json(),t=e.photos.map(u=>u.img_src);document.getElementById("sol").textContent=`Martian Sol: ${e.photos[0].sol}`;const s=document.getElementById("image-container");s.innerHTML="",t.forEach(u=>{const m=document.createElement("img");m.src=u,f++,document.getElementById("dateEnter").textContent=null,document.getElementById("counter").textContent=f+" Images",m.addEventListener("click",()=>{m.classList.toggle("expanded")}),s.appendChild(m)})});const d=3,l=300,g=l/7,y=l/7;document.documentElement.style.setProperty("--scale",d);document.documentElement.style.setProperty("--size",l+"px");const c=document.createElement("div");c.classList.add("handle");const o=document.createElement("div");o.classList.add("magnifying-glass");o.style.top=y+"px";o.style.left=g+"px";c.append(o);const h=document.getElementById("magnify");let p=!1;const v=()=>{if(p==!1){let n=document.body.cloneNode(!0);n.classList.add("body-clone"),n.style.top="0px",n.style.left="0px",o.append(n),document.body.append(c),p=!0}else p==!0&&(o.children[0].remove(),c.remove(),p=!1)};h.addEventListener("click",v);const L=n=>{let r=n.pageX,a=n.pageY,i=r-g,e=a-y;if(c.style.left=r-l/1.8+"px",c.style.top=a-l/1+"px",o.children[0]){let t=l*Math.pow(d,2)/1.5-i*d,s=l*Math.pow(d,2)/2-e*d;o.children[0].style.left=t+"px",o.children[0].style.top=s+"px"}};document.addEventListener("pointermove",L);const x=n=>{o.children[0].remove(),c.remove(),p=!1};o.addEventListener("dblclick",x);
