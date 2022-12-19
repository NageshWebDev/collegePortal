export default async function getStaffName() {
    const response = await fetch("https://random-data-api.com/api/v2/users?size=1");

    //wrong URL
    // const response = await fetch("https://random-data-api.com/api/v2/userspoi?size=1");

    if (!response.ok) {
        throw new Error(`RESPONSE STATUS : ${response.status}`)
    }
    const responseJSON = await response.json()
    // console.log(responseJSON)
    return responseJSON
} 