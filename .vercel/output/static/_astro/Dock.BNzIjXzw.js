/* empty css                       */const y={name:"InvalidComponentArgs",title:"Invalid component arguments.",message:e=>`Invalid arguments passed to${e?` <${e}>`:""} component.`,hint:"Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."},g={name:"AstroGlobUsedOutside",title:"Astro.glob() used outside of an Astro file.",message:e=>`\`Astro.glob(${e})\` can only be used in \`.astro\` files. \`import.meta.glob(${e})\` can be used instead to achieve a similar result.`,hint:"See Vite's documentation on `import.meta.glob` for more information: https://vite.dev/guide/features.html#glob-import"},b={name:"AstroGlobNoMatch",title:"Astro.glob() did not match any files.",message:e=>`\`Astro.glob(${e})\` did not return any matching files.`,hint:"Check the pattern for typos."};function _(e){return e.replace(/\r\n|\r(?!\n)|\n/g,`
`)}function j(e,t){if(!t||t.line===void 0||t.column===void 0)return"";const r=_(e).split(`
`).map(i=>i.replace(/\t/g,"  ")),n=[];for(let i=-2;i<=2;i++)r[t.line+i]&&n.push(t.line+i);let s=0;for(const i of n){let c=`> ${i}`;c.length>s&&(s=c.length)}let o="";for(const i of n){const c=i===t.line-1;o+=c?"> ":"  ",o+=`${i+1} | ${r[i]}
`,c&&(o+=`${Array.from({length:s}).join(" ")}  | ${Array.from({length:t.column}).join(" ")}^
`)}return o}class h extends Error{loc;title;hint;frame;type="AstroError";constructor(t,r){const{name:n,title:s,message:o,stack:i,location:c,hint:m,frame:d}=t;super(o,r),this.title=s,this.name=n,o&&(this.message=o),this.stack=i||this.stack,this.loc=c,this.hint=m,this.frame=d}setLocation(t){this.loc=t}setName(t){this.name=t}setMessage(t){this.message=t}setHint(t){this.hint=t}setFrame(t,r){this.frame=j(t,r)}static is(t){return t.type==="AstroError"}}function z(e){return!(e.length!==3||!e[0]||typeof e[0]!="object")}function E(e,t,r){const n=t?.split("/").pop()?.replace(".astro","")??"",s=(...o)=>{if(!z(o))throw new h({...y,message:y.message(n)});return e(...o)};return Object.defineProperty(s,"name",{value:n,writable:!1}),s.isAstroComponentFactory=!0,s.moduleId=t,s.propagation=r,s}function N(e){return E(e.factory,e.moduleId,e.propagation)}function Y(e,t,r){return typeof e=="function"?E(e,t,r):N(e)}const H="4.16.19";function q(){return t=>{if(typeof t=="string")throw new h({...g,message:g.message(JSON.stringify(t))});let r=[...Object.values(t)];if(r.length===0)throw new h({...b,message:b.message(JSON.stringify(t))});return Promise.all(r.map(n=>n()))}}function F(e){return{site:void 0,generator:`Astro v${H}`,glob:q()}}typeof process<"u"&&process.stdout&&process.stdout.isTTY;const{replace:X}="",B=/[&<>'"]/g,U={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},V=e=>U[e],G=e=>X.call(e,B,V);function R(e){return!!e&&typeof e=="object"&&"then"in e&&typeof e.then=="function"}const W=G;class p extends String{get[Symbol.toStringTag](){return"HTMLString"}}const a=e=>e instanceof p?e:typeof e=="string"?new p(e):e;function J(e){return Object.prototype.toString.call(e)==="[object HTMLString]"}const Q=Symbol.for("astro:render");function Z(e){return Object.defineProperty(e,Q,{value:!0})}function M(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(r=M(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function K(){for(var e,t,r=0,n="",s=arguments.length;r<s;r++)(e=arguments[r])&&(t=M(e))&&(n&&(n+=" "),n+=t);return n}const ee=/^(?:allowfullscreen|async|autofocus|autoplay|checked|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i,te=/^(?:contenteditable|draggable|spellcheck|value)$/i,re=/^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i,ne=/&/g,se=/"/g,oe=new Set(["set:html","set:text"]),f=(e,t=!0)=>t?String(e).replace(ne,"&#38;").replace(se,"&#34;"):e,ie=e=>e.toLowerCase()===e?e:e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),v=e=>Object.entries(e).filter(([t,r])=>typeof r=="string"&&r.trim()||typeof r=="number").map(([t,r])=>t[0]!=="-"&&t[1]!=="-"?`${ie(t)}:${r}`:`${t}:${r}`).join(";");function l(e,t,r=!0){if(e==null)return"";if(e===!1)return te.test(t)||re.test(t)?a(` ${t}="false"`):"";if(oe.has(t))return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`),"";if(t==="class:list"){const n=f(K(e),r);return n===""?"":a(` ${t.slice(0,-5)}="${n}"`)}if(t==="style"&&!(e instanceof p)){if(Array.isArray(e)&&e.length===2)return a(` ${t}="${f(`${v(e[0])};${e[1]}`,r)}"`);if(typeof e=="object")return a(` ${t}="${f(v(e),r)}"`)}return t==="className"?a(` class="${f(e,r)}"`):typeof e=="string"&&e.includes("&")&&fe(e)?a(` ${t}="${f(e,!1)}"`):e===!0&&(t.startsWith("data-")||ee.test(t))?a(` ${t}`):a(` ${t}="${f(e,r)}"`)}const ae=()=>{};class ce{chunks=[];renderPromise;destination;constructor(t){this.renderPromise=t(this),Promise.resolve(this.renderPromise).catch(ae)}write(t){this.destination?this.destination.write(t):this.chunks.push(t)}async renderToFinalDestination(t){for(const r of this.chunks)t.write(r);this.destination=t,await this.renderPromise}}function k(e){return new ce(e)}typeof process<"u"&&Object.prototype.toString.call(process);const le=["http:","https:"];function fe(e){try{const t=new URL(e);return le.includes(t.protocol)}catch{return!1}}function ue(){return Z({type:"maybe-head"})}const C=Symbol.for("astro.renderTemplateResult");class me{[C]=!0;htmlParts;expressions;error;constructor(t,r){this.htmlParts=t,this.error=void 0,this.expressions=r.map(n=>R(n)?Promise.resolve(n).catch(s=>{if(!this.error)throw this.error=s,s}):n)}async render(t){const r=this.expressions.map(n=>k(s=>{if(n||n===0)return u(s,n)}));for(let n=0;n<this.htmlParts.length;n++){const s=this.htmlParts[n],o=r[n];t.write(a(s)),o&&await o.renderToFinalDestination(t)}}}function de(e){return typeof e=="object"&&e!==null&&!!e[C]}function w(e,...t){return new me(e,t)}const $=Symbol.for("astro:slot-string");class pe extends p{instructions;[$];constructor(t,r){super(t),this.instructions=r,this[$]=!0}}function he(e,t,r){return{async render(n){await u(n,typeof t=="function"?t(e):t)}}}new TextEncoder;new TextDecoder;function ye(e){return!!e&&typeof e=="object"&&"render"in e&&typeof e.render=="function"}async function u(e,t){if(R(t)&&(t=await t),t instanceof pe)e.write(t);else if(J(t))e.write(t);else if(Array.isArray(t)){const r=t.map(n=>k(s=>u(s,n)));for(const n of r)n&&await n.renderToFinalDestination(e)}else if(typeof t=="function")await u(e,t());else if(typeof t=="string")e.write(a(W(t)));else if(!(!t&&t!==0))if(ye(t))await t.render(e);else if(de(t))await t.render(e);else if(be(t))await t.render(e);else if(ArrayBuffer.isView(t))e.write(t);else if(typeof t=="object"&&(Symbol.asyncIterator in t||Symbol.iterator in t))for await(const r of t)await u(e,r);else e.write(t)}const ge=Symbol.for("astro.componentInstance");function be(e){return typeof e=="object"&&e!==null&&!!e[ge]}var x;(function(e){e[e.Include=0]="Include",e[e.None=1]="None"})(x||(x={}));var A;(function(e){e[e.Required=0]="Required",e[e.Ignore=1]="Ignore"})(A||(A={}));var T;(function(e){e[e.Include=0]="Include",e[e.None=1]="None"})(T||(T={}));var S;(function(e){e[e.Required=0]="Required",e[e.Ignore=1]="Ignore"})(S||(S={}));new TextEncoder;new TextDecoder;"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((e,t)=>(e[t.charCodeAt(0)]=t,e),[]);"-0123456789_".split("").reduce((e,t)=>(e[t.charCodeAt(0)]=t,e),[]);function ve(e={},t,{class:r}={}){let n="";r&&(typeof e.class<"u"?e.class+=` ${r}`:typeof e["class:list"]<"u"?e["class:list"]=[e["class:list"],r]:e.class=r);for(const[s,o]of Object.entries(e))n+=l(o,s,!0);return a(n)}var I=Object.freeze,we=Object.defineProperty,$e=(e,t)=>I(we(e,"raw",{value:I(e.slice())})),L;const xe=F(),Ae=Y((e,t,r)=>{const n=e.createAstro(xe,t,r);n.self=Ae;const{magnification:s=1.8,distance:o=150,color:i="rgba(20, 20, 20, 0.7)",blur:c="20px",enhance:m=!1,position:d="bottom",size:O="md",class:P="",...D}=n.props;return w`${ue()}<div${l(["astro-dock-container",P],"class:list")}${l(d,"data-position")} data-astro-cid-qy3g74cw> <nav class="astro-dock" data-astro-dock${l(m?"true":"false","data-enhance")}${l(s,"data-magnification")}${l(o,"data-distance")}${l(d,"data-position")}${l(O,"data-size")}${l(`--dock-color: ${i}; --dock-blur: ${c};`,"style")} role="toolbar" aria-label="Application dock"${ve(D)} data-astro-cid-qy3g74cw> ${he(e,r.default)} </nav> </div> ${m&&w(L||(L=$e([`<script>
    (function() {
      if (typeof window === "undefined") return;

      function canEnhance() {
        if (typeof window === "undefined") return false;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return false;
        }
        return true;
      }

      var initialized = new WeakMap();

      function enhanceDock(root) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!canEnhance()) return;
        if (initialized.has(root)) return;

        var items = Array.from(root.querySelectorAll(".dock-item"));
        var rippleTimers = new Map();

        var updateDock = function (mouseX) {
          var closestIndex = -1;
          var closestDistance = Infinity;

          items.forEach(function(item, index) {
            var rect = item.getBoundingClientRect();
            var centerX = rect.left + rect.width / 2;
            var distance = Math.abs(mouseX - centerX);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          items.forEach(function(item) {
            item.style.setProperty("--dock-item-scale", "1");
            item.style.setProperty("--dock-label-scale", "1");
            item.style.setProperty("--dock-item-y", "0px");
            item.style.setProperty("--dock-item-margin", "4px");
            item.classList.remove("is-active");
          });

          if (closestIndex === -1) return;

          var transformations = [
            { idx: closestIndex - 2, scale: 1.05, translateY: 0, margin: 4 },
            { idx: closestIndex - 1, scale: 1.15, translateY: -4, margin: 6 },
            { idx: closestIndex, scale: 1.5, translateY: -15, margin: 8 },
            { idx: closestIndex + 1, scale: 1.15, translateY: -4, margin: 6 },
            { idx: closestIndex + 2, scale: 1.05, translateY: 0, margin: 4 },
          ];

          transformations.forEach(function (t) {
            var idx = t.idx;
            var scale = t.scale;
            var translateY = t.translateY;
            var margin = t.margin;
            if (items[idx]) {
              items[idx].style.setProperty("--dock-item-scale", String(scale));
              items[idx].style.setProperty(
                "--dock-label-scale",
                String(1 / scale),
              );
              
              var finalTranslateY = root.dataset.position === "top" ? -translateY : translateY;
              items[idx].style.setProperty("--dock-item-y", finalTranslateY + "px");
              items[idx].style.setProperty("--dock-item-margin", margin + "px");
            }
          });

          if (items[closestIndex]) {
            items[closestIndex].classList.add("is-active");
          }
        };

        var handleMouseMove = function (e) {
          updateDock(e.clientX);
        };

        var handleMouseLeave = function () {
          items.forEach(function(item) {
            item.style.setProperty("--dock-item-scale", "1");
            item.style.setProperty("--dock-label-scale", "1");
            item.style.setProperty("--dock-item-y", "0px");
            item.style.setProperty("--dock-item-margin", "4px");
            item.classList.remove("is-active");
          });
        };

        var handleClick = function (e) {
          var target = e.currentTarget;
          var ripple = document.createElement("span");
          ripple.className = "dock-ripple";

          var rect = target.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + "px";
          ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
          ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

          target.appendChild(ripple);

          var existing = rippleTimers.get(target);
          if (existing) clearTimeout(existing);

          var t = setTimeout(function() {
            ripple.remove();
            rippleTimers.delete(target);
          }, 500);
          rippleTimers.set(target, t);
        };

        items.forEach(function(item) {
          item.addEventListener("click", handleClick);
        });

        root.addEventListener("mousemove", handleMouseMove, { passive: true });
        root.addEventListener("mouseleave", handleMouseLeave);

        initialized.set(root, true);

        var observer = new MutationObserver(function() {
          if (!document.contains(root)) {
            root.removeEventListener("mousemove", handleMouseMove);
            root.removeEventListener("mouseleave", handleMouseLeave);
            items.forEach(function(item) {
              item.removeEventListener("click", handleClick);
            });
            rippleTimers.forEach(function(t) { clearTimeout(t); });
            rippleTimers.clear();
            observer.disconnect();
            initialized.delete(root);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }

      var init = function() {
        document.querySelectorAll('[data-astro-dock][data-enhance="true"]:not([data-ready])')
          .forEach(function(el) {
            if (el instanceof HTMLElement) {
              el.dataset.ready = "true";
              enhanceDock(el);
            }
          });
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
      } else {
        init();
      }
    })();
  <\/script>`])))}`},"/home/halo/brutalist-portfolio/node_modules/@astroanimate/core/dist/components/Dock/Dock.astro",void 0);export{Ae as default};
