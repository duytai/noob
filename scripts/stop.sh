export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE
if [ ! -z $NODE_VERSION ] ; then
  nvm use $NODE_VERSION &> /dev/null
fi 

pm2 stop $APP_NAME
echo "✓ stop $INSTANCES instances"
echo "✓ complete"
