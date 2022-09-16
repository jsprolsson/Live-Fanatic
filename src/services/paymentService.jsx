const getTickets = async (user_Id) => {
    const response = await fetch('data/user/tickets/' + user_Id);
    console.log(response) 
}

export default {
    getTickets
}