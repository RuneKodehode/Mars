(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const v=document.getElementById("date-input");let p=0;v.addEventListener("change",async n=>{const r=`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${n.target.value}&api_key=nbOcqt4gNqe7vaqXhEVlZ2Xu4rHfu2IK68Xdvgov`,e=await(await fetch(r)).json(),t=e.photos.map(y=>y.img_src);document.getElementById("sol").textContent=`Martian Sol: ${e.photos[0].sol}`;const i=document.getElementById("image-container");i.innerHTML="",t.forEach(y=>{const u=document.createElement("img");u.src=y,p++,document.getElementById("dateEnter").textContent=null,document.getElementById("counter").textContent=p+" Images",u.addEventListener("click",()=>{u.classList.toggle("expanded")}),i.appendChild(u)})});const c=3,l=260,f=l/2.5,E=l/5;document.documentElement.style.setProperty("--scale",c);document.documentElement.style.setProperty("--size",l+"px");const d=document.createElement("div");d.classList.add("handle");const s=document.createElement("div");s.classList.add("magnifying-glass");s.style.top=E+"px";s.style.left=f+"px";d.append(s);const h=document.getElementById("magnify");let m=!1;const b=()=>{if(m==!1){let n=document.body.cloneNode(!0);n.classList.add("body-clone"),n.style.top="0",n.style.left="0",s.append(n),document.body.append(d);let o=document.getElementById("iframe");o.style="visibility:hidden",console.log(o),m=!0}else m==!0&&(s.children[0].remove(),d.remove(),m=!1)};h.addEventListener("click",b);const I=n=>{let o=n.pageX,r=n.pageY,a=o-f,e=r-E;if(d.style.left=o-l/2+"px",d.style.top=r-l/1+"px",s.children[0]){let t=l*Math.pow(c,2)/1.5-a*c,i=l*Math.pow(c,2)/2-e*c;s.children[0].style.left=t+"px",s.children[0].style.top=i+"px"}};document.addEventListener("pointermove",I);const L=n=>{s.children[0].remove(),d.remove(),m=!1};s.addEventListener("dblclick",L);const B=document.getElementById("weather");B.addEventListener("click",O);const g=document.getElementById("frame"),x=document.getElementById("gps");function O(){g.src="https://mars.nasa.gov/layout/embed/image/mslweather/",document.getElementById("frame").style.visibility=="visible"?document.getElementById("frame").style.visibility="hidden":(g.src,document.getElementById("frame").style.visibility="visible")}x.addEventListener("click",M);function M(){g.src="https://mars.nasa.gov/maps/location/?mission=MSL&site=NOW ",document.getElementById("frame").style.visibility=="visible"?document.getElementById("frame").style.visibility="hidden":document.getElementById("frame").style.visibility="visible"}
