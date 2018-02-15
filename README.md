## BotConstructor Dashboard

### Технологии

Single Page Application React + ASP NET Core
Нужны установленные Node.js и DotNet.Core SDK

### Backend

Все данные для приложения дергаются HTTP запросами из API по адресу http://bot-constructor-api.azurewebsites.net

Проект с API лежит тут https://github.com/s-buhar0v/telegram-bot-constructor-web-api

Адрес API можно сменить в **appsettings.json** в корне этого проекта. 

Обратите внимание, когда в API есть изменения, то увеличивается версия.

Узнать текущую версию API можно зайдя по его адресу в браузере.

Если версия, трубемая сайтом (задается в **appsettings.json**), меньше
чем версия API, сайт будет бросать исключение.

В проекте есть DataController, который можно дернуть с Frontendа.

DataController идет в отдельно живущий проект API по адресу из конфига, прикладывая параметы,
отправленные с фронта и возвращает на страницу ответ.

### Frontend

ReactRouter перенаправляет на компоненты страниц, которые задаются в Layout.tsx.

Рассмотрим пример:

В меню вы нажали на кнопку, которая ведет на /users.

React роутер рендерит компонент Layout и просовывает в него UsersPage

Layout прокидывает в UsersPage коллбеки для различных событий, вроде OnAlert и прочих,
которые нужно чтобы влиять на Layout со страницы.

Компонент общается с DataContoller, чтобы получать и отправлять данные в API.

