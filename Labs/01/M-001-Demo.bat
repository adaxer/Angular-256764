echo install @angular/cli@latest
pause
npm i -g @angular/cli@latest

echo create new angular app
pause
ng new theory-app --skip-tests --standalone false
cd theory-app
ng serve -o
