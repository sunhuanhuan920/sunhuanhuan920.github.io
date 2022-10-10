const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const content = document.querySelector(".content");
const section_bio = document.querySelector(".bio");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");
const playground_title = document.querySelector(".playground-title");
const section_playground = document.querySelector(".playground");

let header_height = header.offsetHeight;
let section_bio_height = section_bio.offsetHeight;
let section_playground_height = section_playground.offsetHeight;


window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    //let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (section_bio_height);
    })

    // Opacity value of big title between -1 and 1;
    big_title.style.opacity = 1 - scroll / (header_height / 1.5);
    content.style.transform = `translateY(${scroll / (section_bio_height) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_bio_height) * -50 + 50}px)`;
    if(scroll <= section_bio_height)
    {
        border.style.width = `${scroll / section_bio_height * 35}%`;
    }

    if(scroll > section_bio_height && scroll < section_playground_height)
    {
        playground_title.style.transform = `translateY(${scroll * 0.25}px)`;
        //playground_title.style.opacity = 1 - scroll / (section_playground_height * 1.2);
    }
})