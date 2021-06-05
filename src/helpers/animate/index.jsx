let initAnimation = null;
const Animate = 
{
     initAnimatedFrom : (className) =>
     {
        initAnimation = document.getElementsByClassName(className)[0];
        initAnimation.classList.add('animationLoader');
        return new Promise((resolve) =>{ initAnimation.addEventListener('animationend',() => resolve('animationed'))})
     }
}
export default Animate;