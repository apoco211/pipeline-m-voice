export async function onRequestPost(context) {
  try {
    const request = context.request;
    const bodyText = await request.text();
    let payload;
    try { payload = JSON.parse(bodyText); } catch { payload = {}; }
    const token = request.headers.get('X-Todoist-Token') || request.headers.get('Authorization')?.replace('Bearer ','');
    if (!token) {
      return new Response(JSON.stringify({error:'Missing Todoist token'}), {status:401, headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
    }
    const todoistRes = await fetch('https://api.todoist.com/api/v1/tasks', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`},
      body: JSON.stringify(payload)
    });
    const data = await todoistRes.text();
    return new Response(data, {
      status: todoistRes.status,
      headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Content-Type, Authorization, X-Todoist-Token'
      }
    });
  } catch(e) {
    return new Response(JSON.stringify({error:String(e)}), {status:500, headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
  }
}
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type, Authorization, X-Todoist-Token'
    }
  });
}
