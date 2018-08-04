export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE

pm2 start $APP_NAME
echo "✓ start $INSTANCES instances"
echo "✓ complete"
