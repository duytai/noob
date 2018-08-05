run_with_logs() {
  if [ $VERBOSE = true ] ; then
    eval $1
  else
    eval "$1 &> /dev/null"
  fi
}

export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
source $NVM_ENV_FILE
if [ ! -z $NODE_VERSION ] ; then
  run_with_logs "nvm use $NODE_VERSION"
fi 

pm2 start $APP_NAME
echo "✓ start $INSTANCES instances"
echo "✓ complete"
