let currentUser = lgdUser.allData()
let crnUserDataBase = new UserDataBase(currentUser.UserName)


window.onload = () => {
    pageLoad()
    let addCars = document.querySelector('form')
    addCars.addEventListener('submit', listCars)
}



const listCars = () => {
    event.preventDefault()
    let carDataForm = new FormData(event.target)
    let carName = carDataForm.get("car_name")
    let description = carDataForm.get("car_description")
    let charges = carDataForm.get("car_charges")
    let location = carDataForm.get("car_location")
    let fuel = carDataForm.get("car_fuel")
    let mile = carDataForm.get("car_mile")
    let carDetails = {
        Name:carName,
        Description:description,
        Charges:charges,
        Location:location,
        Fuel:fuel,
        Miles:mile 
    }
    console.log(carDetails)
    let carId = crnUserDataBase.listCars(carDetails)
    carLedger.addToLedger({Name:currentUser.UserName, carNo:carId})
}


const pageLoad = () =>{
    let allUserInfo = carLedger.allData()
    for(let i = 0; i < allUserInfo.length; i++){
        console.log(allUserInfo[i].Name)
        if(currentUser.UserName === allUserInfo[i].Name){
            continue
        }
        else{
            let indivUser = new UserDataBase(allUserInfo[i].Name)
            let indivUserAllData = indivUser.allData()
            console.log(indivUserAllData)
            let carId = Number(allUserInfo[i].carNo)
            console.log(indivUserAllData)
            if(indivUserAllData.listed[carId].requestedBy.length === 0){
                renderDom(indivUserAllData.listed[carId], carId)
            }
        }
    }
}


const renderDom = (carInfo, id) =>{
    let carsHolder = document.getElementById('cars_holder')
    carsHolder.innerHTML += `
        <div class="col-6">
            <div class="card" style="margin:10px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="../Resources/car1.jpg" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${carInfo.Name}</h5>
                            <h6 class="card-text">
                                <span class="badge badge-secondary">${carInfo.Miles} km</span>
                                <span class="badge badge-secondary">${carInfo.Fuel}</span>
                                <span class="badge badge-secondary">${carInfo.Location}</span>
                            </h6>                                      
                        <h6>
                            <button type="button" class="btn btn-danger btn-sm">More Details</button>
                        </h6>
                        </div>   
                    </div>
                </div>
            </div>
        </div>`
}