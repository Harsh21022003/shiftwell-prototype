// [id, person, site, shift date, station, hrs, trained, needsCert, certExpiry, weekHrsBefore]
const Q=[
[1,"Anita (nurse)","CarePoint","2026-11-10","Triage",8,1,1,"2027-03-01",32],
[2,"Rahul (nurse)","CarePoint","2026-11-12","Triage",8,1,1,"2026-10-31",30],
[3,"Meena (cook)","FreshBowl","2026-11-11","Grill",8,1,0,null,36],
[4,"Imran (cook)","FreshBowl","2026-11-11","Fryer",8,0,0,null,30],
[5,"Priya (cashier)","UrbanMart","2026-11-13","Till",8,1,0,null,44],
[6,"Karan (nurse)","CarePoint","2026-11-14","Ward",8,1,1,null,28],
[7,"Sunita (cook)","FreshBowl","2026-11-15","Prep",6,1,0,null,40],
[8,"Dev (associate)","UrbanMart","2026-11-16","Floor",9,1,0,null,41],
[9,"Latha (nurse)","CarePoint","2026-11-20","Triage",8,1,1,"2026-11-15",32],
[10,"Farah (cook)","FreshBowl","2026-11-17","Grill",8,1,0,null,30],
[11,"Arjun (cashier)","UrbanMart","2026-11-18","Till",8,0,0,null,24],
[12,"Neha (nurse)","CarePoint","2026-11-19","Ward",8,1,1,"2027-06-30",40],
[13,"Vik (cook)","FreshBowl","2026-11-19","Fryer",8,0,0,null,46],
[14,"Zoya (cook)","FreshBowl","2026-11-20","Prep",8,1,0,null,28]];
const $=id=>document.getElementById(id);
function judge(r){
 const [id,who,site,d,st,h,tr,nc,ce,wk]=r,after=wk+h,why=[];
 let certBad=nc&&(!ce||ce<d), over=after>+$("cap").value, untr=!tr;
 if($("rCert").checked&&certBad){return ["blk","Blocked",ce?"Certificate expires "+ce+", before this shift":"No valid certificate on file"]}
 if($("rTrain").checked&&untr)return["mgr","Location Manager","Not trained for "+st];
 if($("rHrs").checked&&over)return $("rAuto").checked?["reg","Regional approver","Goes over "+$("cap").value+" hrs/week ("+after+")"]:["mgr","Location Manager","Over cap, but auto-approve is off"];
 if($("rAuto").checked)return["auto","Auto-approved","Passes every rule"];
 return["mgr","Location Manager","Auto-approve is off: every swap waits"];
}
function render(){
 const res=Q.map(judge),c={auto:0,mgr:0,reg:0,blk:0};
 $("rows").innerHTML=Q.map((r,i)=>{const o=res[i];c[o[0]]++;
  return `<tr><td>${r[1]}<div class="why">${r[2]}</div></td><td>${r[3]}<div class="why">${r[4]}, ${r[5]} hrs</div></td><td>${r[9]+r[5]}</td><td><span class="pill ${o[0]}">${o[1]}</span></td><td class="why">${o[2]}</td></tr>`}).join("");
 const n=Q.length,man=c.mgr;
 $("stats").innerHTML=[["auto",c.auto,"Auto-approved"],["mgr",c.mgr,"To Location Manager"],["reg",c.reg,"To regional approver"],["blk",c.blk,"Blocked (certificate)"]].map(s=>`<div class="stat"><b>${s[1]} of ${n}</b><span>${s[2]}</span></div>`).join("");
 const cur=+$("cur").value/100,sh=+$("share").value/100,vol=+$("vol").value,m=+$("mins").value;
 const after=sh+(1-sh)*cur;
 $("est").innerHTML=[[Math.round(cur*100)+"% → "+Math.round(after*100)+"%","Approved within 24 hrs"],[Math.round(vol*(1-sh)).toLocaleString("en-IN"),"Swaps/month still needing a person (from "+vol.toLocaleString("en-IN")+")"],[Math.round(vol*sh*m/60).toLocaleString("en-IN")+" hrs","Manager time saved per month, whole account"]].map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
}
document.querySelectorAll("input").forEach(e=>e.addEventListener("input",render));render();
