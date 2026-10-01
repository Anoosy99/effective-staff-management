T.en.home="Home"; T.en.profile="Profile"; T.en.completedBy="Completed by"; T.en.role="Position";
T.ar.home="الرئيسية"; T.ar.profile="الملف الشخصي"; T.ar.completedBy="أكملها"; T.ar.role="المسمى الوظيفي";

const effectiveCompletionHistory = {
  t1:{userId:"e1",time:"08:42"},
  t2:{userId:"e1",time:"10:05"},
  t5:{userId:"e2",time:"08:09"}
};

const originalTaskCard = taskCard;
taskCard = function(x, own=false){
  let html = originalTaskCard(x, own);
  if(!x.done) return html;
  const rec = effectiveCompletionHistory[x.id];
  if(!rec) return html;
  const worker = DATA.users.find(u=>u.id===rec.userId);
  if(!worker) return html;
  const marker = '<p class="completion-meta">'+t("completedBy")+' '+name(worker)+' • '+rec.time+'</p>';
  const needle = '<p>'+t("due")+': '+x.due+'</p>';
  return html.replace(needle, needle + marker);
};

const originalToggleTask = window.toggleTask;
window.toggleTask = function(id){
  const x = DATA.tasks.find(v=>v.id===id);
  const before = x.done;
  originalToggleTask(id);
  if(!before && x.done && current){
    effectiveCompletionHistory[id] = {
      userId: current.id,
      time: new Date().toLocaleTimeString(lang==="ar"?"ar-SA":"en-US",{hour:"numeric",minute:"2-digit"})
    };
    if(window.effectiveNotificationState){
      window.effectiveNotificationState.items.unshift({
        id:"n"+Date.now(),
        userId:"admin",
        en:name(current)+" completed a task.",
        ar:"أكمل "+name(current)+" إحدى المهام.",
        whenEn:"Just now",
        whenAr:"الآن",
        read:false
      });
    }
  } else if(before && !x.done){
    delete effectiveCompletionHistory[id];
  }
  renderApp();
};

function effectiveProfilePage(){
  head(t("profile"));
  content.innerHTML='<div class="card profile-grid"><div class="avatar profile-big">'+initials(name(current))+'</div><div><h2>'+name(current)+'</h2><p class="muted">'+job(current)+'</p><div class="profile-details"><div class="profile-row"><span>'+t("phone")+'</span><b>'+current.phone+'</b></div><div class="profile-row"><span>'+t("role")+'</span><b>'+job(current)+'</b></div><div class="profile-row"><span>'+t("base")+'</span><b>'+money(current.salary)+'</b></div></div></div></div>';
}

function renderEffectiveMobileNav(items){
  const mobile=document.getElementById("mobileNav");
  if(current.role==="admin"){mobile.innerHTML="";mobile.style.display="none";return;}
  mobile.style.display="";
  mobile.innerHTML=items.map(i=>'<button class="'+(page===i[0]?"active":"")+'" data-mobile-page="'+i[0]+'"><span>'+i[1]+'</span>'+i[2]+'</button>').join("");
  mobile.querySelectorAll("button").forEach(b=>b.onclick=()=>{page=b.dataset.mobilePage;renderApp()});
}

const originalRenderApp = renderApp;
renderApp = function(){
  originalRenderApp();
  if(!current) return;
  if(current.role==="employee"){
    const items=[["dashboard","⌂",t("home")],["tasks","✓",t("myTasks")],["salary","﷼",t("salary")],["profile","◉",t("profile")]];
    nav.innerHTML=items.map(i=>'<button class="nav-btn '+(page===i[0]?"active":"")+'" data-p="'+i[0]+'"><span>'+i[1]+'</span>'+i[2]+'</button>').join("");
    nav.querySelectorAll("button").forEach(b=>b.onclick=()=>{page=b.dataset.p;renderApp()});
    renderEffectiveMobileNav(items);
    if(page==="profile") effectiveProfilePage();
  } else {
    renderEffectiveMobileNav([]);
  }
  if(window.renderEffectiveNotifications) window.renderEffectiveNotifications();
};