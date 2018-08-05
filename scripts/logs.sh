export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE
if [ ! -z $NODE_VERSION ] ; then
  nvm use $NODE_VERSION &> /dev/null
fi 

if [ $APP_PID = "all" ] ; then
  pm2 logs
else
  pm2 logs $APP_PID
fi

