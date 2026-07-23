const API = window.APP_CONFIG.API_BASE_URL;
function token(kind){return localStorage.getItem(`${kind}_token`)||''}
async function api(path, options={}){
  const headers={...(options.headers||{}),'Content-Type':'application/json'};
  if(options.kind) headers.Authorization=`Bearer ${token(options.kind)}`;
  const response=await fetch(`${API}${path}`,{...options,headers});
  if(!response.ok){let data={};try{data=await response.json()}catch{};throw new Error(data.error||`Request failed (${response.status})`)}
  return response.headers.get('content-type')?.includes('json')?response.json():response;
}
function money(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(v||0))}
function dateFmt(v){if(!v)return'';return new Date(`${String(v).slice(0,10)}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
function show(id,message,type='error'){const el=document.getElementById(id);el.textContent=message;el.className=`notice show ${type}`}
function logout(kind,page){localStorage.removeItem(`${kind}_token`);localStorage.removeItem(`${kind}_user`);location.href=page}
