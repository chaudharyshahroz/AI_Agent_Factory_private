import { NextResponse } from "next/server";

export async function GET() {
  const js = `
(function(){
  var script=document.currentScript,agentId=script.dataset.agentId,publicKey=script.dataset.publicKey;
  var root=document.createElement('div');root.id='agentfactory-widget';document.body.appendChild(root);
  var open=false,cid=localStorage.getItem('af_conversation_'+agentId)||'';
  root.innerHTML='<button aria-label="Open chat" style="position:fixed;right:20px;bottom:20px;border:0;border-radius:999px;background:#0d8277;color:white;width:56px;height:56px;box-shadow:0 10px 25px rgba(0,0,0,.2);font-size:22px">AI</button><div style="display:none;position:fixed;right:20px;bottom:88px;width:min(360px,calc(100vw - 32px));height:520px;background:white;border:1px solid #ddd;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,.18);overflow:hidden;font-family:system-ui"><div style="padding:14px 16px;background:#0d8277;color:white;font-weight:600">AgentFactory AI</div><div data-list style="height:390px;overflow:auto;padding:12px;font-size:14px"><p>Hello. How can I help?</p></div><form style="display:flex;border-top:1px solid #eee"><input style="flex:1;border:0;padding:12px;outline:none" placeholder="Type a message"/><button style="border:0;background:#0d8277;color:white;padding:0 14px">Send</button></form></div>';
  var btn=root.children[0],panel=root.children[1],list=panel.querySelector('[data-list]'),form=panel.querySelector('form'),input=form.querySelector('input');
  btn.onclick=function(){open=!open;panel.style.display=open?'block':'none'};
  form.onsubmit=async function(e){e.preventDefault();var msg=input.value.trim();if(!msg)return;input.value='';list.innerHTML+='<p><b>You:</b> '+msg.replace(/[<>]/g,'')+'</p>';try{var res=await fetch('/api/chat/'+agentId,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:msg,conversationId:cid||undefined,deploymentKey:publicKey,source:'WEBSITE_WIDGET'})});var data=await res.json();if(data.conversationId){cid=data.conversationId;localStorage.setItem('af_conversation_'+agentId,cid)}list.innerHTML+='<p><b>Agent:</b> '+String(data.message||data.error||'Error').replace(/[<>]/g,'')+'</p>'}catch(err){list.innerHTML+='<p>Connection error.</p>'}list.scrollTop=list.scrollHeight};
})();`;
  return new NextResponse(js, { headers: { "content-type": "application/javascript; charset=utf-8" } });
}
