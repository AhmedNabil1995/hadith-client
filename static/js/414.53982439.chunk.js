"use strict";(self.webpackChunkhadith_client=self.webpackChunkhadith_client||[]).push([[414],{414:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var a=s(43),l=s(326),n=s(463),i=s(213),r=s(579);const d=e=>{var t,s;let{bookId:d,faslId:h,categoryId:c,firstHadith:o}=e;const[x,g]=(0,a.useState)([]),m=async e=>{const t=await i.A.get("https://hadith-smoky.vercel.app/api/hadiths",{params:{hadith_no:e}});g(t.data.hadiths||[])};(0,a.useEffect)((()=>{m(o||1)}),[]);const b=null===(t=x[x.length-1])||void 0===t?void 0:t.takhreej,f=x.flatMap((e=>e.footnotes));return(0,r.jsxs)("div",{className:"flex flex-col min-h-screen bg-gray-50 pt-16 pb-20",children:[(0,r.jsxs)("div",{className:"flex-1 p-4",children:[(0,r.jsx)("div",{className:"bg-green-600 text-white p-3 rounded-t-lg text-right",children:(0,r.jsx)("h2",{className:"text-lg font-bold",children:null===x||void 0===x||null===(s=x[0])||void 0===s?void 0:s.category_name})}),x.map(((e,t)=>{return(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsxs)("div",{className:"bg-white rounded-b-lg shadow-lg p-6 mb-4",children:[(0,r.jsx)("div",{className:"flex justify-between items-center mb-4",children:(0,r.jsxs)("span",{className:"text-green-600 font-bold text-lg",children:["\u062d\u062f\u064a\u062b \u0631\u0642\u0645: ",e.hadith_no]})}),(0,r.jsx)("div",{className:"text-right mb-6 leading-relaxed text-lg",dangerouslySetInnerHTML:{__html:(s=e.hadith_text,s.replace(/{\[(\d+)]}/g,((e,t)=>`<a href="#ref${t}">${e}</a>`)))}}),(0,r.jsxs)("div",{className:"flex justify-between items-center text-sm border-t pt-4",children:[(0,r.jsx)("span",{className:"text-gray-600",children:e.reference}),(0,r.jsx)("span",{className:"text-green-600 font-semibold",children:e.hukm})]})]},t)]});var s})),(f.length>0||b)&&(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-lg p-6 mt-4  mb-4",children:[f.length>0&&(0,r.jsx)("h3",{className:"text-right font-bold text-lg mb-3 text-green-600",children:"\u0627\u0644\u0634\u0631\u062d \u0648\u0627\u0644\u0641\u0648\u0627\u0626\u062f"}),f.map(((e,t)=>(0,r.jsx)("div",{className:"text-right text-gray-700",children:(0,r.jsxs)("p",{className:"mb-2",id:`ref${t}`,children:[`{[${t+1}]}`," ",e.footnotes]},t)}))),b&&(0,r.jsxs)("div",{className:""+(f.length>0?"mt-4 pt-4 border-t":""),children:[(0,r.jsx)("h4",{className:"text-right font-bold mb-2 text-green-600",children:"\u0627\u0644\u062a\u062e\u0631\u064a\u062c"}),(0,r.jsx)("p",{className:"text-right text-gray-700",children:b})]})]})]}),(0,r.jsxs)("div",{className:"fixed bottom-20 left-0 right-0 flex justify-between px-4 py-2",children:[(0,r.jsx)("button",{onClick:async()=>{await m(x[0].hadith_no-1),window.scrollTo({top:0,behavior:"smooth"})},className:"bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700",children:(0,r.jsx)(l.A,{className:"h-6 w-6"})}),(0,r.jsx)("button",{onClick:async()=>{await m(x[0].hadith_no+1),window.scrollTo({top:0,behavior:"smooth"})},className:"bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700",children:(0,r.jsx)(n.A,{className:"h-6 w-6"})})]})]})}}}]);
//# sourceMappingURL=414.53982439.chunk.js.map