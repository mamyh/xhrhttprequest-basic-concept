const get = document.querySelector('.get');
const send = document.querySelector('.send');

function sendRequest(method,url,data){
  const promise = new Promise(function(res,rej){
   const xhr = new XMLHttpRequest();
   xhr.open(method,url);
   xhr.responseType = 'json';
   xhr.setRequestHeader('content-type','application/json');
   xhr.send(data);
   xhr.onload = function(){
      if(xhr.status >= 400){
         rej(xhr.response);
      }
      res(xhr.response);
   }
   xhr.onerror = function(){
      rej(xhr.response);
   }
  });
  return promise;

}

get.addEventListener('click',function(){
   sendRequest('GET','https://jsonplaceholder.typicode.com/posts').then(function(res){
      console.log(res);
   }).catch(function(err){
      console.log('something was wrong '+err);
   })
});

send.addEventListener('click',function(){
    sendRequest('POST','https://jsonplaceholder.typicode.com/posts/',JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    })).then(function(res){
       console.log(res)
    }).catch(function(err){
       console.log(err);
    })
});