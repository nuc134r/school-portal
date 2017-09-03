Diploma project written in full stack JavaScript.

# PEVN software stack

- **P**ostgreSQL
- **E**xpress.js
- **V**ue.js (but most of the HTML is server rendered with Pug)
- **N**ode.js

All of the technologies are open source.

# Front end

[Material Design Lite](https://getmdl.io) components. MDL provides good appearance and responsive design support out of the box. Some custom components were used.

[List.js](http://listjs.com/) for client grid sorting and search.

[Vue](https://vuejs.org/) to generate DOM on the client. After trying Angular for this role decision was made to minimize client rendering and it was accomplished. Vue is used only on a couple of pages.

[Quill](https://quilljs.com/) rich text editor.

# Back end

PostgreSQL along with [Sequelize](http://docs.sequelizejs.com/) ORM library.

[Pug](https://pugjs.org/api/getting-started.html) as HTML template engine. It is used almost everywhere to generate HTML on server. 

Check `package.json` for more details about used back end libraries.

# Features
- Responsive design
- Instant messages between users (via socket.io)
- Lessons timetable for student
- Remote tasks (with a dashboard for teacher)
- Online tests
- Admin interface

# Screenshots

![Responsive design](https://user-images.githubusercontent.com/13202642/29729833-7958dea0-89e6-11e7-8f6b-3b20f14f24ad.png)

![Student dashboard](https://user-images.githubusercontent.com/13202642/29729659-b833a192-89e5-11e7-9a4f-08708f23d9ae.png)

![Remote tasks](https://user-images.githubusercontent.com/13202642/29729680-cabe4984-89e5-11e7-8fcc-f32fb32473fc.png)

![Remote tests](https://user-images.githubusercontent.com/13202642/29729713-eafdbfcc-89e5-11e7-809d-b10615510e5b.png)

![Instant messaging](https://user-images.githubusercontent.com/13202642/29729739-17bb97dc-89e6-11e7-8aac-c9c2de67790e.png)

![image](https://user-images.githubusercontent.com/13202642/29729757-2ad63458-89e6-11e7-8085-3289bdf474f6.png)

![image](https://user-images.githubusercontent.com/13202642/29729778-447ed734-89e6-11e7-9af5-42bbebe6ad64.png)
