import{c as b}from"./createLucideIcon-BK3__p92.js";import{r as u}from"./app-ChooiqfW.js";import{a as d}from"./index-CMGEL_yX.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=b("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);function S(r){const[e,i]=u.useState(void 0);return d(()=>{if(r){i({width:r.offsetWidth,height:r.offsetHeight});const f=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const n=o[0];let t,s;if("borderBoxSize"in n){const c=n.borderBoxSize,a=Array.isArray(c)?c[0]:c;t=a.inlineSize,s=a.blockSize}else t=r.offsetWidth,s=r.offsetHeight;i({width:t,height:s})});return f.observe(r,{box:"border-box"}),()=>f.unobserve(r)}else i(void 0)},[r]),e}function p(r){const e=u.useRef({value:r,previous:r});return u.useMemo(()=>(e.current.value!==r&&(e.current.previous=e.current.value,e.current.value=r),e.current.previous),[r])}export{v as C,S as a,p as u};
