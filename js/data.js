const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
function showPage() {
    let root =document.getElementsByClassName("flex-container justify")[0];
    //我已经把我的IDE的JS版本修改为ES6但是“let definitions are not supported by current javascript version”的报错依然没有消失
    for (let i = 0;i<4;i++){
        root.innerHTML= root.innerHTML + '<div class="item"><h2>'+countries[i].name+'</h2><h3>'+countries[i].continent+'</h3><div class="inner-box"><h3>Cities</h3><ul></ul></div><div class="inner-box"><h3>Popular Photos</h3></div><button>visit</button></div>';
        let list = document.getElementsByTagName('ul')[i];
        for (let j = 0;j<countries[i].cities.length;j++){
            list.innerHTML =list.innerHTML +'<li>'+countries[i].cities[j]+'</li>';
        }
        let n = i+i+1;
        let imgList = document.getElementsByClassName('inner-box')[n];
        for (let k = 0;k<countries[i].photos.length;k++){
            imgList.innerHTML =imgList.innerHTML +'<img class="photo" src="images/'+countries[i].photos[k]+'">';
        }
    }
}
window.onload= showPage();