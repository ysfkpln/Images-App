const count = 30;
const apiKey = 'fg03-QBE7eImu2BWRb9rvbudLKe5iyK8D8tfXsNcguM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imagesContainer = document.getElementById("imageDiv");
const loader = document.getElementById("loading");

let isDownloaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];


async function getImages(){
    try{
        const response = await fetch(apiUrl);
        imagesArray = await response.json();
        displayImages();

    }catch(error){
    

    }
};



function displayImages(){
    imagesLoaded = 0;
    totalImages = imagesArray.length;
    imagesArray.forEach((image)=>{
        const item = document.createElement("a");
        setAttributes(item, {href: image.urls.regular})
        //item.setAttribute("href",image.urls.regular);

        const img = document.createElement("img");
        setAttributes(img ,{src:image.urls.regular, alt:image.alt_description})
        // img.setAttribute("src",image.urls.regular);
        // img.setAttribute("alt",image.alt_description);
        
        img.addEventListener("load",imageLoaded);

        item.appendChild(img);
        imagesContainer.appendChild(item)
    })
};

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        isDownloaded = true;
        loader.hidden = true;
    }
}


getImages();



function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isDownloaded){
        getImages();
    }
});

