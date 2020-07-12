const site = new URL(location.href).searchParams.get('collection');
fetch("/nails/collections").then(resp => resp.json()).then(body => {
   
    const data = {
        collections: body,
        showCollection: false
    };

    if (site) {

        document.title = body[site].name;
        data.showCollection = true;
        data.name = body[site].name;
        data.files = body[site].files;
    } 
    const app = new Vue({
        el: '#app',
        data: data
      });
});


