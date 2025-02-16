const users=[];
export function adduser(name,email){
    users.push({ name, email });
    console.log(`User ${name} added successfully`);
}
export function getUser(){
    return users;
}