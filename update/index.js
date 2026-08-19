import getEleven from './src/Eleven.mjs';
import Action from './src/Update.mjs';
const Eleven = getEleven();

(async()=>{
  const action = new Action();
  if(await action.verify()){
    await action.run();
  }else{
    Eleven.warning("action.verify() failed! check your input variables")
  }
})();