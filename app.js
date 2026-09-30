const DATA={
 users:[
  {id:"admin",en:"Faisal Alharbi",ar:"فيصل الحربي",phone:"0500000000",password:"admin123",role:"admin",jobEn:"Owner",jobAr:"المالك",salary:0},
  {id:"e1",en:"Ahmed Hassan",ar:"أحمد حسن",phone:"0551234567",password:"123456",role:"employee",jobEn:"Barista",jobAr:"باريستا",salary:4200},
  {id:"e2",en:"Sara Ali",ar:"سارة علي",phone:"0562223344",password:"123456",role:"employee",jobEn:"Cashier",jobAr:"كاشير",salary:3900}
 ],
 tasks:[
  {id:"t1",employeeId:"e1",en:"Clean espresso machine",ar:"تنظيف ماكينة الإسبريسو",due:"09:00",done:true},
  {id:"t2",employeeId:"e1",en:"Refill coffee beans",ar:"تعبئة حبوب القهوة",due:"10:30",done:true},
  {id:"t3",employeeId:"e1",en:"Check refrigerator stock",ar:"فحص مخزون الثلاجة",due:"14:00",done:false},
  {id:"t4",employeeId:"e1",en:"Closing station clean",ar:"تنظيف المحطة عند الإغلاق",due:"22:30",done:false},
  {id:"t5",employeeId:"e2",en:"Count till float",ar:"عد عهدة الصندوق",due:"08:15",done:true}
 ],
 salary:{employeeId:"e1",base:4200,additions:250,deductions:150,final:4300,published:true,
   reasonsEn:["Late arrival — SAR 50","Unapproved absence — SAR 100"],
   reasonsAr:["تأخير في الحضور — 50 ر.س","غياب غير معتمد — 100 ر.س"],
   reviewEn:"Strong customer service and task completion. Please improve punctuality.",
   reviewAr:"خدمة العملاء وإنجاز المهام ممتازان. نرجو تحسين الالتزام بالحضور."}
};
let lang=localStorage.getItem("effective-lang")||"en",current=null,page="dashboard";
const T={
 en:{staff:"STAFF MANAGEMENT",brand:"Simple daily operations for your whole team.",sub:"Tasks, staff records, salary statements and monthly reviews in one private workspace.",welcome:"WELCOME BACK",sign:"Sign in",hint:"Use your phone number and password.",phone:"Phone number",password:"Password",owner:"Owner demo",employeeDemo:"Employee demo",dash:"Dashboard",employees:"Employees",tasks:"Tasks",payroll:"Payroll",salary:"Salary",logout:"Sign out",overview:"OVERVIEW",hello:"Hello",active:"Active employees",today:"Tasks today",completion:"Completion",pending:"Still pending",team:"Today's team",progress:"Progress",status:"Status",done:"Completed",waiting:"Pending",assign:"Assign task",add:"Add employee",myTasks:"My Tasks",due:"Due",mark:"Mark done",statement:"Salary statement",base:"Base salary",adds:"Additions",deduct:"Deductions",net:"Net salary",reasons:"Deduction details",review:"Manager monthly review",lang:"العربية"},
 ar:{staff:"إدارة الموظفين",brand:"إدارة يومية بسيطة لفريقك بالكامل.",sub:"المهام وبيانات الموظفين والرواتب والتقييمات الشهرية في مساحة عمل واحدة.",welcome:"مرحباً بعودتك",sign:"تسجيل الدخول",hint:"استخدم رقم الجوال وكلمة المرور.",phone:"رقم الجوال",password:"كلمة المرور",owner:"تجربة المالك",employeeDemo:"تجربة الموظف",dash:"لوحة التحكم",employees:"الموظفون",tasks:"المهام",payroll:"الرواتب",salary:"الراتب",logout:"تسجيل الخروج",overview:"نظرة عامة",hello:"مرحباً",active:"الموظفون النشطون",today:"مهام اليوم",completion:"نسبة الإنجاز",pending:"المتبقي",team:"فريق اليوم",progress:"التقدم",status:"الحالة",done:"مكتمل",waiting:"قيد الانتظار",assign:"إسناد مهمة",add:"إضافة موظف",myTasks:"مهامي",due:"الاستحقاق",mark:"تم الإنجاز",statement:"بيان الراتب",base:"الراتب الأساسي",adds:"الإضافات",deduct:"الخصومات",net:"صافي الراتب",reasons:"تفاصيل الخصومات",review:"تقييم المدير الشهري",lang:"English"}
};
const $=id=>document.getElementById(id),t=k=>T[lang][k],name=u=>lang==="ar"?u.ar:u.en,job=u=>lang==="ar"?u.jobAr:u.jobEn;
function money(v){return new Intl.NumberFormat(lang==="ar"?"ar-SA":"en-SA",{style:"currency",currency:"SAR",maximumFractionDigits:0}).format(v)}
function initials(n){return n.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function toast(msg){const e=$("toast");e.textContent=msg;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1600)}
function setLang(next){lang=next;localStorage.setItem("effective-lang",lang);document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.documentElement.lang=lang;document.body.classList.toggle("rtl",lang==="ar");renderStatic();if(current)renderApp()}
function renderStatic(){
 document.querySelector(".brand-pane .kicker").textContent=t("staff");document.querySelector(".brand-pane h1").textContent=t("brand");document.querySelector(".brand-pane p").textContent=t("sub");
 document.querySelector(".login-card .kicker").textContent=t("welcome");document.querySelector(".login-card h2").textContent=t("sign");document.querySelector(".login-card .muted").textContent=t("hint");
 const labs=document.querySelectorAll(".login-card label");labs[0].childNodes[0].nodeValue=t("phone")+" ";labs[1].childNodes[0].nodeValue=t("password")+" ";
 document.querySelector(".login-card>.primary").textContent=t("sign");document.querySelector('[data-fill="admin"]').textContent=t("owner");document.querySelector('[data-fill="employee"]').textContent=t("employeeDemo");
 let b=$("langSwitch");if(!b){b=document.createElement("button");b.id="langSwitch";b.className="soft lang-switch";document.body.appendChild(b);b.onclick=()=>setLang(lang==="en"?"ar":"en")}b.textContent=t("lang");
}
document.querySelector('[data-fill="admin"]').onclick=()=>{$("phone").value="0500000000";$("password").value="admin123"};
document.querySelector('[data-fill="employee"]').onclick=()=>{$("phone").value="0551234567";$("password").value="123456"};
$("loginForm").onsubmit=e=>{e.preventDefault();current=DATA.users.find(u=>u.phone===$("phone").value&&u.password===$("password").value);if(!current)return toast(lang==="ar"?"بيانات الدخول غير صحيحة":"Incorrect login details");$("login").classList.add("hidden");$("app").classList.remove("hidden");page="dashboard";renderApp()};
$("logout").onclick=()=>{current=null;$("app").classList.add("hidden");$("login").classList.remove("hidden")};
$("menuBtn").onclick=()=>document.querySelector("aside").classList.toggle("open");
function renderApp(){
 $("sideAvatar").textContent=initials(name(current));$("topAvatar").textContent=initials(name(current));$("sideName").textContent=name(current);$("sideRole").textContent=job(current);$("logout").textContent=t("logout");
 const items=current.role==="admin"?[["dashboard","⌂",t("dash")],["employees","◎",t("employees")],["tasks","✓",t("tasks")],["payroll","﷼",t("payroll")]]:[["dashboard","⌂",t("dash")],["tasks","✓",t("myTasks")],["salary","﷼",t("salary")]];
 $("nav").innerHTML=items.map(i=>`<button class="nav-btn ${page===i[0]?"active":""}" data-p="${i[0]}"><span>${i[1]}</span>${i[2]}</button>`).join("");
 document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>{page=b.dataset.p;renderApp()});
 if(current.role==="admin"){if(page==="dashboard")adminDashboard();if(page==="employees")employees();if(page==="tasks")tasksAdmin();if(page==="payroll")payroll()}
 else{if(page==="dashboard"||page==="tasks")employeeTasks();if(page==="salary")salary()}
}
function head(title){$("eyebrow").textContent=t("overview");$("title").textContent=title}
function stat(v,l){return `<div class="card stat"><div class="num">${v}</div><small>${l}</small></div>`}
function employeeCell(u){return `<div class="employee"><div class="avatar">${initials(name(u))}</div><div><b>${name(u)}</b><small>${job(u)}</small></div></div>`}
function adminDashboard(){
 head(t("dash"));const emps=DATA.users.filter(u=>u.role==="employee"),done=DATA.tasks.filter(x=>x.done).length,total=DATA.tasks.length,p=Math.round(done/total*100);
 $("content").innerHTML=`<div class="card hero"><span class="kicker">${t("overview")}</span><h2>${t("hello")}, ${name(current).split(" ")[0]}</h2><p>${lang==="ar"?"هذا ملخص أداء الفريق اليوم.":"Here is today's team activity at a glance."}</p></div>
 <div class="grid g4" style="margin-top:16px">${stat(emps.length,t("active"))}${stat(total,t("today"))}${stat(p+"%",t("completion"))}${stat(total-done,t("pending"))}</div>
 <div class="section-head"><div><h3>${t("team")}</h3></div><div class="actions"><button class="primary" onclick="openTask()">+ ${t("assign")}</button><button class="soft" onclick="openEmployee()">+ ${t("add")}</button></div></div>
 <div class="table-wrap"><table><thead><tr><th>${t("employees")}</th><th>${t("tasks")}</th><th>${t("progress")}</th><th>${t("status")}</th></tr></thead><tbody>${emps.map(e=>{let ts=DATA.tasks.filter(x=>x.employeeId===e.id),d=ts.filter(x=>x.done).length,ep=ts.length?Math.round(d/ts.length*100):0;return `<tr><td>${employeeCell(e)}</td><td>${d}/${ts.length}</td><td><div class="progress"><div style="width:${ep}%"></div></div></td><td><span class="status ${ep===100?"complete":"pending"}">${ep===100?t("done"):t("waiting")}</span></td></tr>`}).join("")}</tbody></table></div>`;
}
function employees(){head(t("employees"));$("content").innerHTML=`<div class="section-head"><h3>${t("employees")}</h3><button class="primary" onclick="openEmployee()">+ ${t("add")}</button></div><div class="table-wrap"><table><thead><tr><th>${t("employees")}</th><th>${t("phone")}</th><th>${t("salary")}</th></tr></thead><tbody>${DATA.users.filter(u=>u.role==="employee").map(e=>`<tr><td>${employeeCell(e)}</td><td>${e.phone}</td><td>${money(e.salary)}</td></tr>`).join("")}</tbody></table></div>`}
function taskCard(x,own=false){return `<div class="task ${x.done?"done":""}"><button class="check" ${own?`onclick="toggleTask('${x.id}')"`:"disabled"}>${x.done?"✓":""}</button><div><h4>${lang==="ar"?x.ar:x.en}</h4><p>${t("due")}: ${x.due}</p></div>${own&&!x.done?`<button class="soft" onclick="toggleTask('${x.id}')">${t("mark")}</button>`:`<span class="status ${x.done?"complete":"pending"}">${x.done?t("done"):t("waiting")}</span>`}</div>`}
function tasksAdmin(){head(t("tasks"));$("content").innerHTML=`<div class="section-head"><h3>${t("today")}</h3><button class="primary" onclick="openTask()">+ ${t("assign")}</button></div><div class="tasks">${DATA.tasks.map(x=>taskCard(x)).join("")}</div>`}
function employeeTasks(){head(t("myTasks"));const ts=DATA.tasks.filter(x=>x.employeeId===current.id);$("content").innerHTML=`<div class="card hero"><h2>${t("hello")}, ${name(current).split(" ")[0]}</h2><p>${ts.filter(x=>x.done).length}/${ts.length} ${t("done")}</p></div><div class="section-head"><h3>${t("today")}</h3></div><div class="tasks">${ts.map(x=>taskCard(x,true)).join("")}</div>`}
function salary(){head(t("salary"));const s=DATA.salary;if(current.id!==s.employeeId||!s.published){$("content").innerHTML=`<div class="card"><p class="muted">${lang==="ar"?"لم يتم نشر راتب هذا الشهر بعد.":"This month's salary has not been published yet."}</p></div>`;return}$("content").innerHTML=`<div class="grid g2"><div class="card salary"><span class="kicker">${t("statement")}</span><div class="amount">${money(s.final)}</div><div class="salary-grid"><div><b>${money(s.base)}</b><small>${t("base")}</small></div><div><b>${money(s.additions)}</b><small>${t("adds")}</small></div><div><b>${money(s.deductions)}</b><small>${t("deduct")}</small></div></div></div><div class="card"><h3>${t("reasons")}</h3><div class="list">${(lang==="ar"?s.reasonsAr:s.reasonsEn).map(r=>`<div class="list-item"><span>${r}</span></div>`).join("")}</div></div></div><div class="section-head"><h3>${t("review")}</h3></div><div class="card"><p>${lang==="ar"?s.reviewAr:s.reviewEn}</p></div>`}
function payroll(){head(t("payroll"));$("content").innerHTML=`<div class="table-wrap"><table><thead><tr><th>${t("employees")}</th><th>${t("base")}</th><th>${t("deduct")}</th><th>${t("net")}</th></tr></thead><tbody>${DATA.users.filter(u=>u.role==="employee").map(e=>{const s=e.id===DATA.salary.employeeId?DATA.salary:{base:e.salary,deductions:0,final:e.salary};return `<tr><td>${employeeCell(e)}</td><td>${money(s.base)}</td><td>${money(s.deductions)}</td><td><b>${money(s.final)}</b></td></tr>`}).join("")}</tbody></table></div>`}
window.toggleTask=id=>{const x=DATA.tasks.find(v=>v.id===id);x.done=!x.done;renderApp();toast(x.done?t("done"):t("waiting"))}
window.openEmployee=()=>toast(lang==="ar"?"واجهة إضافة الموظف جاهزة للنسخة التالية":"Employee form is queued for the next prototype step");
window.openTask=()=>toast(lang==="ar"?"واجهة إسناد المهام جاهزة للنسخة التالية":"Task assignment form is queued for the next prototype step");
setLang(lang);