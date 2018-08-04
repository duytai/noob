export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE

if [ $APP_PID = "all" ] ; then
  pm2 logs
else
  pm2 logs $APP_PID
fi

