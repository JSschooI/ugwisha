/* Approved by the sheep */
(()=>{const{parseEvents:e,getSchedule:t,getNote:n,saveScheduleData:s,prepareScheduleData:o,SCHEDULE_DATA_KEY:a,SCHEDULES_CALENDAR_ID:i,EVENTS_CALENDAR_ID:d,CALENDAR_KEYWORDS:r,GOOGLE_API_KEY:c,FIRST_DAY:l,LAST_DAY:u,DEFAULT_NAMES:m,DEFAULT_COLOURS:p,THEME_COLOUR:h,DEFAULT_FAVICON_URL:g,APP_NAME:f,PERIOD_OPTION_PREFIX:v,UPDATER_URL:y}=window.ugwishaOptions,w=[],E=[e=>window.isOnline=e],L={};window.UgwishaEvents={connection:new Promise(e=>E.push(e)),status:[],resize:[]},window.Ugwisha={version:"dev"};try{window.storage=localStorage}catch(e){window.storage={getItem:e=>storage[e],setItem:(e,t)=>storage[e]=t,removeItem:e=>delete storage[e]}}try{window.caches=caches}catch(e){window.caches={open:()=>Promise.reject()}}try{window.options=JSON.parse(storage.getItem("[ugwisha] options")),"object"==typeof window.options&&null!==window.options||(window.options={})}catch(e){window.options={}}function k(){storage.setItem("[ugwisha] options",JSON.stringify(window.options))}window.options.save=k;const b={};window.location.search&&window.location.search.slice(1).split("&").forEach(e=>{const t=e.indexOf("=");~t?b[e.slice(0,t)]=e.slice(t+1):b[e]=!0});const C=["January","February","March","April","May","June","July","August","September","October","November","December"],x=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let T,I,D,S;function N(){!function(e){O(W),z=G=null,e.alternate&&W.appendChild(j("p",{className:"alternate-note"},["This is an alternate schedule."]));if(e.noSchool)return void W.appendChild(j("div",{className:"no-school",style:{backgroundImage:`url('./images/sheep/${function(e){const t=e/864e5%2==0,n=+e.toString(7)[9];return q[(t?0:7)+n]}(M().getTime())}')`}},[j("span",{},[e.summer?"Enjoy your summer!":"No school!"])]));const t={};W.appendChild(P(e.map(e=>{const s=j("input",{className:"period-name",type:"text",placeholder:m[e.period],value:H(e.period),onchange(){!function(e,t){options["periodName_"+v+e]=t}(e.period,s.value),k(),ie(),t[e.period].inputs.forEach(e=>e!==s&&(e.value=s.value))},onfocus(){if(G!==a){if(z){const e=z;R(e,!1),e.classList.add("disappear"),e.addEventListener("transitionend",()=>{e.parentNode.removeChild(e)},{once:!0})}z=function(e,t="00BCD4",n=!0,s="009688"){let o,a,i,d,r=ct(lt(t||s));function c(t={}){const s=t.hex||ut(rt(r));o.value="#"+s,"initial"!==t.type&&e(n&&a.checked?null:s),i.style.backgroundColor=`hsl(${r.h}, 100%, 50%)`,i.style.setProperty("--x",100*r.s+"%"),i.style.setProperty("--y",100*(1-r.v)+"%"),d.style.backgroundImage=`linear-gradient(to bottom, ${pt.map(e=>(function({r:e,g:t,b:n}){return`rgb(${e}, ${t}, ${n})`})(rt({h:e,s:r.s,v:r.v}))).join(",")})`,d.style.setProperty("--val",r.h/360*100+"%")}const l=j("div",{className:"colour-picker picker"},[o=j("input",{className:"colour-input select-input",type:"text",placeholder:"#123ABC",onchange(){const e=function(e){const t=mt.exec(e.toLowerCase());return t?t[1]?t[1]:t.slice(2,5).map(e=>e+e).join(""):null}(o.value);e?(r=ct(lt(e)),n&&a.checked&&(a.checked=!1),c({type:"hex-input",hex:e})):o.value="#"+ut(rt(r))}}),j("div",{className:"colour-boxes-wrapper"},[i=j("div",{className:"colour-box"}),d=j("div",{className:"colour-slider"})]),n?j("label",{className:"colour-transparent-label"},[a=j("input",{className:"colour-transparent-checkbox",type:"checkbox",checked:null===t,onchange:c}),"Transparent?"]):null]);return ht(i,(e,t)=>{r.s=gt(e),r.v=1-gt(t),n&&a.checked&&(a.checked=!1),c({type:"square"})}),ht(d,(e,t)=>{r.h=360*gt(t),n&&a.checked&&(a.checked=!1),c({type:"hue"})}),c({type:"initial",hex:t||s}),l}(n=>{!function(e,t){options["periodColour_"+v+e]=t}(e.period,n),k(),ie(),t[e.period].cards.forEach(e=>{null===n?(e.classList.add("transparent"),e.classList.remove("dark-text"),e.style.setProperty("--colour",null)):(e.classList.remove("transparent"),e.style.setProperty("--colour","#"+n),J(n)?e.classList.add("dark-text"):e.classList.remove("dark-text"))})},Y(e.period),!0,p[e.period]||"000000"),s.parentNode.insertBefore(z,s.nextElementSibling),G=a}}}),o=n(e),a=j("div",{className:["period",null===Y(e.period)?"transparent":J(Y(e.period))?"dark-text":null],style:{"--colour":Y(e.period)&&"#"+Y(e.period)}},[s,j("span",{className:"time-duration"},[j("span",{className:"time",innerHTML:$(e.start)+" &ndash; "+$(e.end)}),j("span",{className:"duration"},[e.end-e.start+" min"]),o?j("span",{className:"note",innerHTML:o}):null])]);return t[e.period]||(t[e.period]={inputs:[],cards:[]}),t[e.period].inputs.push(s),t[e.period].cards.push(a),a})))}(t(A));const e=A.getUTCDay(),s=[];for(let n=0;n<7;n++)s.push(t(new Date(A.getTime()-864e5*(e-n))));var o,a;o=s,a=e,X.forEach((e,t)=>{a===t?e.wrapper.classList.add("week-preview-today"):e.wrapper.classList.remove("week-preview-today"),O(e.content);const n=o[t];n.alternate?e.wrapper.classList.add("week-preview-is-alternate"):e.wrapper.classList.remove("week-preview-is-alternate"),e.date=n.date,e.content.appendChild(P(n.noSchool?[]:n.map(e=>j("span",{className:["week-preview-cell","week-preview-period",null===Y(e.period)?"week-preview-transparent":null],title:H(e.period),"aria-label":H(e.period),style:{backgroundColor:Y(e.period)&&"#"+Y(e.period)}}))))})}function U(){N(),S.innerHTML=C[A.getUTCMonth()]+" "+A.getUTCDate(),T.innerHTML=x[A.getUTCDay()];const e=A.getTime();I.disabled=e<=l,D.disabled=e>=u,T.href=(b["no-sw"]?"?no-sw&":"?")+"day="+A.toISOString().slice(0,10),fe(),je()}let A=b.day?new Date(b.day):M();function M(){return new Date(Date.UTC(...(e=>[e.getFullYear(),e.getMonth(),e.getDate()])(new Date)))}function B(e){return Array.isArray(e)?e.filter(e=>void 0!==e&&null!==e&&!1!==e):(Object.keys(e).forEach(t=>(void 0===e[t]||null===e[t]||!1===e[t])&&delete e[t]),e)}function j(e,t={},n=[]){const s=document.createElement(e);return Object.keys(B(t)).forEach(e=>{const n=t[e];if("data"===e)Object.keys(B(n)).forEach(e=>{s.dataset[e]=n[e]});else if("style"===e)Object.keys(B(n)).forEach(e=>{"--"===e.slice(0,2)?s.style.setProperty(e,n[e]):s.style[e]=n[e]});else if("ripple"===e)Fe(s);else if("on"===e.slice(0,2))s.addEventListener(e.slice(2),n);else{const t=Array.isArray(n)?B(n).join(" "):n.toString();void 0!==s[e]?s[e]=t:s.setAttribute(e,t)}}),Array.isArray(n)||(n=[n]),B(n).forEach(e=>{s.appendChild("object"!=typeof e?document.createTextNode(e):e)}),s}function P(e){const t=document.createDocumentFragment();return B(e).forEach(e=>t.appendChild(e)),t}function O(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function R(e,t=!0){e.querySelectorAll("a, input, button, select").forEach(e=>{e.tabIndex=t?0:-1})}document.addEventListener("DOMContentLoaded",()=>{S=document.getElementById("select-date"),T=document.getElementById("weekday"),I=document.getElementById("back-day"),D=document.getElementById("forth-day");const e=Array.from(document.getElementsByClassName("toggle-setting"));e.forEach(e=>{const t=e.dataset.option;void 0===options[t]&&(options[t]="true"===e.dataset.default)}),w.forEach(e=>e());let t=!1;document.addEventListener("keydown",e=>{9!==e.keyCode&&13!==e.keyCode||(document.body.classList.add("tab-focus"),t=!0)}),document.addEventListener("keyup",e=>{9!==e.keyCode&&13!==e.keyCode||(t=!1)}),document.addEventListener("focusin",()=>{t||document.body.classList.remove("tab-focus")});const n=document.getElementById("psa"),s=document.getElementById("psa-content"),o=document.getElementById("psa-close"),a=document.getElementById("psa-btn"),i=/<!--\s*#(\d+)((?:\|[a-z0-9\-_=./]*)*)\s*-->/gi;let d=!1;fetch("./psa.html?v="+Date.now()).then(e=>e.text()).then(e=>{s.innerHTML=e;const[,t,r]=i.exec(e),c={};r.split("|").forEach(e=>{if(e){const[t,n]=e.split("=");c[t]=n||!0}}),options.lastPSA&&options.lastPSA!==t&&(!c.HIDE_B4||+c.HIDE_B4<=Ugwisha.version||"dev"===Ugwisha.version)&&(n.classList.remove("hidden"),o.focus(),document.body.style.overflow="hidden"),options.lastPSA||(options.lastPSA=t,k()),o.addEventListener("click",()=>{d=!0,n.classList.add("disappear"),options.lastPSA!==t&&(options.lastPSA=t,k(),!Ce&&c.REFETCH&&(Ce=!0,Ee().then(N)),c.INSTALL_EXTENSION&&et(c.INSTALL_EXTENSION)),a.focus(),document.body.style.overflow=null}),n.addEventListener("click",e=>{e.target===n&&o.click()}),n.addEventListener("keydown",e=>{27===e.keyCode&&o.click()}),n.addEventListener("transitionend",()=>{d&&n.classList.add("hidden")}),E.forEach(e=>e(!0))}).catch(()=>{document.getElementById("offline-msg").classList.remove("hidden");const e=document.getElementById("reload");e.tabIndex=0,e.addEventListener("click",e=>{window.location.reload(),e.preventDefault()}),a.disabled=!0,E.forEach(e=>e(!1))});let r=window.innerWidth,c=window.innerHeight;window.addEventListener("resize",()=>{r=window.innerWidth,c=window.innerHeight});const l=document.getElementById("jump");let u=!1;document.addEventListener("wheel",()=>{window.cancelAnimationFrame(u),u=!1},{passive:!0}),document.addEventListener("touchstart",()=>{window.cancelAnimationFrame(u),u=!1},{passive:!0}),document.addEventListener("scroll",()=>{window.scrollY>c/3?l.classList.add("up"):l.classList.remove("up")}),l.addEventListener("click",()=>{u&&window.cancelAnimationFrame(u),function(e){let t=window.scrollY;!function n(){Math.abs(t-e)>1?(t+=(e-t)/5,window.scrollTo(0,t),u=window.requestAnimationFrame(n)):(window.scrollTo(0,e),u=!1)}()}(l.classList.contains("up")?0:c-50)});let m=null,p=null;document.getElementById("tabs").addEventListener("click",e=>{if(e.target.dataset.for){let t=m;m&&(m.classList.remove("selected"),p.classList.remove("show"),m=null,p=null),t!==e.target&&("psa"===e.target.dataset.for?(d=!1,n.classList.remove("hidden"),n.classList.remove("disappear"),o.focus(),document.body.style.overflow="hidden"):(m=e.target,p=document.getElementById(e.target.dataset.for),e.target.classList.add("selected"),p.classList.add("show")))}});const h=document.getElementById("events-wrapper"),g={metricTime(){N(),ie()},showSELF(){N(),ae=null,ie()},showEvents(e){e&&fe(),h.style.display=e?null:"none"},dynamicContrast(e){e?document.body.classList.add("dark-text-ok"):document.body.classList.remove("dark-text-ok")}};e.forEach(e=>{const t=e.dataset.option;e.checked=options[t];const n=g[t]||L[t];e.addEventListener("change",()=>{options[t]=e.checked,n&&n(e.checked),k()})}),options.showEvents||(h.style.display="none"),options.dynamicContrast&&document.body.classList.add("dark-text-ok"),T.addEventListener("click",e=>{window.history.pushState({},"",T.href),e.preventDefault()}),I.addEventListener("click",()=>{A=new Date(A.getTime()-864e5),U()}),D.addEventListener("click",()=>{A=new Date(A.getTime()+864e5),U()}),document.getElementById("today").addEventListener("click",()=>{A=M(),U()});const f=document.getElementById("content"),v=document.getElementById("drag-handle");function y(e){const t="m"===e.type[0]?e:e.changedTouches[0];options.sidebarWidth=Math.max(250,Math.min(700,r-200,t.clientX-100)),f.style.setProperty("--custom-width",(options.sidebarWidth||250)+"px"),UgwishaEvents.resize.forEach(e=>e(options.sidebarWidth||250)),e.preventDefault()}function b(e){document.removeEventListener("mouseup"===e.type?"mousemove":"touchmove",y),document.removeEventListener(e.type,b),e.preventDefault(),k()}v.addEventListener("mousedown",e=>{document.addEventListener("mousemove",y),document.addEventListener("mouseup",b),e.preventDefault()}),v.addEventListener("touchstart",e=>{document.addEventListener("touchmove",y,{passive:!1}),document.addEventListener("touchend",b,{passive:!1}),e.preventDefault()},{passive:!1}),f.style.setProperty("--custom-width",(options.sidebarWidth||250)+"px");const C=["lastPSA"];document.getElementById("reset").addEventListener("click",()=>{if(confirm("Are you sure you want to reset all your settings?\n\nThis includes custom period names and colours and background settings.")){const e={};C.forEach(t=>e[t]=window.options[t]),window.options=e,k(),window.location.reload()}})},{once:!0}),"serviceWorker"in navigator&&(b["no-sw"]||b["reset-sw"]?navigator.serviceWorker.getRegistrations().then(e=>{Promise.all(e.map(e=>e.unregister())).then(()=>{b["reset-sw"]?window.location=y:e.length&&window.location.reload()})}).catch(()=>void 0):window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").then(e=>{e.onupdatefound=(()=>{const t=e.installing;t.onstatechange=(()=>{"installed"===t.state&&navigator.serviceWorker.controller&&(options.natureLoaded=!1,window.location.replace(y+window.location.search))})})},()=>{}),navigator.serviceWorker.addEventListener("message",({data:e})=>{e.type})},{once:!0})),window.Elem=j,window.Fragment=P,window.empty=O;const F=32;function $(e,t=!1){const n=Math.floor(e/60),s=("0"+e%60).slice(-2);let o=options.metricTime?`${n}:${s}`:`${(n+11)%12+1}:${s}`;return options.metricTime||t?o:`${o} ${n<12?"a":"p"}m`}function _(e,t=!1,n=!1){return t?(n&&e<60?"":Math.floor(e/60))+":"+("0"+e%60).slice(-2):e+" minute"+(1===e?"":"s")}function H(e){return options["periodName_"+v+e]||m[e]}function Y(e){const t=options["periodColour_"+v+e];return void 0===t?p[e]:t}let W,X;Ugwisha.formatTime=$,Ugwisha.formatDuration=_,Ugwisha.getPdName=H,Ugwisha.getPdColour=Y;const q=["left-sheep-curious.svg","left-sheep-running-sad-D.svg","left-sheep-standing-blowing-caterpillars.svg","right-sheep-D-mouth.svg","right-sheep-fishing.svg","right-sheep-hot-air-balloon.svg","right-sheep-sleeping.svg","standing-sheep-arms-out.svg","standing-sheep-classy.svg","standing-sheep-doing-ballet.svg","standing-sheep-flowers.svg","standing-sheep-hungry.svg","two-sheep-ice-cream.svg","two-sheep-stack.svg"];function J(e){const[t,n,s]=[e.slice(0,2),e.slice(2,4),e.slice(4)].map(e=>(e=parseInt(e,16)/255)<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4));return.2126*t+.7152*n+.0722*s>.179}let z,G;document.addEventListener("click",e=>{if(z&&!G.contains(e.target)){const e=z;R(e,!1),e.classList.add("disappear"),e.addEventListener("transitionend",()=>{e.parentNode.removeChild(e)},{once:!0}),z=G=null}});const K=["S","M","T","W","Θ","F","S"];const V=(new Date).getTimezoneOffset();const Q=j("canvas",{width:F,height:F}),Z=Q.getContext("2d");let ee,te,ne,se,oe,ae;function ie(e=!1,n=0){const s=Date.now();if(e&&s<n)return setTimeout(()=>ie(!0,n),Math.min(n-s,1e3));const o=M(),a=o.toISOString().slice(0,10);ae!==a&&(ae=a,(oe=t(o)).noSchool&&(ne.style.opacity=0,se.setAttribute("href",g),document.title=f));const i=function(e,t=0){const n=Date.now()+t,s=Math.floor((n/6e4-V)%1440),o=n+6e4-n%6e4;if(e.noSchool)return{type:"time",value:s,nextMinute:o};const a=e.find(e=>e.end>s),i={secondCounter:null,nextMinute:o};if(a)i.period=a,a.start>s?(i.type="until",i.value=a.start-s):(i.type="left in",i.value=a.end-s,i.progress=(s-a.start)/(a.end-a.start)),i.value<=1&&(i.secondCounter=(()=>{const e=Date.now()+t;return{secondsLeft:60-e/1e3%60,stop:Math.floor((e/6e4-V)%1440)>=(a.start>s?a.start:a.end)}}));else{const t=e[e.length-1];i.period=t,i.type="since",i.value=s-t.end}return i}(oe);if(oe.noSchool)ee.textContent=$(i.value,!0),te.textContent="";else{if("left in"===i.type?(ne.style.opacity=1,ne.style.setProperty("--progress",100*i.progress+"%")):ne.style.opacity=0,te.innerHTML=i.type+" "+function(e){const t=Y(e);let n='<span class="period-chip';return null===t&&(n+=" transparent"),null!==t&&J(t)&&(n+=" dark-text"),n+='"',null!==t&&(n+=` style="--colour: #${t};"`),n+=`>${H(e)}</span>`}(i.period.period),"since"===i.type)ee.textContent=_(i.value,!0),se.setAttribute("href",g),document.title=f;else if(function(e){Z.clearRect(0,0,F,F),Z.font="100px 'Roboto Condensed', sans-serif";const{width:t}=Z.measureText(e),n=F/(t/100);Z.fillStyle=h,Z.fillRect(0,(F-1.2*n)/2,F,n),Z.font=`${n}px 'Roboto Condensed', sans-serif`,Z.fillStyle="white",Z.fillText(e,F/2,F/2),se.setAttribute("href",Q.toDataURL())}(_(i.value,!0,!0)),e&&i.secondCounter){!function t(){const{secondsLeft:n,stop:s}=i.secondCounter();if(!s){const e=Math.round(100*n)/100+"";document.title=(ee.textContent=e+(e.includes(".")?"0".repeat(3-e.length+e.indexOf(".")):".00")+"s")+" "+i.type+" "+H(i.period.period)+" - "+f}window.requestAnimationFrame(e&&!s?t:ie)}()}else document.title=(ee.textContent=_(i.value,!0))+" "+i.type+" "+H(i.period.period)+" - "+f;e&&UgwishaEvents.status.forEach(e=>e(i,s))}e&&setTimeout(()=>ie(!0,i.nextMinute),Math.min(i.nextMinute-s,1e3))}function de(e){return Math.floor(Math.random()*e)}function re(e){if(!document.body)return;const t=j("div",{className:"transition-background"});t.style.backgroundImage=document.body.style.backgroundImage;const n=setTimeout(()=>{document.body.removeChild(t)},1e3*options.backgroundFade);t.addEventListener("animationend",()=>{document.body.removeChild(t),clearTimeout(n)}),document.body.insertBefore(t,document.body.firstChild),document.body.style.backgroundImage=e}w.push(()=>{W=document.getElementById("periods"),ee=document.getElementById("preview-time"),te=document.getElementById("preview-msg"),ne=document.getElementById("progress"),se=document.getElementById("favicon"),Z.textAlign="center",Z.textBaseline="middle",X=[];for(let e=0;e<7;e++){const t={};t.wrapper=j("div",{className:"week-preview-col",tabindex:0,ripple:!0,onclick(){A=t.date,U()},onkeydown(e){13===e.keyCode&&this.click()}},[j("span",{className:"week-preview-cell week-preview-alternate",title:"Alternate schedule","aria-label":"This is an alternate schedule"},["*"]),j("span",{className:"week-preview-cell week-preview-day-heading",title:x[e],"aria-label":x[e]},[K[e]]),t.content=j("div")]),X.push(t)}document.getElementById("week-preview").appendChild(P(X.map(({wrapper:e})=>e)));let e=null;W.addEventListener("touchstart",t=>{if(!e&&options.allowSliding){const n=t.changedTouches[0];e={id:n.identifier,startX:n.clientX,slide:!1}}}),W.addEventListener("touchmove",t=>{if(e){const n=Array.from(t.touches).find(t=>t.identifier===e.id);if(n){const t=n.clientX-e.startX;e.slide||Math.abs(t)>30&&(e.slide=!0),e.slide&&(W.style.transform=`translateX(${t/5}px)`,W.style.opacity=Math.abs(t)>60?.5:null)}}}),W.addEventListener("touchend",t=>{if(e){const n=Array.from(t.changedTouches).find(t=>t.identifier===e.id);if(n){const t=n.clientX-e.startX;t>60?I.click():t<-60&&D.click()}W.style.transform=null,W.style.opacity=null,e=null}})});let ce=null;function le(){ce&&clearInterval(ce),ce=options.randomGradients?setTimeout(le,1e3*options.backgroundLoop):null,re(function(){const e=[de(256),de(256),de(256)],t=[de(256),de(256),de(256)];return`linear-gradient(${360*Math.random()}deg, rgb(${e.join(",")}), rgb(${t.join(",")}))`}())}options.backgroundLoop||(options.backgroundLoop=options.quickTransitions?5:10),options.backgroundFade||(options.backgroundFade=options.quickTransitions?.5:5);let ue=!1;window.Ugwisha.requestBackgroundControl=(()=>ue?null:(ue=!0,clearTimeout(ce),ce=!0,re)),window.Ugwisha.relinquishBackgroundControl=(e=>{if(e!==re)throw new Error("Fake");ue=!1,le()}),w.push(()=>{document.body.style.setProperty("--background-transition-speed",options.backgroundFade+"s"),ue||le()});const me={},pe="https://www.googleapis.com/calendar/v3/calendars/"+encodeURIComponent(d)+"/events?singleEvents=true&fields="+encodeURIComponent("items(description,end(date,dateTime),location,start(date,dateTime),summary)")+"&key="+c;function he(e){return 60*e.getHours()+e.getMinutes()}function ge(e,t=0){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()+t)}async function fe(){if(options.showEvents){const n=A.toISOString().slice(0,10);if(ke.innerHTML='<span class="events-message">Loading...</span>',!me[n]){const{items:t}=await fetch(`${pe}&timeMin=${encodeURIComponent(ge(A).toISOString())}&timeMax=${encodeURIComponent(ge(A,1).toISOString())}`).then(e=>e.json()).catch(()=>(ke.innerHTML='<span class="events-message">Unable to fetch events.</span>',{items:null}));if(!t)return;me[n]=t,e(Le({items:t}),A)&&(storage.setItem(a,s()),N(),ae=null,ie())}O(ke),ke.appendChild(me[n].length?P(me[n].map(e=>j("div",{className:"event"},[j("span",{className:"event-name"},[e.summary]),j("span",{className:"event-info"},[e.start&&e.start.dateTime?j("span",{className:"event-time",innerHTML:$(he(new Date(e.start.dateTime)))+" &ndash; "+$(he(new Date(e.end.dateTime)))}):null,e.location?j("span",{className:"event-location"},[e.location]):null]),e.description?j("span",{className:"event-description",innerHTML:(t=e.description,t.replace(/(<.*?) style=(?:"[^"]*"|\S*)(.*?>)/g,"$1$2"))}):null]))):j("span",{className:"events-message"},["Nothing happening today"]))}var t}const ve=new Date(l+252e5),ye=new Date(u+111599999),we="https://www.googleapis.com/calendar/v3/calendars/"+encodeURIComponent(i)+"/events?singleEvents=true&fields="+encodeURIComponent("items(description,end(date,dateTime),start(date,dateTime),summary)")+"&key="+c+`&timeMin=${encodeURIComponent(ve.toISOString())}&timeMax=${encodeURIComponent(ye.toISOString())}`;function Ee(){return be.disabled=!0,Promise.all(r.map(e=>fetch(we+"&q="+e).then(e=>e.json()))).then(t=>{const n={};t.map(Le).forEach(e=>e.forEach(e=>{n[e.date]||(n[e.date]=[]),n[e.date].push(e)}));const o=new Date(l),i=u;for(;o.getTime()<=i;)e(n[o.toISOString().slice(0,10)]||[],o),o.setUTCDate(o.getUTCDate()+1);storage.setItem(a,s()),be.disabled=!1})}function Le({items:e}){const t=[];return e.forEach(e=>{if(e.start.dateTime)t.push({summary:e.summary,description:e.description,date:e.start.dateTime.slice(0,10)});else{const n=new Date(e.start.date),s=new Date(e.end.date).getTime();for(;n.getTime()<s;)t.push({summary:e.summary,description:e.description,date:n.toISOString().slice(0,10)}),n.setUTCDate(n.getUTCDate()+1)}}),t}let ke,be,Ce=!1;w.push(async()=>{if(ke=document.getElementById("events"),(be=document.getElementById("fetch-alts")).addEventListener("click",()=>{Ce=!0,Ee().then(N)}),E.push(e=>{e||(be.disabled=!0)}),b["get-alts"]||!storage.getItem(a)){if(Ce=!0,await Ee(),b.then)return window.location.replace(b.then);ae=null}o(storage.getItem(a)),await Promise.resolve(),U(),ie(!0,0)});const xe="date-selector-day",Te=(e=>12*e.getUTCFullYear()+e.getUTCMonth())(new Date(l)),Ie=(e=>12*e.getUTCFullYear()+e.getUTCMonth())(new Date(u)),De=document.createDocumentFragment(),Se=[];for(let e=0;e<6;e++){const e=j("div",{className:"date-selector-week"});for(let t=0;t<7;t++){const t=j("div");Se.push(t),e.appendChild(t)}De.appendChild(e)}let Ne,Ue,Ae,Me,Be;function je(e=12*A.getUTCFullYear()+A.getUTCMonth()){Ue=e,Ne=new Map;const n=M().getTime(),s=A.getTime(),o=new Date(Date.UTC(Math.floor(e/12),e%12,1));let a=o.getUTCDay();Ae.textContent=C[e%12]+" "+Math.floor(e/12),Me.disabled=e<=Te,Be.disabled=e>=Ie;for(let e=0;e<a;e++)Se[e].className=xe+" date-selector-out-of-bounds";do{const e=Se[a],i=t(o),d=o.getTime();Ne.set(e,new Date(o)),e.textContent=o.getUTCDate(),e.className=xe,i.noSchool&&e.classList.add("date-selector-no-school"),i.alternate&&e.classList.add("date-selector-alternate"),d===n&&e.classList.add("date-selector-today"),d===s&&e.classList.add("date-selector-selected"),o.setUTCDate(o.getUTCDate()+1),a++}while(1!==o.getUTCDate());for(let e=a;e<Se.length;e++)Se[e].className=xe+" date-selector-out-of-bounds"}w.push(()=>{const e=document.getElementById("date-selector"),t=document.getElementById("date-selector-days"),n=document.getElementById("select-date");Ae=document.getElementById("date-selector-month-year"),Me=document.getElementById("prev-month"),Be=document.getElementById("next-month"),t.appendChild(De),document.getElementById("date-selector-day-headings").appendChild(P(K.map(e=>j("span",{className:"date-selector-day-heading"},[e])))),t.addEventListener("click",e=>{const t=Ne.get(e.target);t&&(A=t,U())}),t.addEventListener("keydown",t=>{if(t.keyCode>=37&&t.keyCode<=40){let e;switch(t.keyCode){case 37:e=-1;break;case 38:e=-7;break;case 39:e=1;break;case 40:e=7}const n=new Date(Date.UTC(A.getUTCFullYear(),A.getUTCMonth(),A.getUTCDate()+e));n.getTime()>=l&&n.getTime()<=u&&(A=n,U()),t.preventDefault()}else 27===t.keyCode&&(s=!0,e.classList.add("disappear"),n.focus())}),Me.addEventListener("click",()=>{je(Ue-1)}),Be.addEventListener("click",()=>{je(Ue+1)}),n.addEventListener("click",n=>{s=!1,e.classList.remove("hidden"),e.classList.remove("disappear"),t.focus(),n.stopPropagation()}),document.getElementById("cancel-select-date").addEventListener("click",()=>{s=!0,e.classList.add("disappear"),n.focus()}),document.addEventListener("click",t=>{e.classList.contains("hidden")||e.contains(t.target)||(s=!0,e.classList.add("disappear"))});let s=!1;e.addEventListener("transitionend",()=>{s&&e.classList.add("hidden")})});let Pe=[];function Oe(){(Pe=Pe.filter(e=>e.animate())).length&&window.requestAnimationFrame(Oe)}document.addEventListener("mouseup",()=>{Pe.filter(e=>"mouse"===e.identifier).forEach(e=>e.dying=!0)}),document.addEventListener("touchend",e=>{Array.from(e.changedTouches).forEach(e=>{Pe.filter(t=>t.identifier===e.identifier).forEach(e=>e.dying=!0)})},{passive:!0});class Re{constructor(e,t,n,s){const o=j("div",{className:"ripple"}),a=e.getBoundingClientRect();o.style.left=t-a.left+"px",o.style.top=n-a.top+"px",e.appendChild(o),Pe.push(this),this.parent=e,this.ripple=o,this.identifier=s,this.scale=0,this.dying=!1,this.dyingProgress=1,this.finalScale=Math.hypot(Math.max(t-a.left,a.left+a.width-t),Math.max(n-a.top,a.top+a.height-n))/5,1===Pe.length&&Oe()}animate(){return this.scale+=(this.finalScale-this.scale)/6,this.dying&&(this.dyingProgress-=.07),this.ripple.style.transform=`scale(${this.scale})`,this.ripple.style.opacity=this.dyingProgress,this.dyingProgress<=0&&this.parent.removeChild(this.ripple),this.dyingProgress>0}}function Fe(e){let t=!1;e.addEventListener("touchstart",n=>{e.classList.contains("no-ripple")||(t=!0,Array.from(n.changedTouches).forEach(t=>{new Re(e,t.clientX,t.clientY,t.identifier)}))},{passive:!0}),e.addEventListener("mousedown",n=>{e.classList.contains("no-ripple")||(t?t=!1:new Re(e,n.clientX,n.clientY,"mouse"))})}w.push(()=>{Array.from(document.getElementsByClassName("ripples")).forEach(e=>Fe(e))});const $e="[ugwisha] extensions",_e="[ugwisha] extensions.last",He="ugwisha-extensions",Ye=[["Background manager","./js/extensions/backgrounds.js"],["Notes","./js/extensions/notes.js"],["Todo","./js/extensions/todo.js"],["Barcode","./js/extensions/barcode.js"],["Minimum Score Calculator","./js/extensions/min-score.js"],["Discord Webhook","./js/extensions/discord-webhook.js"],["Push Notifications","./js/extensions/notifications.js"],["Current Second","./js/extensions/current-second.js"],["Club list","./js/extensions/list.js?for=club"],["Staff list","./js/extensions/list.js?for=staff"],["Quick copy","./js/extensions/clipboard.js"]],We=!b["no-apps"];let Xe=!1;function qe(e){const t=j("div",{className:"kind-of-button extension-icon",tabindex:We?0:-1,ripple:!0,style:{backgroundImage:e.icon&&`url("${encodeURI(e.icon)}")`},onclick(t){if(e.meta.loaded)if(Xe){const t=Ve.indexOf(e);~t&&(Ve.splice(t,1),Ge()),Je.removeChild(s);const n=Ye.find(t=>t[1]===e.url);n&&(n[2].disabled=!1),caches.open(He).then(t=>e.meta.files.forEach(e=>t.delete(e)))}else dt(e.url)},onkeydown(e){13===e.keyCode&&this.click()}});e.meta.icon=t;const n=j("div",{className:"extension-name"},[e.name||""]);e.meta.name=n;const s=j("div",{className:"extension-item not-loaded"},[t,n]);e.meta.button=s,Je.appendChild(s),e.styles&&We&&document.head.appendChild(e.meta.styles=j("link",{rel:"stylesheet",href:e.styles})),e.meta.shown=!0}const Je=j("div",{className:"extension-menu"}),ze={wrapper:j("div",{},[Je]),name:"Apps",meta:{data:{}}};function Ge(){storage.setItem($e,JSON.stringify({version:1,extensions:Ve.map(({name:e,icon:t,url:n,styles:s})=>({name:e,icon:t,url:n,styles:s}))}))}let Ke;Ye.forEach(e=>{e[2]=j("button",{className:"button native-ext",ripple:!0,onclick(){et(e[1]),this.disabled=!0}},[e[0]])});try{switch((Ke=JSON.parse(storage.getItem($e))).version||(Ke.version=0),Ke.version){case 0:Ke.includes("./js/extensions/backgrounds.js")||Ke.push("./js/extensions/backgrounds.js"),Ke={extensions:Ke.map(e=>({url:e}))}}}catch(e){Ke={extensions:[{name:"Notes",icon:"./images/extensions/notes.svg",url:"./js/extensions/notes.js"},{name:"Backgrounds",icon:"./images/extensions/backgrounds.svg",url:"./js/extensions/backgrounds.js",styles:"./js/extensions/backgrounds.css"}]}}const{extensions:Ve}=Ke;Ve.forEach(e=>{e.meta={loaded:!1},qe(e),Ze(e);const t=Ye.find(t=>t[1]===e.url);t&&(t[2].disabled=!0)});const Qe=Promise.all(Ve.map(e=>e.meta.scriptLoad));function Ze(e){e.meta.scriptLoad=new Promise((t,n)=>{We&&document.head.appendChild(e.meta.script=j("script",{onload:t,onerror:n,src:e.url}))})}function et(e){if(Ve.find(t=>t.url===e))return new Error("Extension already added");const t={url:e,meta:{loaded:!1}};Ze(t),Ve.push(t)}let tt,nt,st,ot,at,it=null;function dt(e){at?("string"==typeof e&&(e=Ve.find(t=>t.url===e)),e||(e=ze),it!==e&&(it&&(it.meta.data.beforeRemove&&it.meta.data.beforeRemove(),at.removeChild(it.wrapper),it.meta.data.afterRemove&&it.meta.data.afterRemove()),it=e,tt.textContent=e.name,e.icon?(nt.style.backgroundImage=`url("${encodeURI(e.icon)}")`,nt.style.display=null):nt.style.display="none",e.meta.data.beforeAdd&&e.meta.data.beforeAdd(),at.appendChild(e.wrapper),e.meta.data.afterAdd&&e.meta.data.afterAdd(),storage.setItem(_e,e.url),e===ze?(st.classList.add("add-ext"),st.disabled=!window.isOnline):(st.classList.remove("add-ext"),st.disabled=!1),st.setAttribute("aria-label",e===ze?"add apps":"go to app menu"),ot.style.display=e===ze?null:"none")):b.app=e}function rt({h:e,s:t,v:n}){const s=s=>{const o=(s+e/60)%6;return n-n*t*Math.max(Math.min(o,4-o,1),0)};return{r:255*s(5),g:255*s(3),b:255*s(1)}}function ct({r:e,g:t,b:n}){e/=255,t/=255,n/=255;const s=Math.min(e,t,n),o=Math.max(e,t,n),a=o-s;let i=o===s&&e===t&&t===n?0:o===e?60*(t-n)/a:o===t?60*(2+(n-e)/a):60*(4+(e-t)/a);return i<0&&(i+=360),{h:i,s:0===o&&0===s?0:a/o,v:o}}function lt(e){return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4),16)}}function ut({r:e,g:t,b:n}){return[e,t,n].map(e=>Math.floor(e).toString(16).padStart(2,"0")).join("")}w.push(()=>{tt=document.getElementById("extension-name"),nt=document.getElementById("extension-icon"),st=document.getElementById("extension-menu"),ot=document.getElementById("remove-extensions"),at=document.getElementById("extension-wrapper"),st.addEventListener("click",()=>{it===ze?(t=!1,e.classList.remove("hidden"),e.classList.remove("disappear")):dt(ze)}),ot.addEventListener("click",()=>{(Xe=!Xe)?(Je.classList.add("extension-remove-mode"),ot.classList.add("extension-removing")):(Je.classList.remove("extension-remove-mode"),ot.classList.remove("extension-removing"))}),We?Qe.then(()=>dt(b.app||storage.getItem(_e)||ze)):dt(ze);const e=document.getElementById("extension-list");let t=!1;e.addEventListener("transitionend",()=>{t&&e.classList.add("hidden")}),document.getElementById("native-list").appendChild(P(Ye.map(e=>e[2])));const n=document.getElementById("extension-url");n.addEventListener("keydown",e=>{13===e.keyCode&&s.click()});const s=document.getElementById("extension-url-add");s.addEventListener("click",()=>{n.value&&(et(n.value),n.value="")}),document.addEventListener("click",n=>{n.target===st||e.contains(n.target)&&"BUTTON"!==n.target.tagName||(t=!0,e.classList.add("disappear"))}),window.UgwishaEvents.connection.then(e=>{it===ze&&(st.disabled=!e)})}),window.UgwishaExtensions={register:function(e,t=document.currentScript){t&&t.src&&(t=t.getAttribute("src"));const n=Ve.find(e=>e.url===t)||{meta:{}};if(n.url||(n.url=t),!t||t!==n.url)throw new Error("Suspicious registration!");n.meta.loaded=!0,n.meta.data=e,n.name=e.name,n.icon=e.icon,n.styles=e.styles,n.wrapper=e.wrapper,n.meta.shown?(n.meta.name.textContent=e.name,n.meta.icon.style.backgroundImage=`url("${encodeURI(e.icon)}")`,e.styles&&(n.meta.styles?n.meta.styles.href=e.styles:document.head.appendChild(n.meta.styles=j("link",{rel:"stylesheet",href:e.styles})))):qe(n),n.meta.button.classList.remove("not-loaded"),Ge();const s=Ye.find(e=>e[1]===n.url);s&&(s[2].disabled=!0),n.meta.files=B([t,e.styles,e.icon,...e.sources||[]]),caches.open(He).then(e=>e.addAll(n.meta.files))},launch:dt};const mt=/([0-9a-f]{6})|([0-9a-f])([0-9a-f])([0-9a-f])/i;const pt=[0,60,120,180,240,300,360];function ht(e,t){let n;function s(e){const s="touch"===e.type.slice(0,5)?e.touches[0]:e;t((s.clientX-n.left)/n.width,(s.clientY-n.top)/n.height)}function o(t){n=e.getBoundingClientRect(),s(t),document.addEventListener("touchstart"===t.type?"touchmove":"mousemove",a,{passive:!1}),document.addEventListener("touchstart"===t.type?"touchend":"mouseup",i,{passive:!1}),t.stopPropagation(),t.preventDefault()}function a(e){s(e),e.preventDefault()}function i(e){document.removeEventListener("touchend"===e.type?"touchmove":"mousemove",a),document.removeEventListener(e.type,i),e.preventDefault()}e.addEventListener("mousedown",o,{passive:!1}),e.addEventListener("touchstart",o,{passive:!1})}function gt(e,t=0,n=1){return e>n?n:e<t?t:e}Ugwisha.version=1563855120070})();