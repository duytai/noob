export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE

pm2 stop $APP_NAME
echo "✓ stop $INSTANCES instances"
echo "✓ complete"
