import getEleven from './src/Eleven.mjs';
import Action from './src/Update.mjs';
const Eleven = getEleven();

process
  .on('unhandledRejection', (reason, p) => {
    Eleven.warning('unhandledRejection', reason, p);
  })
  .on('uncaughtException', e => {
    Eleven.warning('uncaughtException', e);
  });

(async()=>{
  try{
    const action = new Action();
    if(await action.verify()){
      await action.run();
    }else{
      Eleven.warning("action.verify() failed! check your input variables")
    }
  }catch(e){
    Eleven.error(e);
  }
})();