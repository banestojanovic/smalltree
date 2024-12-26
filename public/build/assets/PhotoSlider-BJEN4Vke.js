import{r as w,j as s}from"./app-DDXEnFeq.js";import{S as l,f as n,T as c,N as j,d}from"./navigation-DZ7MDhnY.js";import{B as t}from"./button-DX-a5s2M.js";import{c as m}from"./createLucideIcon-gdiQdiTj.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=m("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=m("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function b({product:r}){var i,a;const[u,x]=w.useState(null);return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"",children:[s.jsx("div",{className:"h-full",children:s.jsx(l,{spaceBetween:10,thumbs:{swiper:u},modules:[n,c,j],navigation:{nextEl:".slider-next",prevEl:".slider-prev"},className:"h-full w-full",children:(i=r.photos)==null?void 0:i.map(e=>(e==null?void 0:e.original_url)&&s.jsx(d,{children:s.jsx("img",{className:"h-96 w-full rounded-lg object-cover",src:e==null?void 0:e.original_url,alt:"Product slider image"})},e==null?void 0:e.id))})}),s.jsxs("div",{className:"mt-5 flex items-center justify-between gap-x-5",children:[s.jsx(t,{className:"slider-prev",variant:"outline",children:s.jsx(f,{})}),s.jsx(l,{onSwiper:e=>x(e),spaceBetween:4,freeMode:!0,watchSlidesProgress:!0,modules:[n,c],slidesPerView:2,breakpoints:{640:{slidesPerView:2,spaceBetween:4},768:{slidesPerView:"auto",spaceBetween:4},1024:{slidesPerView:"auto",spaceBetween:4}},className:"mySwiper",children:(a=r.photos)==null?void 0:a.map(e=>(e==null?void 0:e.original_url)&&s.jsx(d,{children:s.jsx("img",{className:"aspect-square h-20 w-[calc(100%-10px)] cursor-pointer rounded-lg object-cover",src:e==null?void 0:e.original_url,alt:"Product slider image"})},e.id))}),s.jsx(t,{className:"slider-next",variant:"outline",children:s.jsx(g,{})})]})]})})}export{b as default};
