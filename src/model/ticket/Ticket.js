import client from "../../model/client/Client.js";

const ticket = {

    id : null,
    description : '',
    observation : '',
    createAt : '',
    paidMethod: '',
    paidStatus: false,
    client : client,
    items : [],
    adresses : [],
    adress : null,
    delivery: false,
 
  } 
  
  export default ticket;