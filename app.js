/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", () => {
    let long;
    let lat;
    let temperaturedescription=document.querySelector('.temperature-description');
    let temperaturedegree=document.querySelector('.temperature-degree');
    let locationtimezone=document.querySelector('.location-timezone');
    let temperaturesection=document.querySelector('.degree-section');
    let temperaturespan=document.querySelector('.degree-section span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);
            const api = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/451786bbc286baac0abc9dd7cb3e58ef/12.92654,77.6715814";
            window.fetch(api).then(response => {
                return response.json();
            })
                    .then(data => {
                        console.log(data);
                        const {temperature,icon}=data.currently;
                        const {summary}=data.daily;
                        temperaturedegree.textContent=temperature;
                        temperaturedescription.textContent=summary;
                        locationtimezone.textContent=data.timezone;
                        setIcons(icon,document.querySelector('.icon'));
                        let celsius=(temperature-32)*(5/9);
                        temperaturesection.addEventListener('click',()=>{
                            if(temperaturespan.textContent==='F'){
                                temperaturespan.textContent='C';
                                temperaturedegree.textContent=Math.floor(celsius);
                            }
                            else{
                                temperaturespan.textContent='F';
                                temperaturedegree.textContent=temperature;
                            }
                        })
                    });
        });
        
    }
    function setIcons(icon,iconID){
        const skycons=new Skycons({color:"white"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});

