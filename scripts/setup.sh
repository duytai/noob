run_with_logs() {
  if [ $VERBOSE = true ] ; then
    eval $1
  else
    eval "$1 &> /dev/null"
  fi
}
## INSTALL NVM
export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
if [ ! -f $NVM_ENV_FILE ] ; then
  echo "✓ install NVM"
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
fi
source $NVM_ENV_FILE 
echo "✓ nvm $(nvm --version)"

## INSTALL NODE
if [ -z $NODE_VERSION ] ; then
  run_with_logs "nvm install node"
else 
  run_with_logs "nvm install $NODE_VERSION"
fi 
echo "✓ node $(node --version)"

## INSTALL PM2
HAS_PM2=$(command -v pm2)
if [ -z $HAS_PM2 ] ; then
  echo "✓ install PM2"
  npm i -g pm2
fi
echo "✓ pm2 $(pm2 --version)"

## INSTALL BUILD
HAS_MAKE=$(command -v make)
if [ -z $HAS_MAKE ] ; then
  run_with_logs "sudo apt-get install build-essential -y"
fi
echo "✓ complete"
