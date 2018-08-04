## INSTALL NVM
export LC_ALL=C
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"
if [ ! -f $NVM_ENV_FILE ] ; then
  echo "✓ install NVM"
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
fi
source ~/.nvm/nvm.sh
echo "✓ nvm $(nvm --version)"

## INSTALL NODE
HAS_NODE=$(command -v node)
if [ -z $HAS_NODE ] ; then
  echo "✓ install NodeJS"
  nvm install node
fi
echo "✓ node $(node --version)"

## INSTALL PM2
HAS_PM2=$(command -v pm2)
if [ -z $HAS_PM2 ] ; then
  echo "✓ install PM2"
  npm i -g pm2
fi
echo "✓ pm2 $(pm2 --version)"
echo "✓ complete"
