import Action from './src/Update.mjs';

(async() => {
  const action = new Action();
  if(await action.verify()){
    await action.run();
  }else{
    throw new Error("action.verify() failed! Check your input variables.");
  }
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});