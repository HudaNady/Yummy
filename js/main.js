$(document).ready(function() {
    $(".loading").fadeOut(2500)
})
let rowData=document.getElementById('rowData')
let searchInputs=document.getElementById('search')
let width=$('.inner').outerWidth()
function closeSideBare(){
    $(".sideBar").css({left:`-${width}px`})
    $(".openSide").addClass("fa-align-justify").removeClass("fa-x")
}
closeSideBare()
$(".openSide").on('click',function(){
    let left=$('.sideBar').css('left')
    if(left=='0px'){
        $(".sideBar").animate({left:`-${width}px`},1000)
        $(".openSide").addClass("fa-align-justify").removeClass("fa-x")
        $(".nav-item").animate({top:'200px'},1000)
    }else{
        $(".sideBar").animate({left:0},1000)
        $(".openSide").removeClass("fa-align-justify").addClass("fa-x")
        $(".nav-item").animate({top:'0px'},1500)
    }
})
async function getData(name=''){
    $(".inner-loading").hide()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data=await req.json()
    displayData(data.meals)
}
getData()
function displayData(meals){
    let temp=''
    meals.forEach(element => {
        temp+=`<div class="col-lg-3 col-md-6 col-sm-12 p-3">
        <div onclick="getMealDetails('${element.idMeal}')" class=" pointer image position-relative overflow-hidden p-0 rounded-2 ">
            <img src="${element.strMealThumb}" class="w-100" alt="">
            <div class="layer p-3 d-flex flex-column justify-content-center text-center">
                <h4>${element.strMeal}</h4>
            </div>
        </div>
    </div>`
    });
    rowData.innerHTML=temp
    console.log(meals)
}
function showInput(){
    $(".inner-loading").show()
    searchInputs.innerHTML = `
    <div class="row py-4  container">
        <div class="col-lg-6 col-md-6 col-sm-6  ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
            <input onkeyup="searchByFirstName(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML = ""
    $(".inner-loading").fadeOut(2000)
}
function searchByName(name){
    let searchValue=name
    getData(searchValue)
}
async function searchByFirstName(letter){
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data=await req.json()
    displayData(data.meals)
    console.log(data.meals)
}
async function getCategory(){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data=await req.json()
    console.log(data.categories)
    searchInputs.innerHTML =''
    let temp=''
    data.categories.forEach(element => {
        temp+=`<div class="col-lg-3 col-md-6 col-sm-12 p-3">
        <div onclick="showCategoryMeals('${element.strCategory}')" class=" pointer image position-relative overflow-hidden p-0 rounded-2 ">
            <img src="${element.strCategoryThumb}" class="w-100" alt="">
            <div class="layer d-flex flex-column overflow-hidden p-2  text-center">
                <h4>${element.strCategory}</h4>
                <p>${element.strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
            </div>
        </div>
    </div>`
    });
    rowData.innerHTML=temp
    $(".inner-loading").fadeOut(2000)
}

async function showCategoryMeals(category){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data=await req.json()
    console.log(data.meals);
    displayData(data.meals.slice(0,20))
    $(".inner-loading").fadeOut(2000)


}
async function getArea(){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=`)
    let data=await req.json()
    console.log(data.meals)
    searchInputs.innerHTML =''
    let temp=''
    data.meals.forEach(element => {
        temp+=`<div class="col-lg-3 col-md-6 col-sm-12 p-3">
        <div onclick="showAreaMeals('${element.strArea}')"pointer class=" position-relative overflow-hidden p-0 rounded-2 ">
            <div class=" d-flex flex-column overflow-hidden p-2  text-center">
            <i class="fa-solid fa-house-laptop fa-5x"></i>
                <h4>${element.strArea}</h4>
            </div>
        </div>
    </div>`
    });
    rowData.innerHTML=temp
    $(".inner-loading").fadeOut(2000)

}
async function showAreaMeals(area){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data=await req.json()
    console.log(data.meals)
    displayData(data.meals.slice(0,20))
    $(".inner-loading").fadeOut(2000)

}
async function getIngredients(){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=`)
    let data=await req.json()
    console.log(data.meals)
    let ingredients=data.meals.slice(0,20)
    searchInputs.innerHTML =''
    let temp=''
    ingredients.forEach(element => {
        temp+=`<div class="col-lg-3 col-md-6 col-sm-12 p-3">
        <div onclick="showIngredientsMeals('${element.strIngredient}')" class="pointer position-relative overflow-hidden p-0 rounded-2 ">
            <div class=" d-flex flex-column overflow-hidden p-2  text-center">
            <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                <h4>${element.strIngredient}</h4>
                <p>${element.strDescription.split(" ").slice(0,15).join(" ")}</p>
            </div>
        </div>
    </div>`
    });
    rowData.innerHTML=temp
    $(".inner-loading").fadeOut(2000)

}
async function showIngredientsMeals(Ingredients){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    let data=await req.json()
    console.log(data.meals)
    displayData(data.meals.slice(0,20))
    $(".inner-loading").fadeOut(2000)
}
async function getMealDetails(mealId){
    $(".inner-loading").show()
    let req =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    let data=await req.json()
    let details=data.meals[0]
    console.log(details);
    rowData.innerHTML=''
    let recipes=''
    for (let i = 1; i < 20; i++) {
        (details[`strIngredient${i}`])?recipes+=`<li class="alert alert-info m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]} </li>`:""
    }
    let tags = details.strTags.split(",")
    let tag=''
    for (let i = 0; i < tags.length; i++) {
        tag+=`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    searchInputs.innerHTML=`<div class="row justify-content-between py-5 px-4 container">
    <div class="col-lg-4 col-md-8 col-sm-12">
        <img src="${details.strMealThumb}" class="w-100 rounded-3" alt="">
        <h2>${details.strMeal}</h2>
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12">
        <div class="flex-column">
            <h2>Instructions</h2>
            <p>${details.strInstructions}</p>
            <h2>Area : ${details.strArea}</h2>
            <h2>Category : ${details.strCategory}</h2>
            <div>
                <h2>Recipes :</h2>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${recipes}
                </ul>
            </div>
            <div>
                <h2>Tags :</h2>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tag}
                </ul>
            </div>
            <a target="_blank" href="${details.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${details.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
    </div>
</div>`
$(".inner-loading").fadeOut(2000)
}
let userName
let userEmail
let userPhone
let userAge
let userPassword
let rePassword
let nameInput
let emailInput
let phoneInput
let ageInput
let passInput=false
let repassInput=false
function showContactUs(){
    $(".inner-loading").show()
    rowData.innerHTML=''
    searchInputs.innerHTML=`<form action="" class=" w-75 mx-auto" id="form">
    <div class="row  vh-100 justify-content-center align-content-center">
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0 ">
            <label for="userName"></label>
            <input type="text" onkeyup="validation()" id="userName" class="form-control  bg-body " placeholder="Enter your name" />
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none ">
                    Special characters and numbers not allowed
                </div>
        </div>
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0">
            <label for="userEmail"></label>
            <input type="email" onkeyup="validation()" id="userEmail" class="form-control  bg-body " placeholder="Enter your email " />
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none ">
                Email not valid *exemple@yyy.zzz
                </div>
        </div>
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0">
            <label for="userPhone"></label>
            <input type="tel" onkeyup="validation()" id="userPhone" class="form-control  bg-body " placeholder="Enter your phone number"/>
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none ">
                Enter valid Phone Number XXX-XXX-XXXX or XXX XXX XXXX
                </div>
        </div>
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0">
            <label for="userAge"></label>
            <input type="number" onkeyup="validation()" id="userAge" class="form-control  bg-body " placeholder="Enter your age"/>
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid age 
                </div>
        </div>
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0">
            <label for="userPassword"></label>
            <input type="password" onkeyup="validation()" id="userPassword" class="form-control  bg-body " placeholder="Enter your password"/>
            <div id="userPasswordAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
        </div>
        <div class=" col-lg-6 col-md-8 col-sm-12 py-0">
            <label for="userPassword"></label>
        <input type="password" onkeyup="validation()" id="rePassword" class="form-control  bg-body " placeholder=" Repassword"/>
        <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
            Enter valid repassword 
                </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-8 my-3 text-center">
            <button type="submit" class="btn btn-outline-danger submitBtn" disabled>Submit</button>
        </div>
    </div>
</form>`

$(".inner-loading").fadeOut(2000)

$("#userName").on('keyup', function() {
    userName=$("#userName").val()
    nameInput=true
});
$("#userEmail").on('keyup', function() {
    userEmail=$("#userEmail").val()
    emailInput=true
});
$("#userPhone").on('keyup', function() {
    phoneInput=true
});
$("#userAge").on('keyup', function() {
    ageInput=true
});
$("#userPassword").on('keyup', function() {
    passInput=true
});
$("#rePassword").on('keyup', function() {
    repassInput=true
});
userAge=document.getElementById("userAge")
userPassword=document.getElementById("userPassword")
userPhone=document.getElementById("userPhone")
rePassword=document.getElementById("rePassword")
}

///////////////////////////////////////////////////validatin////////////////////////////////////////////////////////
function validName(){
    var ragName=/^[A-Z][a-z]{2,20}$/
    if(ragName.test(userName)==true){
        return true
    }
}
function validEmail(){
    var ragEmail=/\w+@\w+\.\w+/ig
    if(ragEmail.test(userEmail)==true){
        return true
    }
}
function validPhone(){
    var ragPhone=/^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
    if(ragPhone.test(userPhone.value)==true){
        return true
    }
}
function validAge(){
    var ragAge=/^(1[89]|[2-9]\d)$/
    if(ragAge.test(userAge.value)==true){
        return true
    }
}
let pass=''
function validPassword(){
    var ragPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(ragPass.test(userPassword.value)==true){
        pass=userPassword.value
        return true
    }
}
function validRepassword(){
    if(rePassword.value==pass){
        return true
    }
}
function validation(){
    if(nameInput==true){
        if(validName()==true){
            $("#userName").addClass('is-valid')
            $("#userName").removeClass('is-invalid')
            $("#nameAlert").addClass('d-none')
        }else{
            $("#userName").removeClass('is-valid')
            $("#userName").addClass('is-invalid')
            $("#nameAlert").removeClass('d-none')
        }
    }
    if(emailInput==true){
        if(validEmail()==true){
            $("#userEmail").addClass('is-valid')
            $("#userEmail").removeClass('is-invalid')
            $("#emailAlert").addClass('d-none')
            
        }else{
            $("#userEmail").removeClass('is-valid')
            $("#userEmail").addClass('is-invalid')
            $("#emailAlert").removeClass('d-none')
        }
    }
    if(phoneInput==true){
        if(validPhone()==true){
            $("#userPhone").addClass('is-valid')
            $("#userPhone").removeClass('is-invalid')
            $("#phoneAlert").addClass('d-none')
        }else{
            $("#userPhone").removeClass('is-valid')
            $("#userPhone").addClass('is-invalid')
            $("#phoneAlert").removeClass('d-none')
        }
    }
    if(ageInput==true){
        if(validAge()==true){
            $("#userAge").addClass('is-valid')
            $("#userAge").removeClass('is-invalid')
            $("#ageAlert").addClass('d-none')
        }else{
            $("#userAge").removeClass('is-valid')
            $("#userAge").addClass('is-invalid')
            $("#ageAlert").removeClass('d-none')
        }
    }
    if(passInput==true){
        if(validPassword()==true){
            $("#userPassword").addClass('is-valid')
            $("#userPassword").removeClass('is-invalid')
            $("#userPasswordAlert").addClass('d-none')
        }else{
            $("#userPassword").removeClass('is-valid')
            $("#userPassword").addClass('is-invalid')
            $("#userPasswordAlert").removeClass('d-none')
        }
    }
    if(repassInput==true){
        if(validRepassword()==true){
            $("#rePassword").addClass('is-valid')
            $("#rePassword").removeClass('is-invalid')
            $("#rePasswordAlert").addClass('d-none')
        }else{
            $("#rePassword").removeClass('is-valid')
            $("#rePassword").addClass('is-invalid')
            $("#rePasswordAlert").removeClass('d-none')
        }
    }
    if(validName()&&validEmail()&&validPhone()&&validAge()&&validPassword()&& validRepassword()){
        console.log("helooooo")
        $('.submitBtn').removeAttr("disabled")
    }else{
        $('.submitBtn').attr("disabled")
        console.log("ooooo")
    }
}








