# EugeniaApi
## EugeniaApi BackEnd

EugeniaApi BackEnd es una API Rest que fue creada con NodeJS versión 20.12.2, con ECMAScript 6, TypeScript y se conecta a una Base de datos PostgreSQL 16, al momento de descargar este proyecto, instale las dependencias con npm install, para ejecutar npm run dev, la aplicación corre en:  http://localhost:4000/

![](/images/01-A.png)

## EugeniaApi

EugeniaApi BackEnd es una API Rest que fue creada con NodeJS versión 20.12.2, con ECMAScript 6, TypeScript y se conecta a una Base de datos PostgreSQL 16, para cumplir la prueba técnica que Nextia aplica para una de sus vacantes.

## Base de datos:

🙂 Estructura y diagrama entidad relación de tablas. 

![](/images/18.png)

🙂 Función creation date en PLSQL:

![](/images/19.png)

🙂 Función time status en PLSQL:

![](/images/20.png)

🙂 Si desea ver el código SQL de la de base de datos, solo vea el archivo eugeniaLH.sql

![](/images/17.png)

## Métodos y rutas:

🙂 Auth

En auth, se encuentran todos los métodos relacionados con el control de acceso.

🙂 Login (signIn), verifica si el usuario está registrado y reenvía la información del usuario con un JWT. 

POST: /api/auth/signIn

![](/images/02.png)

🙂 getAuth (isLoggedIn), sirve para verificar si la JWT está vigente y extraer la información del usuario (verifica si el usuario se quedó logueado).

POST: /api/auth/auth

![](/images/02-A.png)
 
🙂 newUser (signUp), sirve para registrar a un usuario nuevo y reenvía la información del usuario con un JWT. 

POST: /api/auth/signUp

![](/images/03.png)

🙂 Logout (logOut), envía mensaje de Come back soon y data = { }, con data ={ } el FrontEnd entiende que no hay datos.

POST: /api/auth/logout

![](/images/04.png)

🙂 Profile (profile), sirve para obtener la información de usuario según su email.

POST: /api/auth/profile

![](/images/08.png)

🙂 New Password (modifyPasswordUser), sirve para actualizar el password del usuario.

PUT: /api/auth/newPassword/:id_user

![](/images/07.png)

🙂 User:

En user, están todos los métodos relacionados con el usuario.

🙂 Get Users (getUsers), obtiene a todos los usuarios registrados.

GET: /api/user/getUsers

![](/images/11.png)

🙂 Get user by Id (getUserbyId), extrae la información del usuario según su id.

GET: /api/user/getUserbyId/:id_user

![](/images/09.png)

🙂 Get user by email (getUserbyEmail), extrae la información del usuario según su email.

GET: /api/user/getUserbyEmail/:email

![](/images/10.png)

🙂 Remove user (deleteUser), elimina al usuario según su id.

DELETE: /api/user/removeUser/:id_user

![](/images/06.png)

🙂 Invitations:

En invitations, es donde se encuentran todos los métodos relacionados con las invitaciones de los usuarios.

🙂 Add new invitation (createInvUser), donde se crean las invitaciones según el usuario.

POST: /api/invitations/createInvUser

![](/images/14.png)

🙂 Get invitación user id (getInvUserId), se obtienen las invitaciones o la invitación según el usuario.

POST: /api/invitations/getInvUserId

![](/images/13-A.png)
![](/images/13.png)

🙂 Get invitación id (getInvId), se obtienen la invitación según si id.

GET: /api/invitations/getInvId/:id_inv

![](/images/12.png)

🙂 Remove invitación id (deleteInvId), elimina la invitación según si id.

DELETE: /api/invitations/removeInvId/:id_inv

![](/images/16.png)

🙂 Modify status invitación (modifyStatusInvId), modifica el status de la invitación según si id.

PUT: /api/invitations/modifyStatusInvId/:id_inv

![](/images/15.png)

`© 2024 Copyright: GMayaS C:\>Desarrollo en Sistemas.`