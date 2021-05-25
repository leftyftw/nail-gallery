const site = new URL(location.href).searchParams.get('collection');
fetch("/nails/collections").then(resp => resp.json()).then(body => {

  const data = {
    collections: body,
    showCollection: false
  };

  for (let x in data.collections) {
    if (!data.collections.hasOwnProperty(x)) continue;
    const col = data.collections[x];
    col.bgImage = `"${col.files[0]}"`;
    col.bgImage = col.bgImage.replace('/nails/', '/nails/thumbnail/');
  }

  if (site) {
    document.title = body[site].name;
    data.showCollection = true;
    data.name = body[site].name;
    data.files = body[site].files;
    // data.images = data.files.map(x => ({ name: x }));
  }

  Vue.use(Lightbox);
  const app = new Vue({
    el: '#app',
    data: data,
    methods: {
      navigateToCollection: function (collection) {
        document.location.href = `?collection=${collection.name}`;
      },

      showImageCallback: function (image) {
        const doit = () => {
          const div = document.createElement('div');
          const container = document.getElementsByClassName('lightbox-image')[0];
          container.innerHTML = '';
          if (image.isVideo) {
            div.innerHTML = `<video controls src="${image.name}"></video>`;
            container.appendChild(div);
            console.log('show', image.name);
          }
        };

        setTimeout(doit, 500);
      },
      showLightbox: function (imageName) {
        this.$refs.lightbox.show(imageName);
      },

      showVideoLightbox: function (videoName) {
        this.$refs.lightbox.show(videoName);
      }
    },
    computed: {
      images: function () {
        const images = this.files.map(x => ({
            name: x,
            id: x.substr(x.lastIndexOf('/') + 1)
          }))
          .map(x => {
            const isVideo = !(x.name.toUpperCase().endsWith('JPG') || x.name.toUpperCase().endsWith('PNG'));
            const title = x.id.substr(0, x.id.lastIndexOf('.'));
            const thumb = isVideo ? x.name : x.name.replace('/nails/', '/nails/thumbnail/'); 
            const alt = title;
            return {
              ...x,
              thumb,
              isVideo,
              title,
              alt
            };
          });
        return images;
      }
    }
  });
});
