const getTickets = async (user_Id) => {
    const response = await fetch('data/user/tickets/' + user_Id);
        const userTickets = await response.json();
        return userTickets;
}

export default {
    getTickets
}