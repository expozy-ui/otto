


export let Gallery = {

    get_GalleryPosts: async function (data, options) {

        var images = [];
        if (data.obj == 'artist') {
            // debugger
            images = dataProxy.artist.images;
        }
        if (data.obj == 'bPortfolio') {
            // debugger
            images = dataProxy.bPortfolio.images;
        }
        // debugger
        var imgHTML = '';
        for (const image of images) {
            imgHTML += `<img src="${image.url}"  class="item  p-2 grid-item">`;

        }
        document.getElementById(data.container).innerHTML = imgHTML;
        await new Promise(resolve => setTimeout(resolve, 500));
        loadWall();

        return response;
    },






};
window.Gallery = Gallery;
