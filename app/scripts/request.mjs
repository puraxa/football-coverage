let token = '4ab239f4b7de4e06a40b536dc77c3a4a';
let fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "X-Auth-Token": token,
    }    
}
export const request = async(url) => {
    const response = await fetch(url,fetchOptions);
    let data = await response.json();

    return response.ok ? data : Promise.reject(data);
}
