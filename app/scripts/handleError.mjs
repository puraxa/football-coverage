export function handleError(error){
    document.getElementsByClassName('results')[0].innerHTML = `${error.message}`;
    document.getElementsByClassName('results')[0].classList.add('error');
    document.getElementsByClassName('results')[0].classList.add('text-align-center');
    document.getElementsByClassName('liga-nav')[0].style.display = 'none';
}