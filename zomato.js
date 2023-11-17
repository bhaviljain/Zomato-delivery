let isorderaccepted = false;
let isvaletfound = false;
let hasResHasSeenOrder = false;
let interval = null;
let valetTimer = null
let valetDeliveryTimer = null
let isOrderDelivered =  false
// let isValetFound = 

window.addEventListener('load', function () {
    document.getElementById('accept-order').addEventListener('click', function () {
        askRestaurantToAcceptOrReject();
    })

    document.getElementById('find'),this.addEventListener('click', function(){
    startSearchingForValets()
    })

    document.getElementById('order-delivered').addEventListener('click',function(){
       setTimeout(() => {
        isOrderDelivered= true
       }, 2000);
       
    })
    checkIfOrderAcceptedFromRestaurantOrNot()
        .then(isorderaccepted => {
            console.log('update from restaurant:', isorderaccepted);

            //start preparing 
            if (isorderaccepted)
            startPreparingOrder()
            //order rejected
            else alert('Sorry restaurant cancelled your order, amt will credited wihtin 2-4 working days')
        })
        .catch(err => {
            console.log(err);
            alert("Went wrong, Please try again later")
        })

})
//step 1 accept order or not
function askRestaurantToAcceptOrReject() {  //callback
    setTimeout(() => {
        isorderaccepted = confirm('Should Restaurant accept your order ?')
        hasResHasSeenOrder = true
    }, 1000)
}

//step 2
//
function checkIfOrderAcceptedFromRestaurantOrNot() {
    var promise = new Promise((resolve, reject) => {
        interval = setInterval(() => {
            console.log("Checking if restaurant accepted your order or not");

            if (!hasResHasSeenOrder)
                return
            if (isorderaccepted) resolve(true)
            else resolve(false)
            clearInterval(interval)
        }, 1000)
    })
    return promise
}

//step 4
//startPreparingOrder
function startPreparingOrder() {
    Promise.allSettled([
        updateOrderStatus(),
        updateMapView(),
        CheckIfValetAssign(),
        CheckIfOrderDelivered()

        // checkForOrderDelivery()
    ])
        .then(res => {
            console.log(res);
            setTimeout(() => {
                alert("how was your food ? Rate your food and delivery partner")
            }, 5000)
        })
        .catch(err => {
            console.error(err);
        })
}
//helper fucntions or pure fucntion(joh sirf 1 kaam ke liye bane baki kuch nahi karege)

//updateOrderStatus
function updateOrderStatus() {
    return promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById('currentstatus').innerText = isOrderDelivered ? 'Order Successfully Delivered': "Preparing Your Food"
            resolve("status updated")
        }, 1000)

    })
}
//updateMapView
function updateMapView() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById('map-view').style.filter = "brightness(130%)";
            resolve("map initialise")
        }, 1000)
    })

    return promise
}

//startSearchingForValets
function startSearchingForValets()
{
    const ValetPromise = [];
//get valet nearby
for(let i =0;i<5; i++){
    ValetPromise.push(getRandomDriver())
}
console.log(ValetPromise);
Promise.any(ValetPromise)
.then(selectedvalet=>{
    console.log("Selected", selectedvalet);
    isvaletfound = true
})
.catch(err=>{
    console.error(err);
})
}
function getRandomDriver()
{
    //
    return new Promise((resolve , reject)=>{
        const timeout =Math.random()*1000
        setTimeout(()=>{
            resolve('Valet :' + timeout)
        },timeout)
    })
}
//CheckIfValetAssign
function CheckIfValetAssign()
{
    return new Promise((resolve, reject)=>{
        valetTimer=  setInterval(()=>{
        console.log("Searching for valet");
        if(isvaletfound)
        {
            updateVletDetails()
            resolve('Updated Valet details')
            clearTimeout(valetTimer)
        }
        },1000)
    })
}

//CheckIfOrderDelivered
function CheckIfOrderDelivered()
{
    return new Promise((resolve, reject)=>{
        valetDeliveryTimer=  setInterval(()=>{
        console.log("is order delivered by valet");
        if(isOrderDelivered)
        {
            resolve('order delivered')
            updateOrderStatus()
            clearTimeout(valetDeliveryTimer)
        }
        },1000)
    })
}
//updateVletDetails
function updateVletDetails()
{
    if(isvaletfound)
    {
     document.getElementById('finding-driver').classList.add('none')
     document.getElementById('found-driver').classList.remove('none')
     document.getElementById('call').classList.remove('none')

     }
}


//promises. all call all
//  .operation paralelly, if one fails everyone will fail