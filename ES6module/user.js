const users=[];
function adduser(name,email){
    users.push({ name, email });
    console.log(`User ${name} added successfully`);
}
function getUser(){
    return users;
}
export{adduser,getUser};