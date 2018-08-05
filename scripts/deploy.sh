APPS_DIR="apps/"
APP_DIR=$APPS_DIR/$APP_NAME
NVM_ENV_FILE="$HOME/.nvm/nvm.sh"

export LC_ALL=C
if [ ! -d $APPS_DIR ] ; then
  mkdir $APPS_DIR
fi
echo "✓ extract"
tar -C $APPS_DIR -xf $TAR_FILE
rm $TAR_FILE
source $NVM_ENV_FILE
if [ ! -z $NODE_VERSION ] ; then
  nvm use $NODE_VERSION &> /dev/null
fi 
cd $APP_DIR
echo "✓ install dependencies"
npm install &> /dev/null
APP_ENTRY=$(cat package.json \
  | grep main \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')
if [ -z $APP_ENTRY ] ; then
  echo "🐛 Must define 'main' in package.json"
fi
pm2 delete $APP_NAME &> /dev/null 
pm2 start $APP_ENTRY --instances=$INSTANCES --name=${APP_NAME}
echo "✓ $INSTANCES instances started"
