<<<<<<< HEAD
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const bakeCake = async () => {
    console.log("Putting the cake in the oven");
    await wait(3000);
    console.log("Cake is baked");
};
const prepareFrosting = async () => {
    console.log("Preparing the frosting");
    await wait(2000);
    console.log("Frosting is ready");
};
const frostCake = async () => {
    console.log("Frosting the cake");
    await wait(1000);
    console.log("Cake is frosted");
};
const makeCake = async () => {
    console.log("Starting the cake-making process");
    const baking = bakeCake();
    const frosting = prepareFrosting();
    // await baking;
    // await frosting;
    await frostCake();
    console.log("Cake is ready to be served");
};
makeCake();
=======
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const bakeCake = async () => {
    console.log("Putting the cake in the oven");
    await wait(3000);
    console.log("Cake is baked");
};
const prepareFrosting = async () => {
    console.log("Preparing the frosting");
    await wait(2000);
    console.log("Frosting is ready");
};
const frostCake = async () => {
    console.log("Frosting the cake");
    await wait(1000);
    console.log("Cake is frosted");
};
const makeCake = async () => {
    console.log("Starting the cake-making process");
    const baking = bakeCake();
    const frosting = prepareFrosting();
    // await baking;
    // await frosting;
    await frostCake();
    console.log("Cake is ready to be served");
};
makeCake();
>>>>>>> d8b8419199213f197fede7bee65716c6f17e5fb1
